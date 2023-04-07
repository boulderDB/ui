import { cx } from "classix";
import { capitalize } from "../../lib/capitalize";
import styles from "./button.module.css";
import utilities from "../../styles/utilities/utilities";

type ButtonProps = {
  size?: "medium" | "small";
  variant?: "danger";
  display?: "inline" | "full";
  outlined?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant,
  className,
  children,
  size = "medium",
  display = "full",
  outlined = false,
  ...rest
}: ButtonProps) {
  const typography =
    size === "medium"
      ? utilities.typograpy.gamma700
      : utilities.typograpy.delta700;

  return (
    <button
      {...rest}
      className={cx(
        styles.root,
        styles[`is${capitalize(size)}`],
        variant ? styles[`is${capitalize(variant)}`] : null,
        display ? styles[`is${capitalize(display)}`] : null,
        outlined ? styles.isOutlined : null,
        typography,
        className
      )}
    >
      {children}
    </button>
  );
}
