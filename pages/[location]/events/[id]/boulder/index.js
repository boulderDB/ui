import { useContext } from "react";
import { AppContext } from "../../../../_app";
import { useCachedHttp } from "../../../../../hooks/useHttp";
import Loader from "../../../../../components/loader/loader";
import { useRouter } from "next/router";
import Layout from "../../../../../components/layout/layout";
import Meta from "../../../../../components/meta/meta";
import { layoutStyles, typography } from "../../../../../styles/utilities";
import cn from "classnames";
import { Boulders } from "../../../boulder";

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
      <Meta title={"Boulders"} />

      <div className={layoutStyles.grid}>
        <h1 className={cn(layoutStyles.sideTitle, typography.alpha700)}>
          Boulder
        </h1>

        <div className={layoutStyles.sideContent}>
          <Boulders boulders={event.boulders} event={event} />
        </div>
      </div>
    </Layout>
  );
}
