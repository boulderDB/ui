import "../styles/globals/index.css";
import { createContext, useEffect, useMemo, useState } from "react";
import usePersistentState from "../hooks/usePersistentState";
import getLocalStorage from "../utilties/getLocalStorage";
import Toaster from "../components/toaster/toaster";
import Header from "../components/header/header";
import { Footer } from "../components/footer/footer";
import useLocation from "../hooks/useLocation";
import { useRouter } from "next/router";

export const AppContext = createContext(null);

function MyApp({ Component, pageProps }) {
  const location = useLocation();
  const router = useRouter();

  const [user, setUser] = usePersistentState("user", null);
  const [lastVisitedLocation, setLastVisitedLocation] = usePersistentState(
    "location",
    null
  );
  const [expiration, setExpiration] = usePersistentState("expiration", null);
  const [developmentToken, setDevelopmentToken] = usePersistentState(
    "developmentToken",
    null
  );
  const [messageQueue, setMessageQueue] = useState([]);

  const dispatchMessage = (newToast) => {
    setMessageQueue([...messageQueue, newToast]);
  };

  const isAuthenticated = useMemo(() => {
    if (!user || !expiration) {
      return false;
    }

    return new Date().getTime() / 1000 <= expiration;
  }, [user, expiration]);

  const isAdmin = useMemo(() => {
    if (!user || !location) {
      return false;
    }

    if (!Array.isArray(user.roles)) {
      return false;
    }

    return user.roles.includes(`ROLE_ADMIN@${location}`);
  }, [user, location]);

  const reset = () => {
    setUser(null);
    setExpiration(null);

    getLocalStorage()?.clear();
  };

  useEffect(() => {
    if (!isAuthenticated) {
      reset();
      router.push("/login");
    }
  }, [isAuthenticated]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        lastVisitedLocation,
        setLastVisitedLocation,
        expiration,
        setExpiration,
        isAdmin,
        isAuthenticated,
        reset,
        developmentToken,
        setDevelopmentToken,
        dispatchMessage,
      }}
    >
      <Header />
      <Component {...pageProps} />
      <Footer />

      <Toaster queue={messageQueue} />
    </AppContext.Provider>
  );
}

export default MyApp;
