import styles from "./loader.module.css";
import cn from "classnames";

export default function Loader(className) {
  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.skFoldingCube}>
        <div className={cn(styles.skCube)} />
        <div className={cn(styles.skCube, styles.skCube2)} />
        <div className={cn(styles.skCube, styles.skCube3)} />
        <div className={cn(styles.skCube, styles.skCube4)} />
      </div>
    </div>
  );
}
