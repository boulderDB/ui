import cx from "classix";
import { customProperties } from "../../styles/cssExports.js";
import styles from "./progress.module.css";

type ProgressProps = {
  percentage: number;
  className?: string;
};
export function Progress({ percentage, className }: ProgressProps) {
  let backgroundColor = customProperties["--color-red"];

  if (percentage > 33) {
    backgroundColor = customProperties["--color-yellow"];
  }

  if (percentage > 66) {
    backgroundColor = customProperties["--color-flash"];
  }

  return (
    <div className={cx(styles.root, className)}>
      <div style={{ width: `${percentage}%`, backgroundColor }} />
    </div>
  );
}
