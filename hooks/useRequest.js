import useSWR from "swr";
import axios from "axios";
import { useMemo } from "react";
import { useRouter } from "next/router";
import extractErrorMessage from "../utilties/extractErrorMessage";
import useLocation from "./useLocation";

function useAxios(authentication = true, location = null) {
  return useMemo(() => {
    const baseURL = location ? `/api/${location}` : `/api`;

    let options = {
      baseURL,
      headers: {},
    };

    if (
      process.env.NODE_ENV !== "production" &&
      typeof window !== "undefined" &&
      authentication
    ) {
      options.headers["Authorization"] = `Bearer ${JSON.parse(
        localStorage.getItem("developmentToken")
      )}`;
    }

    return axios.create(options);
  }, [authentication, location]);
}

function useRequest(
  uri,
  location = true,
  authentication = true,
  requestConfig = { method: "get" },
  swrConfig
) {
  const http = useHttp(location, authentication);

  return useSWR(
    location ? `${location}${uri}` : `${uri}`,
    async (url) => {
      try {
        const { data } = await http({
          ...requestConfig,
          url,
        });

        return data;
      } catch (error) {
        console.error(extractErrorMessage(error));
      }
    },
    swrConfig
  );
}

function useHttp(location = true, authentication = true) {
  const currentLocation = useLocation();

  return useAxios(authentication, currentLocation ? currentLocation : null);
}

export { useRequest, useHttp };
