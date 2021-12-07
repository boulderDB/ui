import axios from "axios";
import { useMemo } from "react";
import useSWR from "swr";

const fetcher = (url, params) =>
  axios
    .get(`/api${url}`, {
      params,
    })
    .then((response) => response.data);

export function useCachedHttp(resource, params) {
  const { data, error } = useSWR(resource, () => fetcher(resource, params));

  if (error) {
    console.error(error);
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
