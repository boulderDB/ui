import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import { Footer } from "../components/footer/footer";
import axios from "axios";
import styles from "../styles/pages/app.module.css";
import { Location, Role, TokenPayload } from "../lib/types";
import decode from "jwt-decode";
import { createContext, useContext, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";
import { HTTPError } from "../lib/http";
import "../styles/globals/index.css";
import cookies from "js-cookie";
import { Header } from "../components/header/header";
import { NextPageContext } from "next";

type MyAppProps = {} & ContextState & AppProps;

type ContextState = {
  currentLocation: Location | null;
  authenticated: boolean;
  tokenPayload: TokenPayload | null;
  locations: Location[];
  roles: Role[];
};

type Context = {
  hasRole: (role: Role) => boolean;
} & ContextState;

const AppContext = createContext<Context>({
  currentLocation: null,
  authenticated: false,
  tokenPayload: null,
  locations: [],
  roles: [],
  hasRole: () => false,
});

export const useAppContext = () => {
  return useContext<Context>(AppContext);
};

export async function getDefaultInitialProps(context: NextPageContext) {
  const { data: locations } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/locations`
  );

  const cookies = context.req?.headers.cookie
    ?.split(";")
    .map((cookie) => cookie.split("="))
    .reduce((object, [key, value]) => {
      return {
        ...object,
        [key.trim()]: value.trim(),
      };
    }, {});

  const token = cookies?.["BEARER"];
  const tokenPayload = token ? decode<TokenPayload>(token) : null;
  const authenticated = cookies?.["authenticated"] === "true";

  const currentLocation = locations.find(
    (location) => location.url === context.query.location
  );

  tokenPayload;
  const roles = currentLocation
    ? (tokenPayload?.user.roles
        .filter((role) => role.endsWith(currentLocation?.id.toString()))
        .map((role) => role.replace(`@${currentLocation.id}`, "")) as Role[])
    : [];

  return {
    roles,
    locations,
    tokenPayload,
    authenticated,
    currentLocation,
  };
}

export default function MyApp({
  Component,
  pageProps,
  locations,
  authenticated,
  currentLocation,
  roles,
  tokenPayload,
}: MyAppProps) {
  const router = useRouter();
  const [context, setContext] = useState<ContextState>({
    currentLocation,
    authenticated,
    tokenPayload,
    locations,
    roles,
  });

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
          ...context,
          hasRole: (role) => context.roles.includes(role),
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
  const appContext = App.getInitialProps(context);

  return {
    ...appContext,
    ...(await getDefaultInitialProps(context.ctx)),
  };
};
