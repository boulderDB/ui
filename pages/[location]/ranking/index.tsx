import utilities from "../../../styles/utilities/utilities";
import RankingView from "../../../components/rankingView/rankingView";
import { useAppContext } from "../../_app";
import useSWR from "swr";
import { fetcher } from "../../../lib/http";
import { useRouter } from "next/router";
import { Event } from "../../../lib/types";
import { Notice } from "../../../components/notice/notice";
import { Loader } from "../../../components/loader/loader";
import { parseDate } from "../../../lib/parseDate";

export default function Page() {
  const { currentLocation } = useAppContext();
  const { query } = useRouter();

  const { data: event } = useSWR<Event>(
    query.forEvent
      ? `/api/${currentLocation?.url}/events/${query.forEvent}`
      : null,
    fetcher
  );

  const { data } = useSWR(
    event
      ? `/api/${currentLocation?.url}/rankings/event/${event.id}`
      : `/api/${currentLocation?.url}/rankings/current`,
    fetcher
  );

  const { data: boulderCount } = useSWR(
    `/api/${currentLocation?.url}/boulders/count`,
    fetcher
  );

  if (!data || !boulderCount) {
    return <Loader />;
  }

  if (query.forEvent && !event) {
    return <h1 className={utilities.typograpy.alpha700}>Event not found</h1>;
  }

  if (query.forEvent && event && event.state === "upcoming") {
    return (
      <Notice type="error" display="inline">
        <h1 className={utilities.typograpy.alpha700}>
          This event starts {parseDate(event.startDate, true)}
        </h1>
      </Notice>
    );
  }

  return (
    <>
      <h1 className={utilities.typograpy.alpha700}>Ranking</h1>
      <RankingView data={data} boulderCount={boulderCount} forEvent={event} />
    </>
  );
}
