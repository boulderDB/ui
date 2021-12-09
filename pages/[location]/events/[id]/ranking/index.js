import { useContext } from "react";
import { AppContext } from "../../../../_app";
import { useCachedHttp } from "../../../../../hooks/useHttp";
import Loader from "../../../../../components/loader/loader";
import Layout from "../../../../../components/layout/layout";
import Meta from "../../../../../components/meta/meta";
import { layoutStyles, typography } from "../../../../../styles/utilities";
import cn from "classnames";
import RankingView from "../../../../../components/rankingView/rankingView";
import { useRouter } from "next/router";

export default function Index() {
  const { currentLocation } = useContext(AppContext);
  const {
    query: { id },
  } = useRouter();

  const ranking = useCachedHttp(
    `/${currentLocation?.url}/rankings/event/${id}`
  );

  const event = useCachedHttp(`/${currentLocation?.url}/events/${id}`);

  if (!ranking || !event) {
    return <Loader />;
  }

  return (
    <Layout>
      <Meta title={`${event.name} Ranking`} />

      <div className={layoutStyles.grid}>
        <h1 className={cn(layoutStyles.sideTitle, typography.alpha700)}>
          {event.name} Ranking
        </h1>

        <div className={layoutStyles.sideContent}>
          <RankingView ranking={ranking} boulderCount={event.boulders.length} />
        </div>
      </div>
    </Layout>
  );
}
