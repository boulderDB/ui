import cx from "classix";
import styles from "../styles/pages/frontPage.module.css";
import utilities from "../styles/utilities/utilities";
import { useRouter } from "next/router";
import { useAppContext } from "./_app";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const { authenticated, tokenPayload, setCurrentLocation } = useAppContext();

  useEffect(() => {
    if (authenticated) {
      router.push(`/${tokenPayload?.lastVisitedLocation.url}`);
    }
  }, [authenticated]);

  return (
    <div className={styles.root}>
      <h1 className={cx(utilities.typograpy.alpha700)}>
        Where do you want to go?
      </h1>
    </div>
  );
}
