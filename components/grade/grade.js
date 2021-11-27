import React from "react";
import styles from "./grade.module.css";
import cn from "classnames";
import { typography } from "../../styles/utilities";

function Grade({
  color,
  name,
  internalColor = null,
  internalName = null,
  className,
}) {
  return (
    <div
      className={cn(styles.root, typography.delta700, className)}
      style={{ color: color }}
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

export default Grade;
