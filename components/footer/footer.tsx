import styles from "./footer.module.css";
import packageJson from "./../../package.json";
import utilities from "../../styles/utilities/utilities";
import { cx } from "classix";
import Link from "next/link";
import { useAppContext } from "../../pages/_app";

export function Footer() {
  const { currentLocation } = useAppContext();

  return (
    <footer className={styles.root}>
      <a
        href="https://github.com/boulderdb"
        target={"_blank"}
        rel={"noreferrer noopener"}
        className={cx(styles.item, utilities.typograpy.delta)}
      >
        Github
      </a>

      <div>
        <span className={cx(styles.item, utilities.typograpy.delta)}>
          v{packageJson.version}
        </span>

        <Link
          className={cx(styles.item, utilities.typograpy.delta)}
          href={
            currentLocation
              ? `${process.env.NEXT_PUBLIC_LEGACY_HOST}/${currentLocation.url}`
              : process.env.NEXT_PUBLIC_LEGACY_HOST
          }
        >
          Old version
        </Link>
      </div>
    </footer>
  );
}
