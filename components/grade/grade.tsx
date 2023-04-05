import React from "react";
import styles from "./grade.module.css";
import cx from "classix";

type GradeProps = {
  color: string;
  name: string;
  internalColor?: string;
  internalName?: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function Grade({
  color,
  name,
  internalColor,
  internalName,
  className,
  ...rest
}: GradeProps) {
  return (
    <div
      className={cx(styles.root, className)}
      style={{ color: color }}
      {...rest}
    >
      Grade {name}
      {internalColor && internalName && internalName !== name && (
        <span
          style={{
            color: internalColor,
            paddingLeft: "4px",
          }}
        >
          ({internalName})
        </span>
      )}
    </div>
  );
}
