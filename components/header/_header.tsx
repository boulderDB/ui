import { useMemo, useState } from "react";
import styles from "./_header.module.css";
import utilities from "../../styles/utilities/utilities";
import Link from "next/link";
import { Location } from "../../lib/types";
import { Icon } from "../icon/_icon";
import cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { LocationSelect } from "../locationSelect/locationSelect";
import { useAppContext } from "../../pages/_app";

type HeaderProps = {
  locations: Location[];
};

export function Header({ locations }: HeaderProps) {
  const router = useRouter();
  const [mobileOverlay, setMobileOverlay] = useState<boolean>(false);

  const { authenticated, currentLocation, tokenPayload } = useAppContext();

  const backlink = useMemo(
    () =>
      authenticated && currentLocation ? `/${currentLocation.url}` : "/login",
    [authenticated]
  );

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

              <Link
                href={`/${currentLocation.url}/boulder`}
                className={styles.navItem}
              >
                Boulder
              </Link>

              <Link
                href={`/${currentLocation.url}/ranking`}
                className={styles.navItem}
              >
                Ranking
              </Link>
            </>
          ) : null}
        </div>

        <div className={styles.secondary}>
          {authenticated && tokenPayload ? (
            <>
              <Link href={"/account"} className={utilities.typograpy.delta700}>
                [{tokenPayload.username}]
              </Link>

              <button
                onClick={() => {
                  cookies.remove("authenticated");
                }}
              >
                <Icon name={"right"} />
              </button>
            </>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
