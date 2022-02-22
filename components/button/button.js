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
  inverted,
  size,
  as,
  loading = false,
  onClick,
  href,
  externalHref = false,
  ...rest
}) {
  let props = {
    children,
    variant,
    size,
    as,
    className: cn(
      styles.root,
      styles[`is${capitalize(variant)}`],
      styles[`isSize${capitalize(size)}`],
      inverted ? styles.isInverted : null,
      loading ? styles[`isLoading`] : null,
      typographySizeMapping[size],
      className
    ),
    ...rest,
  };

  if (href && externalHref) {
    return (
      <a href={href}>
        <a {...props} />
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href}>
        <a {...props} />
      </Link>
    );
  }

  return <button onClick={onClick} {...props} />;
}

Button.defaultProps = {
  variant: "default",
  size: "l",
};

export default Button;
