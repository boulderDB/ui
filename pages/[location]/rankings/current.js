import Layout from "../../../components/layout/layout";
import Meta from "../../../components/meta/meta";
import { layoutStyles, typography } from "../../../styles/utilities";
import cn from "classnames";
import { useContext } from "react";
import { AppContext } from "../../_app";
import { useCachedHttp } from "../../../hooks/useHttp";
import Loader from "../../../components/loader/loader";
import RankingView from "../../../components/rankingView/rankingView";

export default function Current() {
  const { currentLocation } = useContext(AppContext);

  const ranking = useCachedHttp(`/${currentLocation?.url}/rankings/current`);
  const boulderCount = useCachedHttp(`/${currentLocation?.url}/boulders/count`);

  if (!ranking) {
    return <Loader />;
  }

  return (
    <Layout>
      <Meta title={"Current ranking"} />

      <div className={layoutStyles.grid}>
        <h1 className={cn(layoutStyles.sideTitle, typography.alpha700)}>
          Current ranking
        </h1>

        <div className={layoutStyles.sideContent}>
          <RankingView
            ranking={ranking}
            boulderCount={boulderCount}
            userComparison={true}
          />
        </div>
      </div>
    </Layout>
  );
}
