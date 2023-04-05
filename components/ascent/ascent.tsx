import { cx } from "classix";
import { Icon } from "../icon/_icon";
import styles from "./ascent.module.css";
import { capitalize } from "../../lib/capitalize";
import utilities from "../../styles/utilities/utilities";
import { Ascent } from "../../lib/types";

export type AscentProps = {
  type: Ascent["type"];
  className?: string;
  checked: boolean;
  label?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">;

export function Ascent({
  type,
  checked,
  disabled,
  className,
  label,
  ...rest
}: AscentProps) {
  return (
    <button
      disabled={disabled}
      className={cx(
        styles.root,
        styles[`is${capitalize(type)}`],
        checked ? styles.isChecked : null,
        disabled ? styles.isDisabled : null,
        className
      )}
      {...rest}
    >
      <div className={styles.icon}>
        <Icon name={type} />
      </div>

      {label ? (
        <span className={cx(utilities.typograpy.delta, styles.label)}>
          {label}
        </span>
      ) : null}
    </button>
  );
}
