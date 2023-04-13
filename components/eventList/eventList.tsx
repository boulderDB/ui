import cx from "classix";
import utilities from "../../styles/utilities/utilities";
import styles from "./eventList.module.css";
import { Event, Location } from "../../lib/types";
import { RouterLink } from "../routerLink/routerLink";
import { Button } from "../button/button";
import { useSWRConfig } from "swr";
import { useAppContext } from "../../pages/_app";

type EventListProps = {
  title: string;
  className?: string;
  items: Event[];
};

export function EventList({ title, items, className }: EventListProps) {
  const { mutate } = useSWRConfig();
  const { currentLocation } = useAppContext();

  return (
    <ul className={cx(styles.root, className)}>
      {items.map((event) => (
        <li className={styles.item} key={event.id}>
          <h3 className={cx(utilities.typograpy.alpha700)}>
            {title}: {event.name}
          </h3>

          {event.isParticipant ? (
            <ul className={styles.links}>
              <li>
                <RouterLink
                  href={`/boulder?forEvent=${event.id}`}
                  prefixLocation={true}
                  className={cx(utilities.typograpy.alpha)}
                >
                  Boulder
                </RouterLink>
              </li>

              <li>
                <RouterLink
                  href={`/ranking?forEvent=${event.id}`}
                  prefixLocation={true}
                  className={cx(utilities.typograpy.alpha)}
                >
                  Ranking
                </RouterLink>
              </li>
            </ul>
          ) : (
            <>
              {event.public ? (
                <Button
                  className={styles.button}
                  size="small"
                  outlined={true}
                  display="inline"
                  onClick={async () => {
                    await mutate(
                      `/api/${(currentLocation as Location).url}/events/${
                        event.id
                      }/registration`,
                      async () => {
                        await fetch(
                          `/api/${(currentLocation as Location).url}/events/${
                            event.id
                          }/registration`,
                          {
                            method: "POST",
                          }
                        );
                      }
                    );

                    await mutate(
                      `/api/${
                        (currentLocation as Location).url
                      }/events?filter=active`
                    );

                    await mutate(
                      `/api/${
                        (currentLocation as Location).url
                      }/events?filter=upcoming`
                    );
                  }}
                >
                  Register
                </Button>
              ) : null}
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
