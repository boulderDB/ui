import "../styles/globals/index.css";
import { createContext, useEffect, useMemo, useState } from "react";
import Toaster from "../components/toaster/toaster";
import Header from "../components/header/header";
import { Footer } from "../components/footer/footer";
import App from "next/app";
import axios from "axios";
import jwtDecode from "jwt-decode";
import usePersistentState from "../hooks/usePersistentState";

export const AppContext = createContext(null);

function MyApp({
  Component,
  pageProps,
  locations,
  currentLocation,
  isAuthenticated,
  isAdmin,
}) {
  const [message, setMessage] = useState(null);
  const [lastLocation, setLastLocation] = usePersistentState(
    "lastLocation",
    null
  );
  const [tokenPayload, setTokenPayload] = usePersistentState(
    "tokenPayload",
    null
  );

  const dispatchMessage = (newMessage) => {
    setMessage(newMessage);
  };

  const reset = () => {
    setTokenPayload(null);
  };

  useEffect(() => {
    if (!lastLocation) {
      setLastLocation(tokenPayload?.lastVisitedLocation);
      return;
    }

    if (currentLocation !== undefined) {
      setLastLocation(currentLocation);
    }
  }, [currentLocation, tokenPayload]);

  useEffect(() => {
    setTimeout(() => setMessage(null), 3000);
  }, [message]);

  return (
    <AppContext.Provider
      value={{
        dispatchMessage,
        currentLocation,
        lastLocation,
        isAuthenticated,
        isAdmin,
        setTokenPayload,
        tokenPayload,
        reset,
      }}
    >
      <Header locations={locations} />
      <Component {...pageProps} />
      <Footer />

      <Toaster message={message} />
    </AppContext.Provider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  const token = appContext?.ctx?.req?.cookies?.BEARER;
  const locationParameter = appContext.router?.query?.location;
  const tokenPayload = token ? jwtDecode(token) : {};

  const { data: locations } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_PROXY}/api/locations`
  );

  const currentLocation = locations.find(
    (location) => location.url === locationParameter
  );

  const isAuthenticated = new Date().getTime() / 1000 <= tokenPayload?.exp;
  const isAdmin = tokenPayload?.roles?.includes(
    `ROLE_ADMIN@${currentLocation?.url}`
  );

  return {
    ...appProps,
    locations,
    currentLocation,
    isAuthenticated,
    isAdmin,
  };
};

export default MyApp;
