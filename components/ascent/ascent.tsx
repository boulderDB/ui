import { cx } from "classix";
import { Icon } from "../icon/icon";
import styles from "./ascent.module.css";
import { capitalize } from "../../lib/capitalize";
import utilities from "../../styles/utilities/utilities";
import { Ascent, InvalidAscentType, ValidAscentType } from "../../lib/types";
import { isDoubt } from "../../lib/isDoubt";

export const ascentColors: {
  [key in ValidAscentType | InvalidAscentType]: string;
} = {
  todo: "#fff617",
  flash: "#1687ff",
  top: "#02deaf",
  resignation: "#ff5d5f",
};

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
        {!isDoubt(type) ? <Icon name={type} /> : null}
      </div>

      {label ? (
        <span className={cx(utilities.typograpy.delta, styles.label)}>
          {label}
        </span>
      ) : null}
    </button>
  );
}
