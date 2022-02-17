import axios from "axios";
import { useMemo } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";

const fetcher = (url, params) =>
  axios.get(`/api${url}`, { params }).then((response) => response.data);

export const fetchOnceConfig = {
  revalidateOnFocus: false,
  refreshWhenOffline: false,
  refreshWhenHidden: false,
  refreshInterval: 0,
};

export function useCachedHttp(
  resource,
  params,
  config,
  throwError = true,
  defaultData = null
) {
  const router = useRouter();
  let key = resource;

  if (params) {
    key += `?` + new URLSearchParams(params).toString();
  }

  console.debug(`Key: ${key}`);

  const { data, error } = useSWR(
    key,
    async () => await fetcher(resource, params),
    config
  );

  if (error) {
    console.error(`Request failed for resource: ${key}`);
    console.error(error?.response);

    if (error?.response?.status === 404) {
      router.push("/404");

      return defaultData;
    }

    if (error?.response?.status === 401) {
      router.push({
        pathname: "/login",
        query: { intent: router.asPath },
      });

      return defaultData;
    }

    if (error?.response?.status === 403) {
      router.push("/403");

      return defaultData;
    }

    if (throwError) {
      throw error;
    }
  }

  if (!resource && defaultData) {
    return defaultData;
  }

  return data;
}

function useHttp() {
  return useMemo(() => {
    return axios.create({
      baseURL: `/api`,
    });
  }, []);
}

export { useHttp };
