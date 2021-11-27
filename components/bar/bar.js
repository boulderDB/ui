import cn from "classnames";
import styles from "./bar.module.css";
import { typography } from "../../styles/utilities";

export default function Bar({ visible, children }) {
  return (
    <div
      className={cn(
        styles.root,
        visible ? styles.isVisible : null,
        typography.gamma
      )}
    >
      {children}
    </div>
  );
}
