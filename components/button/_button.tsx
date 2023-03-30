import { cx } from "classix";
import styles from "./_button.module.css";
import { capitalize } from "../../lib/capitalize";
import utilities from "../../styles/utilities/utilities";

type ButtonProps = {
  loading?: boolean;
  variant?: "danger";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant,
  className,
  loading = false,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={cx(
        styles.root,
        utilities.typograpy.gamma700,
        variant ? styles[`is${capitalize(variant)}`] : null,
        loading ? styles.isLoading : null,
        className
      )}
    >
      {children}
    </button>
  );
}
