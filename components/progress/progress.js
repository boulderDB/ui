import { customProperties } from "../../styles/cssExports.js";
import styles from "./progress.module.css";

export function Progress({ percentage }) {
  let backgroundColor = customProperties["--color-red"];

  if (percentage > 33) {
    backgroundColor = customProperties["--color-yellow"];
  }

  if (percentage > 66) {
    backgroundColor = customProperties["--color-flash"];
  }

  return (
    <div className={styles.root}>
      <div style={{ width: `${percentage}%`, backgroundColor }} />
    </div>
  );
}
