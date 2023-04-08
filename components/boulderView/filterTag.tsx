import { PropsWithChildren } from "react";
import styles from "./filterTag.module.css";
import { cx } from "classix";

type FilterTagProps = { className?: string };

export function FilterTag({
  className,
  children,
}: PropsWithChildren<FilterTagProps>) {
  return <div className={cx(styles.root, className)}>{children}</div>;
}
