import cn from "classnames";
import styles from "./banner.module.css";
import capitalize from "../../utilties/capitalize";

export default function Banner({ variant = "default", className, children }) {
  return (
    <div
      className={cn(styles.root, styles[`is${capitalize(variant)}`], className)}
    >
      {children}
    </div>
  );
}
