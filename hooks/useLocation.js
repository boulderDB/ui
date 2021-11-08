import { useRouter } from "next/router";

export default function useLocation() {
  const router = useRouter();

  return router?.query?.location;
}
