import axios from "axios";
import { useMemo } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";

const fetcher = (url, params) =>
  axios
    .get(`/api${url}`, {
      params,
    })
    .then((response) => response.data);

export const fetchOnceConfig = {
  revalidateOnFocus: false,
  refreshWhenOffline: false,
  refreshWhenHidden: false,
  refreshInterval: 0,
};

export function useCachedHttp(resource, params, config) {
  let key = resource;

  if (params) {
    key += new URLSearchParams(params).toString();
  }

  const { data, error } = useSWR(key, () => fetcher(resource, params), config);
  const router = useRouter();

  if (error) {
    if (error?.response.status === 404) {
      return router.push("/404");
    }

    console.error(error?.response);
    throw error;
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
