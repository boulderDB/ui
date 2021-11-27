import cn from "classnames";
import styles from "./filterTag.module.css";
import { typography } from "../../styles/utilities";
import { Close } from "../icon/icon";

export default function FilterTag({ id, value, onClick }) {
  return (
    <div className={cn(typography.eta, styles.root)}>
      <strong>{id}:</strong>&nbsp;{value}
      <span className={styles.remove}>
        {" "}
        {onClick ? <Close onClick={onClick} /> : null}
      </span>
    </div>
  );
}
