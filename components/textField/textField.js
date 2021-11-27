import MUITextField from "@material-ui/core/TextField";
import styles from "./textField.module.css";
import cn from "classnames";
import { typography } from "../../styles/utilities";

function TextField({ className, area = false, value, placeholder, ...rest }) {
  if (area) {
    return (
      <textarea
        {...rest}
        className={cn(typography.gamma, styles.isTextArea, className)}
      >
        {value || placeholder}
      </textarea>
    );
  }

  return (
    <MUITextField
      {...rest}
      value={value}
      placeholder={placeholder}
      className={cn(styles.root, typography.gamma, className)}
    />
  );
}

export default TextField;
