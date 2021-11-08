import styles from "./button.module.css";
import cn from "classnames";
import { textStyles } from "../../styles/utilities";

function Button({ children, ...rest }) {
  return (
    <button {...rest} className={cn(styles.root, textStyles.epsilon)}>
      {children}
    </button>
  );
}

export default Button;
