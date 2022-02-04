import { useContext } from "react";
import { AppContext } from "../../../../_app";
import { useCachedHttp } from "../../../../../hooks/useHttp";
import Loader from "../../../../../components/loader/loader";
import { useRouter } from "next/router";
import Layout from "../../../../../components/layout/layout";
import Meta from "../../../../../components/meta/meta";
import BoulderView from "../../../../../components/boulderView/boulderView";

export default function Index() {
  const { currentLocation } = useContext(AppContext);
  const {
    query: { id },
  } = useRouter();

  const event = useCachedHttp(`/${currentLocation?.url}/events/${id}`);
  const boulders = useCachedHttp(`/${currentLocation?.url}/boulders`, {
    event: id,
  });

  if (!event || !boulders) {
    return <Loader />;
  }

  return (
    <Layout>
      <Meta title={"Boulders"} />

      <BoulderView
        event={event}
        boulders={boulders}
        initialFilters={[
          {
            id: "ascent",
            value: "todo",
          },
        ]}
      />
    </Layout>
  );
}
