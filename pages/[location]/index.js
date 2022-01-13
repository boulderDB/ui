import Layout from "../../components/layout/layout";
import Meta from "../../components/meta/meta";
import { layoutStyles, typography } from "../../styles/utilities";
import cn from "classnames";
import { useCallback, useContext } from "react";
import { AppContext } from "../_app";
import Link from "next/link";
import styles from "./index.module.css";
import { useCachedHttp, useHttp } from "../../hooks/useHttp";
import Button from "../../components/button/button";
import parseDate from "../../utilties/parseDate";
import toast from "../../utilties/toast";
import extractErrorMessage from "../../utilties/extractErrorMessage";
import { mutate } from "swr";

function EventList({ title, items }) {
  const { currentLocation, dispatchMessage } = useContext(AppContext);
  const http = useHttp();

  const registrationHandler = useCallback(async (event) => {
    try {
      if (event.isParticipant) {
        await http.delete(
          `/${currentLocation?.url}/events/${event.id}/registration`
        );

        dispatchMessage(
          toast(`You successfully unregistered from ${title}`, "success")
        );
      } else {
        await http.post(
          `/${currentLocation?.url}/events/${event.id}/registration`
        );

        dispatchMessage(toast(`You are now registered to ${title}`, "success"));
      }

      mutate(`/${currentLocation?.url}/events`);
      mutate(
        `/${currentLocation?.url}/events` +
          new URLSearchParams({
            filter: "upcoming",
          }).toString()
      );
      mutate(
        `/${currentLocation?.url}/events` +
          new URLSearchParams({
            filter: "active",
          }).toString()
      );
    } catch (error) {
      dispatchMessage(toast("Error", extractErrorMessage(error), "error"));
    }
  }, []);

  return (
    <div className={styles.eventList}>
      <h2 className={typography.alpha700}>{title} Events</h2>

      <ul className={styles.links}>
        {items.map((event) => (
          <li className={styles.link}>
            <div>
              <span className={typography.delta700}>{event.name}</span>

              <p className={typography.delta}>
                {parseDate(event.startDate).string} –{" "}
                {parseDate(event.endDate).string}
              </p>
            </div>

            <Button
              size={"xs"}
              variant={event.isParticipant ? "danger" : "default"}
              inverted={true}
              onClick={async () => await registrationHandler(event)}
            >
              {event.isParticipant ? "Unregister" : "Register"}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Index() {
  const { tokenPayload, currentLocation } = useContext(AppContext);

  const upcoming = useCachedHttp(`/${currentLocation?.url}/events`, {
    filter: "upcoming",
  });

  const active = useCachedHttp(`/${currentLocation?.url}/events`, {
    filter: "active",
  });

  return (
    <Layout>
      <Meta title={"Account"} />

      <div className={layoutStyles.grid}>
        <div className={layoutStyles.firstHalf}>
          <h1 className={cn(layoutStyles.sideTitle, typography.alpha700)}>
            Welcome back {tokenPayload?.user?.username} 👋
          </h1>

          <ul className={styles.links}>
            <li className={styles.link}>
              <Link href={`/${currentLocation?.url}/boulder`}>
                <a className={cn(typography.gamma)}>Boulder</a>
              </Link>
            </li>

            <li className={styles.link}>
              <Link href={`/${currentLocation?.url}/rankings/current`}>
                <a className={cn(typography.gamma)}>Ranking</a>
              </Link>
            </li>
          </ul>
        </div>

        <div className={cn(layoutStyles.secondHalf)}>
          {active && active.length > 0 && (
            <EventList items={active} title={"Current"} />
          )}

          {upcoming && upcoming.length > 0 && (
            <EventList items={upcoming} title={"Upcoming"} />
          )}
        </div>
      </div>
    </Layout>
  );
}
