import {
  Switch as HeadlessUISwitch,
  SwitchProps as HeadlessUISwitchProps,
} from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import styles from "./switch.module.css";
import { FormFieldProps } from "../form/_form";
import cx from "classix";

export type SwitchProps = FormFieldProps &
  Omit<HeadlessUISwitchProps<"div">, "value"> & {
    label: string;
    value?: boolean;
  };

export function Switch({
  name,
  label,
  value = false,
  onChange,
  ...rest
}: SwitchProps) {
  const [checked, setChecked] = useState<boolean>(value);
  const isInitial = useRef<boolean>(true);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }

    if (typeof onChange === "function") {
      onChange(checked);
    }
  }, [checked]);

  return (
    <HeadlessUISwitch
      {...rest}
      name={name}
      checked={checked}
      onChange={setChecked}
      className={cx(styles.root, checked ? styles.isChecked : null)}
    >
      <span className={styles.hiddenLabel}>{label}</span>

      <span
        aria-hidden="true"
        className={styles.indicator}
        style={{
          transform: checked ? "translateX(32px)" : "translateX(0)",
        }}
      />
    </HeadlessUISwitch>
  );
}
