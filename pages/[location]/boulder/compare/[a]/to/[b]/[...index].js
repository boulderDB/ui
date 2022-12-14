import { useContext } from "react";
import { useRouter } from "next/router";
import { AppContext } from "../../../../../../_app";
import Layout from "../../../../../../../components/layout/layout";
import { useCachedHttp } from "../../../../../../../hooks/useHttp";
import Loader from "../../../../../../../components/loader/loader";
import Meta from "../../../../../../../components/meta/meta";
import CompareView from "../../../../../../../components/compareView/compareView";

export default function Index() {
  const { currentLocation } = useContext(AppContext);
  const {
    query: { a, b },
  } = useRouter();

  const comparisons = useCachedHttp(`/${currentLocation?.url}/compare/${a}/to/${b}/at/current`);

  if (!comparisons) {
    return <Loader />;
  }

  return (
    <Layout>
      <Meta title={"Comparisons"} />

      <CompareView comparisons={comparisons} />
    </Layout>
  );
}
