import { useEffect, useMemo, useState } from "react";
import styles from "./header.module.css";
import utilities from "../../styles/utilities/utilities";
import Link from "next/link";
import { Location } from "../../lib/types";
import cookies from "js-cookie";
import { LocationSelect } from "../locationSelect/locationSelect";
import { IconButton } from "../iconButton/iconButton";
import cx from "classix";
import { useRouter } from "next/router";
import { RouterLink } from "../routerLink/routerLink";
import { useAppContext } from "../../pages/_app";

type HeaderProps = {
  locations: Location[];
};

export function Header({ locations }: HeaderProps) {
  const { query, asPath } = useRouter();
  const [mobileOverlay, setMobileOverlay] = useState<boolean>(false);

  const { authenticated, currentLocation, tokenPayload } = useAppContext();

  const backlink = useMemo(
    () =>
      authenticated && currentLocation ? `/${currentLocation.url}` : "/login",
    [authenticated]
  );

  useEffect(() => {
    setMobileOverlay(false);
  }, [query.location, asPath]);

  return (
    <header className={styles.root}>
      <nav className={styles.nav}>
        <div className={styles.primary}>
          <Link className={utilities.typograpy.delta700} href={backlink}>
            BoulderDB
          </Link>

          {authenticated && currentLocation ? (
            <>
              <LocationSelect locations={locations} />

              <RouterLink
                href={`/boulder`}
                prefixLocation={true}
                className={cx(utilities.typograpy.delta700, styles.navItem)}
              >
                Boulder
              </RouterLink>

              <RouterLink
                href={`/ranking`}
                prefixLocation={true}
                className={cx(utilities.typograpy.delta700, styles.navItem)}
              >
                Ranking
              </RouterLink>
            </>
          ) : null}
        </div>

        <div className={styles.secondary}>
          {authenticated && tokenPayload ? (
            <>
              <RouterLink
                href={"/account"}
                className={cx(utilities.typograpy.delta700, styles.navItem)}
              >
                [{tokenPayload.username}]
              </RouterLink>

              <IconButton
                outline={false}
                onClick={() => {
                  cookies.remove("authenticated");
                }}
                icon="right"
                className={styles.navItem}
              />
            </>
          ) : null}

          <IconButton
            icon={mobileOverlay ? "close" : "burger"}
            onClick={() => setMobileOverlay(!mobileOverlay)}
            outline={false}
            className={styles.toggleMobileMenu}
          />
        </div>
      </nav>

      {mobileOverlay ? (
        <div className={styles.mobileOverlay}>
          {authenticated && currentLocation ? (
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
          ) : null}
        </div>
      ) : null}
    </header>
  );
}
