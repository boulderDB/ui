import React from "react";
import packageJson from "./../../package.json";
import styles from "./footer.module.css";

export const Footer = () => {
  return (
    <div className={styles.root}>
      <a
        href="https://github.com/boulderdb"
        target={"_blank"}
        rel={"noreferrer noopener"}
        className={styles.item}
      >
        Github
      </a>

      <span className={styles.item}>v{packageJson.version}</span>
    </div>
  );
};
