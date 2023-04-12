import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import { Footer } from "../components/footer/footer";
import axios from "axios";
import styles from "../styles/pages/app.module.css";
import {
  Event,
  Location,
  PostLoginData,
  PostLoginResponse,
  Role,
  TokenPayload,
} from "../lib/types";
import decode from "jwt-decode";
import { createContext, useContext, useState } from "react";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";
import { HTTPError } from "../lib/http";
import cookies from "js-cookie";
import { Header } from "../components/header/header";
import { NextPageContext } from "next";
import "../styles/globals/index.css";

type MyAppProps = {} & ContextState & AppProps;

type ContextState = {
  currentLocation: Location | null;
  authenticated: boolean;
  tokenPayload: TokenPayload | null;
  locations: Location[];
  events: Event[];
  roles: Role[];
};

type Context = {
  hasRole: (role: Role) => boolean;
  setCurrentLocation: (location: Location | null) => void;
  logout: () => Promise<void>;
  login: (data: PostLoginData) => Promise<void>;
} & ContextState;

const AppContext = createContext<Context>({
  currentLocation: null,
  authenticated: false,
  tokenPayload: null,
  locations: [],
  events: [],
  roles: [],
  hasRole: () => false,
  setCurrentLocation: () => {},
  logout: async () => {},
  login: async () => {},
});

export const useAppContext = () => {
  return useContext<Context>(AppContext);
};

export async function getDefaultInitialProps(context: NextPageContext) {
  const { data: locations } = await axios.get<Location[]>(
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

  let roles: Role[] = [];
  let events: Event[] = [];

  const currentLocation =
    locations.find((location) => location.url === context.query.location) ||
    tokenPayload?.lastVisitedLocation;

  if (tokenPayload && currentLocation) {
    roles = tokenPayload.user.roles
      ?.filter((role) => role.endsWith(currentLocation?.id.toString()))
      .map((role) => role.replace(`@${currentLocation.id}`, "")) as Role[];
  }

  if (authenticated && currentLocation) {
    const { data: active } = await axios.get<Event[]>(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/${currentLocation?.url}/events`,
      {
        params: { filter: "active" },
        headers: {
          Authorization: `BEARER ${token}`,
        },
      }
    );

    const { data: upcoming } = await axios.get<Event[]>(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/${currentLocation?.url}/events`,
      {
        params: { filter: "upcoming" },
        headers: {
          Authorization: `BEARER ${token}`,
        },
      }
    );

    events = [...active, ...upcoming];
  }

  return {
    roles,
    locations,
    tokenPayload,
    authenticated,
    currentLocation,
    events,
  };
}

export default function MyApp({
  Component,
  pageProps,
  locations,
  events,
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
    events,
    roles,
  });

  function setCurrentLocation(location: Location | null) {
    setContext({
      ...context,
      currentLocation: location,
    });
  }

  async function logout() {
    cookies.remove("authenticated");

    setContext({
      ...context,
      currentLocation: null,
      tokenPayload: null,
      authenticated: false,
      events: [],
      roles: [],
    });

    await router.push("/login");
  }

  async function login(data: PostLoginData) {
    const { data: response } = await axios.post<PostLoginResponse>(
      "/api/login",
      data
    );

    const expires = response.expiration - Math.floor(Date.now() / 1000);

    cookies.set("authenticated", true, {
      expires,
    });

    setContext({
      ...context,
      currentLocation: response.lastVisitedLocation,
      tokenPayload: {
        ...response,
        iat: Date.now(),
        exp: response.expiration,
        username: response.user.username,
        roles: response.user.roles as string[],
      },
      authenticated: true,
    });

    await router.push(
      response.lastVisitedLocation
        ? `/${response.lastVisitedLocation.url}`
        : "/setup"
    );
  }

  return (
    <SWRConfig
      value={{
        onError: (error: HTTPError, key: string) => {
          console.error(error);

          if (error?.response?.code === 401) {
            cookies.remove("authenticated");

            return router.push("/login");
          }
        },
      }}
    >
      <AppContext.Provider
        value={{
          ...context,
          setCurrentLocation,
          logout,
          login,
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
