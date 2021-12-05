import "../styles/globals/index.css";
import { createContext, useEffect, useMemo, useState } from "react";
import Toaster from "../components/toaster/toaster";
import Header from "../components/header/header";
import { Footer } from "../components/footer/footer";
import App from "next/app";
import axios from "axios";
import usePersistentState from "../hooks/usePersistentState";
import { useRouter } from "next/router";
import { DrawerContext } from "../components/drawer/drawer";
import { useHttp } from "../hooks/useHttp";

export const AppContext = createContext(null);

function MyApp({ Component, pageProps, locations }) {
  const router = useRouter();
  const http = useHttp();

  const locationParameter = router?.query?.location;

  const [message, setMessage] = useState(null);
  const [isOpen, setOpen] = useState(false);

  const [lastLocation, setLastLocation] = usePersistentState(
    "lastLocation",
    null
  );

  const [tokenPayload, setTokenPayload] = usePersistentState(
    "tokenPayload",
    null
  );

  const currentLocation = useMemo(
    () => locations?.find((location) => location.url === locationParameter),
    [locations, locationParameter]
  );

  const isAuthenticated = useMemo(() => {
    if (!tokenPayload) {
      return false;
    }

    return new Date().getTime() / 1000 <= tokenPayload?.expiration;
  }, [tokenPayload]);

  const roles = useMemo(() => {
    const rolePostfix = `@${currentLocation?.id}`;

    return tokenPayload?.user.roles
      ?.filter((role) => role.includes(rolePostfix))
      .map((role) =>
        role.replace("ROLE_", "").replace(rolePostfix, "").toLowerCase()
      );
  }, [currentLocation]);

  const dispatchMessage = (newMessage) => {
    setMessage(newMessage);
  };

  const reset = () => {
    setTokenPayload(null);
    setLastLocation(null);
  };

  useEffect(async () => {
    if (!lastLocation) {
      setLastLocation(tokenPayload?.lastVisitedLocation);
    }

    if (currentLocation && isAuthenticated) {
      try {
        await http.get(`/${currentLocation?.url}/ping`);
      } catch (error) {
        console.error(error);
      }
    }
  }, [tokenPayload, currentLocation, isAuthenticated]);

  useEffect(() => {
    setTimeout(() => setMessage(null), 3000);
  }, [message]);

  useEffect(() => {
    if (!isAuthenticated) {
      return router.push(`/login`);
    }
  }, [isAuthenticated]);

  return (
    <AppContext.Provider
      value={{
        dispatchMessage,
        currentLocation,
        lastLocation,
        locations,
        isAuthenticated,
        roles,
        tokenPayload,
        setTokenPayload,
        reset,
      }}
    >
      <Header locations={locations} />

      <DrawerContext.Provider
        value={{
          isOpen,
          setOpen,
          toggle: () => setOpen(!isOpen),
        }}
      >
        <Component {...pageProps} />
      </DrawerContext.Provider>

      <Footer />

      <Toaster message={message} />
    </AppContext.Provider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  const { data: locations } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_PROXY}/api/locations`
  );

  return {
    ...appProps,
    locations,
  };
};

export default MyApp;
