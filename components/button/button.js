import styles from "./button.module.css";
import cn from "classnames";
import { typography } from "../../styles/utilities";
import capitalize from "../../utilties/capitalize";

const typographySizeMapping = {
  l: typography.delta,
  s: typography.epsilon,
};

function Button({ children, variant, className, size, as, loading, ...rest }) {
  return (
    <button
      {...rest}
      className={cn(
        styles.root,
        styles[`is${capitalize(variant)}`],
        styles[`isSize${capitalize(size)}`],
        loading ? styles[`isLoading`] : null,
        typographySizeMapping[size],
        className
      )}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  variant: "default",
  size: "l",
};

export default Button;
