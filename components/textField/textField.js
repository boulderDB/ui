"use client";

import MUITextField from "@mui/material/TextField";
import styles from "./textField.module.css";
import cn from "classnames";
import { typography } from "../../styles/utilities";

export default function TextField({
  className,
  area = false,
  value,
  type = "text",
  placeholder,
  children,
  ...rest
}) {
  if (area) {
    return (
      <textarea
        {...rest}
        className={cn(typography.gamma, styles.isTextArea, className)}
      >
        {value || placeholder}
      </textarea>
    );
  }

  return (
    <>
      {children}

      <MUITextField
        {...rest}
        type={type}
        value={value}
        variant={"standard"}
        placeholder={placeholder}
        className={cn(styles.root, typography.gamma, className)}
      />
    </>
  );
}
