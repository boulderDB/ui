import { useCachedHttp } from "../../../../../hooks/useHttp";
import { useContext } from "react";
import { AppContext } from "../../../../_app";
import { useRouter } from "next/router";
import Layout from "../../../../../components/layout/layout";
import Meta from "../../../../../components/meta/meta";
import Loader from "../../../../../components/loader/loader";

export default function Index() {
  const { currentLocation } = useContext(AppContext);
  const {
    query: { id },
  } = useRouter();

  const event = useCachedHttp(`/${currentLocation?.url}/events/${id}`);

  if (!event) {
    return <Loader />;
  }

  return (
    <Layout>
      <Meta title={`${event.name}`} />
    </Layout>
  );
}
