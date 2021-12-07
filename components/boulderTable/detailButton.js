import { Forward } from "../icon/icon";
import cn from "classnames";
import styles from "./detailButton.module.css";
import { typography } from "../../styles/utilities";

export default function DetailButton({ active, children, ...rest }) {
  return (
    <button
      {...rest}
      className={cn(styles.root, active ? styles.isActive : null)}
    >
      <span className={cn(styles.label, typography.epsilon)}>{children}</span>
      <Forward className={styles.icon} />
    </button>
  );
}
