import cx from "classix";
import { PropsWithChildren } from "react";
import styles from "./notice.module.css";
import { capitalize } from "../../lib/capitalize";

type NoticeProps = {
  type: "success" | "error";
  display?: "inline" | "full";
  className?: string;
};

export function Notice({
  type,
  display,
  children,
  className,
}: PropsWithChildren<NoticeProps>) {
  return (
    <div
      className={cx(
        styles.root,
        styles[`is${capitalize(type)}`],
        display ? styles[`is${capitalize(display)}`] : null,
        className
      )}
    >
      {children}
    </div>
  );
}
