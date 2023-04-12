import cx from "classix";
import styles from "../styles/pages/setup.module.css";
import utilities from "../styles/utilities/utilities";
import { useRouter } from "next/router";
import { useAppContext } from "./_app";
import { useEffect } from "react";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const { authenticated, tokenPayload, locations, setCurrentLocation } =
    useAppContext();

  useEffect(() => {
    if (authenticated && tokenPayload?.lastVisitedLocation) {
      router.push(`/${tokenPayload?.lastVisitedLocation.url}`);
    }
  }, [authenticated]);

  return (
    <div className={styles.root}>
      <h1 className={cx(utilities.typograpy.alpha700)}>
        Where do you want to go?
      </h1>

      <ul className={styles.locations}>
        {locations.map((location) => (
          <li>
            <button
              className={cx(utilities.typograpy.alpha)}
              onClick={async () => {
                setCurrentLocation(location);
                router.push(`/${location.url}`);
              }}
            >
              — {location.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
