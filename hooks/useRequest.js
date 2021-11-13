import axios from "axios";
import { useMemo } from "react";

function useHttp() {
  return useMemo(() => {
    return axios.create({
      baseURL: `/api`,
    });
  }, []);
}

export { useHttp };
