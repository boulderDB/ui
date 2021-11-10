import styles from "./button.module.css";
import cn from "classnames";
import { textStyles } from "../../styles/utilities";
import capitalize from "../../utilties/capitalize";

function Button({ children, variant, ...rest }) {
  return (
    <button
      {...rest}
      className={cn(
        styles.root,
        styles[`is${capitalize(variant)}`],
        textStyles.epsilon
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
