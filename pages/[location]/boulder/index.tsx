import { useRouter } from "next/router";
import { BoulderView } from "../../../components/boulderView/boulderView";
import { fetcher } from "../../../lib/http";
import { Boulder, Event, User } from "../../../lib/types";
import utilities from "../../../styles/utilities/utilities";
import useSWR from "swr";
import { parseDate } from "../../../lib/parseDate";
import { Notice } from "../../../components/notice/notice";
import { Loader } from "../../../components/loader/loader";
import { useAppContext } from "../../_app";
import { ascents } from "../../../lib/globals";

export default function Page() {
  const { currentLocation, hasRole } = useAppContext();
  const { query } = useRouter();

  const { data: user } = useSWR<User>(
    hasRole("ROLE_ADMIN") && query.forUser
      ? `/api/${currentLocation?.url}/users/${query.forUser}`
      : null,
    fetcher
  );

  const { data: event, isLoading: eventIsLoading } = useSWR<Event>(
    query.forEvent
      ? `/api/${currentLocation?.url}/events/${query.forEvent}`
      : null,
    fetcher
  );

  const { data: boulders } = useSWR<Boulder[]>(
    `/api/${currentLocation?.url}/boulders`,
    fetcher
  );

  if (!boulders || eventIsLoading) {
    return <Loader />;
  }

  if (query.forEvent && !event) {
    return <h1 className={utilities.typograpy.alpha700}>Event not found</h1>;
  }

  if (query.forEvent && event && event.state === "ended") {
    return (
      <Notice type="error" display="inline">
        <h1 className={utilities.typograpy.alpha700}>
          This event has ended on {parseDate(event.endDate, true)}
        </h1>
      </Notice>
    );
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

  if (query.forEvent && event && !event.isParticipant) {
    return (
      <Notice type="error" display="inline">
        <h1 className={utilities.typograpy.alpha700}>
          Your are not registered for this event
        </h1>
      </Notice>
    );
  }

  return (
    <>
      <h1 className={utilities.typograpy.alpha700}>
        Boulder ({event ? event.boulders.length : boulders?.length})
      </h1>

      <BoulderView
        data={event ? event.boulders : boulders}
        forUser={user}
        forEvent={event}
        initialFilters={[
          {
            id: "ascent",
            value: ascents.find((ascent) => ascent.id === "todo"),
          },
        ]}
      />
    </>
  );
}
