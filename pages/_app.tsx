import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import { Footer } from "../components/footer/footer";
import axios from "axios";
import styles from "../styles/pages/app.module.css";
import { Location, Role, TokenPayload } from "../lib/types";
import { Header } from "../components/header/_header";
import decode from "jwt-decode";
import { createContext, useContext, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";
import { HTTPError } from "../lib/http";
import "../styles/globals/index.css";
import cookies from "js-cookie";

type MyAppProps = {
  locations: Location[];
  tokenPayload: TokenPayload | null;
  authenticated: true;
} & AppProps;

type Context = {
  currentLocation: Location | null;
  authenticated: boolean;
  tokenPayload: TokenPayload | null;
  roles: Role[];
  hasRole: (role: Role) => boolean;
};

const AppContext = createContext<Context>({
  currentLocation: null,
  authenticated: false,
  tokenPayload: null,
  roles: [],
  hasRole: () => false,
});

export const useAppContext = () => {
  return useContext<Context>(AppContext);
};

export default function MyApp({
  Component,
  pageProps,
  locations,
  authenticated: initialAuthenticated,
  tokenPayload: intialTokenPayload,
}: MyAppProps) {
  const router = useRouter();

  const [tokenPayload, setTokenPayload] = useState<TokenPayload | null>(
    intialTokenPayload
  );

  const [authenticated, setAuthenticated] =
    useState<boolean>(initialAuthenticated);

  const currentLocation = useMemo(
    () =>
      locations.find((location) => location.url === router.query.location) ||
      null,
    [router.query.location]
  );

  const roles = currentLocation
    ? (tokenPayload?.user.roles
        .filter((role) => role.endsWith(currentLocation?.id.toString()))
        .map((role) => role.replace(`@${currentLocation.id}`, "")) as Role[])
    : [];

  return (
    <SWRConfig
      value={{
        onError: (error: HTTPError, key: string) => {
          if (error.response.code === 401) {
            cookies.remove("authenticated");

            return router.push("/login");
          }
        },
      }}
    >
      <AppContext.Provider
        value={{
          currentLocation,
          authenticated,
          tokenPayload,
          roles,
          hasRole: (role) => roles.includes(role),
        }}
      >
        <Header locations={locations} />

        <main className={styles.root}>
          <Component {...pageProps} />
        </main>

        <Footer />
      </AppContext.Provider>
    </SWRConfig>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const ctx = App.getInitialProps(context);

  const { data: locations } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/locations`
  );

  const token = context.ctx.req?.cookies["BEARER"];
  const authenticated = context.ctx.req?.cookies["authenticated"] === "true";

  return {
    ...ctx,
    locations,
    tokenPayload: token ? decode(token) : null,
    authenticated,
  };
};
