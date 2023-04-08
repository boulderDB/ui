import { cx } from "classix";
import styles from "./iconButton.module.css";
import { Icon, IconName } from "../icon/icon";

type IconButtonProps = {
  icon: IconName;
  outline?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function IconButton({
  icon,
  outline = true,
  className,
  ...rest
}: IconButtonProps) {
  return (
    <button
      {...rest}
      className={cx(styles.root, outline ? styles.withOutline : null, className)}
    >
      <Icon name={icon} />
    </button>
  );
}
