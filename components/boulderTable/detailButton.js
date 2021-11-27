import { Forward } from "../icon/icon";
import cn from "classnames";
import styles from "./detailButton.module.css";

export default function DetailButton({ active, children, ...rest }) {
  return (
    <button
      {...rest}
      className={cn(styles.root, active ? styles.isActive : null)}
    >
      <span className={styles.label}>{children}</span>
      <Forward className={styles.icon} />
    </button>
  );
}
