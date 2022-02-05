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
    query: { id, user },
  } = useRouter();

  const event = useCachedHttp(`/${currentLocation?.url}/events/${id}`);

  let boulderQueryParameters = {
    event: id,
  };

  if (user) {
    boulderQueryParameters.forUser = user;
  }

  const boulders = useCachedHttp(
    `/${currentLocation?.url}/boulders`,
    boulderQueryParameters
  );

  if (!event || !boulders) {
    return <Loader />;
  }

  return (
    <Layout>
      <Meta title={"Boulders"} />

      <BoulderView
        event={event}
        userId={user}
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
