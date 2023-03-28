import styles from "./footer.module.css";
import packageJson from "./../../package.json";

export function Footer() {
  return (
    <footer className={styles.root}>
      <a
        href="https://github.com/boulderdb"
        target={"_blank"}
        rel={"noreferrer noopener"}
        className={styles.item}
      >
        Github
      </a>

      <span className={styles.item}>v{packageJson.version}</span>
    </footer>
  );
}
