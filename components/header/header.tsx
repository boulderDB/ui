import { Fragment, useEffect, useMemo, useState } from "react";
import styles from "./header.module.css";
import utilities from "../../styles/utilities/utilities";
import Link from "next/link";
import { Location } from "../../lib/types";
import { IconButton } from "../iconButton/iconButton";
import cx from "classix";
import { useRouter } from "next/router";
import { RouterLink } from "../routerLink/routerLink";
import { useAppContext } from "../../pages/_app";
import { DropDown } from "../dropdown/dropdown";
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "../../lib/http";
import { Dialog, Transition } from "@headlessui/react";
import { EventList } from "../eventList/eventList";

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
    logout,
  } = useAppContext();

  useSWR(
    authenticated && currentLocation
      ? `/api/${currentLocation?.url}/ping`
      : null,
    fetcher
  );

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

  return (
    <header className={styles.root}>
      <nav className={styles.nav}>
        <div className={styles.primary}>
          <Link
            className={cx(utilities.typograpy.delta700, styles.logo)}
            href={backlink}
          >
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

          {authenticated ? (
            <IconButton
              icon={mobileOverlay ? "close" : "burger"}
              onClick={() => setMobileOverlay(!mobileOverlay)}
              outline={false}
              className={styles.toggleMobileMenu}
            />
          ) : null}
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
              {activeEvents?.length ? (
                <EventList title={"Active event"} items={activeEvents} />
              ) : null}

              {upcomingEvents?.length ? (
                <>
                  <EventList title={"Upcoming event"} items={upcomingEvents} />
                </>
              ) : null}

              <hr />

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
                        onClick={() => logout()}
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
