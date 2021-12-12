import cn from "classnames";
import { typography } from "../../styles/utilities";
import { Backward, Close } from "../icon/icon";
import styles from "./header.module.css";
import useDrawer from "../../hooks/useDrawer";

export default function Header({ title, children, onBack }) {
  const { setOpen } = useDrawer();

  return (
    <div className={cn(styles.root, typography.epsilon)}>
      {onBack && <Backward className={styles.back} onClick={onBack} />}
      <div>{children}</div>
      <h2 className={styles.title}>{title}</h2>
      <Close className={styles.close} onClick={() => setOpen(false)} />
    </div>
  );
}
