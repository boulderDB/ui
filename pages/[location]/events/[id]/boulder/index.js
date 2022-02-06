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
    query: { id, user: userId },
  } = useRouter();

  const event = useCachedHttp(`/${currentLocation?.url}/events/${id}`);
  const user = useCachedHttp(userId ? `/users/${userId}` : null);

  let boulderQueryParameters = {
    event: id,
  };

  if (userId) {
    boulderQueryParameters.forUser = userId;
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
        forUser={user}
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
