import cn from "classnames";
import styles from "./bar.module.css";
import { typography } from "../../styles/utilities";
import capitalize from "../../utilties/capitalize";

export default function Bar({ variant = "default", visible, children }) {
  return (
    <div
      className={cn(
        styles.root,
        visible ? styles.isVisible : null,
        typography.gamma,
        styles[`is${capitalize(variant)}`]
      )}
    >
      {children}
    </div>
  );
}
