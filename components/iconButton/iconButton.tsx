import { cx } from "classix";
import styles from "./iconButton.module.css";
import { Icon, IconName } from "../icon/_icon";

type IconButtonProps = {
  icon: IconName;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ icon, className, ...rest }: IconButtonProps) {
  return (
    <button {...rest} className={cx(styles.root, className)}>
      <Icon name={icon} />
    </button>
  );
}
