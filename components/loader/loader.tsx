import { cx } from "classix";
import styles from "./loader.module.css";

type LoaderProps = {
  className?: string;
};

export function Loader({ className }: LoaderProps) {
  return (
    <div className={cx(styles.root, className)}>
      <div className={styles.skFoldingCube}>
        <div className={cx(styles.skCube)} />
        <div className={cx(styles.skCube, styles.skCube2)} />
        <div className={cx(styles.skCube, styles.skCube3)} />
        <div className={cx(styles.skCube, styles.skCube4)} />
      </div>
    </div>
  );
}
