import { Switch as HeadlessUISwitch } from "@headlessui/react";
import { useEffect, useState } from "react";
import styles from "./switch.module.css";
import { ChangeHandler } from "../form/_form";

export type SwitchProps = {
  label: string;
  onChange?: ChangeHandler;
  initial?: boolean;
};

export function Switch({
  label,
  initial = false,
  onChange,
}: SwitchProps) {
  const [checked, setChecked] = useState<boolean>(initial);

  useEffect(() => {
    onChange(checked);
  }, [checked]);

  return (
    <HeadlessUISwitch
      checked={checked}
      onChange={setChecked}
      className={styles.root}
    >
      <span className={styles.label}>{label}</span>

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
