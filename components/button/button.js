import styles from "./button.module.css";
import cn from "classnames";
import { typography } from "../../styles/utilities";
import capitalize from "../../utilties/capitalize";

function Button({ children, variant, className, as, ...rest }) {
  return (
    <button
      {...rest}
      className={cn(
        styles.root,
        styles[`is${capitalize(variant)}`],
        typography.delta,
        className
      )}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  variant: "default",
};

export default Button;
