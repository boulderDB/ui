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
import extractRoleName from "../utilties/extractRoleName";

export const AppContext = createContext(null);

function MyApp({ Component, pageProps, locations }) {
  const router = useRouter();
  const http = useHttp();

  const locationParameter = router?.query?.location;

  const [disableScroll, enableScroll] = useDocumentScrollLock({
    disableOnMount: false,
  });

  const [message, setMessage] = useState(null);
  const [isOpen, setOpen] = useState(false);

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
      .map((role) => extractRoleName(currentLocation?.id, role));
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
    if (isOpen) {
      disableScroll();
    } else {
      enableScroll();
    }
  }, [isOpen]);

  return (
    <>
      <AppContext.Provider
        value={{
          dispatchMessage,
          currentLocation,
          lastVisitedLocation,
          locations,
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
          }}
        >
          <SWRConfig>
            <Component {...pageProps} />
          </SWRConfig>
        </DrawerContext.Provider>

        <Footer />

        <Toaster message={message} />
      </AppContext.Provider>

      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `window.$crisp = [];
            window.CRISP_WEBSITE_ID = "41427455-fa41-40ef-ba3d-2992db379922";
            (function (){d = document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})
            ();`,
        }}
      />
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const { data: locations } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/locations`
  );

  return {
    ...appProps,
    locations,
  };
};

export default MyApp;
