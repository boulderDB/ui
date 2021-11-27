import cn from "classnames";
import { typography } from "../../styles/utilities";
import { Backward, Close } from "../icon/icon";
import styles from "./header.module.css";

export default function Header({ title, children, onClose, onBack, backlink }) {
  return (
    <div className={cn(styles.root, typography.epsilon)}>
      {backlink && <Backward className={styles.back} onClick={onBack} />}
      <div>{children}</div>
      <h2 className={styles.title}>{title}</h2>
      <Close className={styles.close} onClick={onClose} />
    </div>
  );
}
