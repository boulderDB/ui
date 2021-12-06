import styles from "./button.module.css";
import cn from "classnames";
import { typography } from "../../styles/utilities";
import capitalize from "../../utilties/capitalize";
import Link from "next/link";

const typographySizeMapping = {
  l: typography.delta,
  s: typography.epsilon,
};

function Button({
  children,
  variant,
  className,
  size,
  as,
  loading,
  onClick,
  href,
  ...rest
}) {
  let props = {
    children,
    variant,
    size,
    as,
    loading,
    className: cn(
      styles.root,
      styles[`is${capitalize(variant)}`],
      styles[`isSize${capitalize(size)}`],
      loading ? styles[`isLoading`] : null,
      typographySizeMapping[size],
      className
    ),
    ...rest,
  };

  if (href) {
    return (
      <Link href={href}>
        <a {...props} />
      </Link>
    );
  }

  return <button {...props} onClick={onClick} />;
}

Button.defaultProps = {
  variant: "default",
  size: "l",
};

export default Button;
