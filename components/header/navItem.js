import cn from "classnames";
import styles from "./navItem.module.css";
import { typography } from "../../styles/utilities";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

export default function NavItem({
  href,
  children,
  className,
  onClick,
  ...rest
}) {
  const { asPath } = useRouter();

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
      <a
        className={cn(
          styles.root,
          typography.delta,
          asPath === href ? typography.delta700 : null,
          className
        )}
        {...rest}
      >
        {children}
      </a>
    </Link>
  );
}
