import MUITextField from "@material-ui/core/TextField";
import styles from "./textField.module.css";
import cn from "classnames";
import { typography } from "../../styles/utilities";

function TextField({ ...rest }) {
  return (
    <MUITextField {...rest} className={cn(styles.root, typography.gamma)} />
  );
}

export default TextField;
