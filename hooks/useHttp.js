import axios from "axios";
import { useMemo } from "react";
import useSWR from "swr";

const fetcher = (url) =>
  axios.get(`/api${url}`).then((response) => response.data);

export function useCachedHttp(resource) {
  const { data, error } = useSWR(resource, fetcher);

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
