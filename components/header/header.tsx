import { Fragment, useEffect, useMemo, useState } from "react";
import styles from "./header.module.css";
import utilities from "../../styles/utilities/utilities";
import Link from "next/link";
import { Event, Location } from "../../lib/types";
import cookies from "js-cookie";
import { IconButton } from "../iconButton/iconButton";
import cx from "classix";
import { useRouter } from "next/router";
import { RouterLink } from "../routerLink/routerLink";
import { useAppContext } from "../../pages/_app";
import { DropDown } from "../dropdown/dropdown";
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "../../lib/http";
import { Button } from "../button/button";
import { resources } from "../../pages/[location]/[resource]";
import { Dialog, Transition } from "@headlessui/react";

type HeaderProps = {
  locations: Location[];
};

export function Header({ locations }: HeaderProps) {
  const router = useRouter();
  const [mobileOverlay, setMobileOverlay] = useState<boolean>(false);

  const {
    authenticated,
    currentLocation,
    tokenPayload,
    setCurrentLocation,
    hasRole,
  } = useAppContext();

  const { mutate } = useSWRConfig();

  useSWR(authenticated ? `/api/${currentLocation?.url}/ping` : null, fetcher);

  const { data: activeEvents = [] } = useSWR(
    currentLocation
      ? `/api/${currentLocation?.url}/events?filter=active`
      : null,
    fetcher
  );

  const { data: upcomingEvents = [] } = useSWR(
    currentLocation
      ? `/api/${currentLocation?.url}/events?filter=upcoming`
      : null,
    fetcher
  );

  const backlink = useMemo(
    () =>
      authenticated && currentLocation ? `/${currentLocation.url}` : "/login",
    [authenticated]
  );

  useEffect(() => {
    setMobileOverlay(false);
  }, [router.query.location, router.asPath]);

  const events: Event[] = [...activeEvents, ...upcomingEvents];

  return (
    <header className={styles.root}>
      <nav className={styles.nav}>
        <div className={styles.primary}>
          <Link className={utilities.typograpy.delta700} href={backlink}>
            BoulderDB
          </Link>

          {authenticated && currentLocation ? (
            <>
              <DropDown<Location & { active: boolean }>
                items={locations.map((location) => {
                  return {
                    ...location,
                    active: location.url === router.query.location,
                  };
                })}
                label={`@${currentLocation.name}`}
                renderItem={(props, item) => <>{item.name}</>}
                onClick={async (item) => {
                  await router.push(`/${item.url}`);
                  setCurrentLocation(item);
                }}
              />

              <RouterLink
                href={`/boulder`}
                prefixLocation={true}
                className={cx(utilities.typograpy.delta, styles.navItem)}
              >
                Boulder
              </RouterLink>

              <RouterLink
                href={`/ranking`}
                prefixLocation={true}
                className={cx(utilities.typograpy.delta, styles.navItem)}
              >
                Ranking
              </RouterLink>

              {/* {events.map((event) => (
                <DropDown<{
                  id: string;
                  label: string;
                  href: string;
                }>
                  className={styles.navItem}
                  items={[
                    {
                      id: "boulder",
                      label: "Boulder",
                      href: `/${currentLocation.url}/boulder?forEvent=${event.id}`,
                    },
                    {
                      id: "ranking",
                      label: "Ranking",
                      href: `/${currentLocation.url}/ranking?forEvent=${event.id}`,
                    },
                  ]}
                  label={event.name}
                  renderItem={(props, item) => (
                    <Link href={item.href} onClick={() => props.close()}>
                      {item.label}
                    </Link>
                  )}
                />
              ))} */}
            </>
          ) : null}
        </div>

        <div className={styles.secondary}>
          {/* {authenticated && hasRole("ROLE_ADMIN") ? (
            <DropDown
              className={styles.admin}
              label={"Admin"}
              items={resources}
              renderItem={(props, item) => (
                <Link
                  href={`/${currentLocation?.url}/${item.id}`}
                  onClick={() => props.close()}
                >
                  {item.label}
                </Link>
              )}
            />
          ) : null} */}

          {/* {authenticated && tokenPayload ? (
            <>
              <RouterLink
                href={"/account"}
                className={cx(utilities.typograpy.delta, styles.navItem)}
              >
                [{tokenPayload.username}]
              </RouterLink>

              <button
                onClick={() => {
                  cookies.remove("authenticated");
                  router.push("/login");
                }}
                className={cx(utilities.typograpy.delta, styles.navItem)}
              >
                Logout
              </button>
            </>
          ) : null} */}

          <IconButton
            icon={mobileOverlay ? "close" : "burger"}
            onClick={() => setMobileOverlay(!mobileOverlay)}
            outline={false}
            className={styles.toggleMobileMenu}
          />
        </div>
      </nav>

      <Transition appear show={mobileOverlay} as={Fragment}>
        <Dialog
          as="div"
          className={styles.mobileOverlay}
          onClose={() => setMobileOverlay(false)}
        >
          {authenticated && currentLocation ? (
            <>
              {events?.length ? (
                <>
                  <ul className={styles.mobileNav}>
                    {events.map((event) => (
                      <li className={styles.mobileNavItem} key={event.id}>
                        <h3 className={cx(utilities.typograpy.alpha700)}>
                          Event / {event.name}
                        </h3>

                        {event.isParticipant ? (
                          <ul className={styles.event}>
                            <li>
                              <RouterLink
                                href={`/boulder?forEvent=${event.id}`}
                                prefixLocation={true}
                                className={cx(utilities.typograpy.gamma700)}
                              >
                                Boulder
                              </RouterLink>
                            </li>

                            <li>
                              <RouterLink
                                href={`/ranking?forEvent=${event.id}`}
                                prefixLocation={true}
                                className={cx(utilities.typograpy.gamma700)}
                              >
                                Ranking
                              </RouterLink>
                            </li>
                          </ul>
                        ) : (
                          <>
                            {event.public ? (
                              <Button
                                className={styles.event}
                                size="small"
                                outlined={true}
                                display="inline"
                                onClick={async () => {
                                  await mutate(
                                    `/api/${currentLocation.url}/events/${event.id}/registration`,
                                    async () => {
                                      await fetch(
                                        `/api/${currentLocation.url}/events/${event.id}/registration`,
                                        {
                                          method: "POST",
                                        }
                                      );
                                    }
                                  );

                                  await mutate(
                                    `/api/${currentLocation?.url}/events?filter=active`
                                  );

                                  await mutate(
                                    `/api/${currentLocation.url}/events?filter=upcoming`
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

                  <hr />
                </>
              ) : null}

              <ul className={styles.mobileNav}>
                <li className={styles.mobileNavItem}>
                  <RouterLink
                    href={`/boulder`}
                    prefixLocation={true}
                    className={cx(utilities.typograpy.alpha700)}
                  >
                    Boulder
                  </RouterLink>
                </li>

                <li className={styles.mobileNavItem}>
                  <RouterLink
                    href={`/ranking`}
                    prefixLocation={true}
                    className={cx(utilities.typograpy.alpha700)}
                  >
                    Ranking
                  </RouterLink>
                </li>
              </ul>

              {authenticated && tokenPayload ? (
                <>
                  <hr />

                  <ul className={styles.mobileNav}>
                    <li className={styles.mobileNavItem}>
                      <RouterLink
                        href={"/account"}
                        className={cx(utilities.typograpy.alpha700)}
                      >
                        [{tokenPayload.username}]
                      </RouterLink>
                    </li>

                    <li className={styles.mobileNavItem}>
                      <button
                        onClick={() => {
                          cookies.remove("authenticated");
                          router.push("/login");
                        }}
                        className={cx(utilities.typograpy.alpha700)}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </>
              ) : null}
            </>
          ) : null}
        </Dialog>
      </Transition>
    </header>
  );
}
