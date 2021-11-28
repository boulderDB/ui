import cn from "classnames";
import styles from "./navItem.module.css";
import { typography } from "../../styles/utilities";
import Link from "next/link";
import React from "react";

export default function NavItem({
  href,
  children,
  className,
  onClick,
  ...rest
}) {
  if (onClick) {
    return (
      <span
        className={cn(styles.root, typography.delta, className)}
        onClick={onClick}
        {...rest}
      >
        {children}
      </span>
    );
  }

  return (
    <Link href={href}>
      <a className={cn(styles.root, typography.delta, className)} {...rest}>
        {children}
      </a>
    </Link>
  );
}
