import utilities from "../../../styles/utilities/utilities";
import RankingView from "../../../components/rankingView/rankingView";
import { useAppContext } from "../../_app";
import useSWR from "swr";
import Loader from "../../../components/loader/loader";
import { fetcher } from "../../../lib/http";

export default function Page() {
  const { currentLocation } = useAppContext();

  const { data: ranking } = useSWR(
    `/api/${currentLocation?.url}/rankings/current`,
    fetcher
  );

  const { data: boulderCount } = useSWR(
    `/api/${currentLocation?.url}/boulders/count`,
    fetcher
  );

  if (!ranking || !boulderCount) {
    return <Loader />;
  }

  return (
    <>
      <h1 className={utilities.typograpy.alpha700}>Ranking</h1>
      <RankingView ranking={ranking} boulderCount={boulderCount} />
    </>
  );
}
