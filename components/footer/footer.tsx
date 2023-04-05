import styles from "./footer.module.css";
import packageJson from "./../../package.json";
import utilities from "../../styles/utilities/utilities";
import { cx } from "classix";

export function Footer() {
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

      <span className={cx(styles.item, utilities.typograpy.delta)}>
        v{packageJson.version}
      </span>
    </footer>
  );
}
