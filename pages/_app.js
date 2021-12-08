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
import { SWRConfig } from "swr";
import useDocumentScrollLock from "../hooks/useDocumentScrollLock";

export const AppContext = createContext(null);

const loginRedirectExclusions = [
  "/login",
  "/sign-up",
  "/reset-password",
  "/reset-password/[token]",
  "/404",
  "/500",
];

function MyApp({ Component, pageProps, locations }) {
  const router = useRouter();
  const http = useHttp();

  const locationParameter = router?.query?.location;

  const [disableScroll, enableScroll] = useDocumentScrollLock({
    disableOnMount: false,
  });

  const [message, setMessage] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [events, setEvents] = useState([]);

  const [lastVisitedLocation, setLastVisitedLocation] = usePersistentState(
    "lastVisitedLocation",
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
    setLastVisitedLocation(null);
  };

  useEffect(async () => {
    if (!lastVisitedLocation) {
      setLastVisitedLocation(tokenPayload?.lastVisitedLocation);
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
    if (
      !isAuthenticated &&
      !loginRedirectExclusions.includes(router.pathname)
    ) {
      return router.push(`/login`);
    }
  }, [isAuthenticated]);

  useEffect(async () => {
    if (!currentLocation || !isAuthenticated) {
      return;
    }

    try {
      const { data } = await http.get(`/${currentLocation?.url}/events`);

      setEvents(data);
    } catch (error) {
      console.error(error);
    }
  }, [currentLocation]);

  useEffect(() => {
    if (isOpen) {
      disableScroll();
    } else {
      enableScroll();
    }
  }, [isOpen]);

  return (
    <AppContext.Provider
      value={{
        dispatchMessage,
        currentLocation,
        lastVisitedLocation,
        locations,
        events,
        isAuthenticated,
        roles,
        tokenPayload,
        setTokenPayload,
        reset,
      }}
    >
      <Header />

      <DrawerContext.Provider
        value={{
          isOpen,
          setOpen,
          toggle: () => setOpen(!isOpen),
        }}
      >
        <SWRConfig>
          <Component {...pageProps} />
        </SWRConfig>
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
