import { HTMLProps, useEffect, useRef } from "react";
import styles from "./indeterminateCheckbox.module.css"
import cx from "classix";

export function IndeterminateCheckbox({
    indeterminate,
    className = "",
    ...rest
  }: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
    const ref = useRef<HTMLInputElement>(null!);
  
    useEffect(() => {
      if (typeof indeterminate === "boolean") {
        ref.current.indeterminate = !rest.checked && indeterminate;
      }
    }, [ref, indeterminate]);
  
    return (
      <input
        type="checkbox"
        ref={ref}
        className={cx(styles.root, className)}
        {...rest}
      />
    );
  }