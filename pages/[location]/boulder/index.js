import Layout from "../../../components/layout/layout";
import Meta from "../../../components/meta/meta";
import { useContext } from "react";
import { useCachedHttp } from "../../../hooks/useHttp";
import { AppContext } from "../../_app";
import Loader from "../../../components/loader/loader";
import BoulderView from "../../../components/boulderView/boulderView";

export default function Index() {
  const { currentLocation } = useContext(AppContext);
  const boulders = useCachedHttp(`/${currentLocation?.url}/boulders`);

  if (!boulders) {
    return <Loader />;
  }

  return (
    <Layout>
      <Meta title={"Boulders"} />

      <BoulderView
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
