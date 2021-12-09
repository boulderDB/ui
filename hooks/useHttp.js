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

export function useCachedHttp(resource, params) {
  const { data, error } = useSWR(resource, () => fetcher(resource, params));
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
