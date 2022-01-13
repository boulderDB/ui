import cn from "classnames";
import styles from "./label.module.css";
import capitalize from "../../utilties/capitalize";
import { typography } from "../../styles/utilities";

export default function Label({ text, variant }) {
  return (
    <span
      className={cn(
        styles.root,
        styles[`is${capitalize(variant)}`],
        typography.delta
      )}
    >
      {text}
    </span>
  );
}

Label.defaultProps = {
  variant: "default",
};
