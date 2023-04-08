import { ReactNode, useEffect, useRef, useState } from "react";
import { FormFieldProps } from "../form/_form";
import { Listbox } from "@headlessui/react";
import { Icon } from "../icon/_icon";
import styles from "./select.module.css";
import { cx } from "classix";
import utilities from "../../styles/utilities/utilities";

export type Option = {
  id: string | number;
  disabled?: boolean;
};

export type SelectProps<TOption extends Option> = {
  options: TOption[];
  getOptionLabel: (option: TOption) => string | ReactNode;
  value?: TOption | null;
  className?: string;
  emptyOptionLabel?: string;
} & FormFieldProps<TOption>;

export function Select<TOption extends Option>({
  options,
  getOptionLabel,
  value = null,
  hasError,
  onChange,
  emptyOptionLabel = "—",
  className,
}: SelectProps<TOption>) {
  const [selected, setSelected] = useState<TOption | null>(value);
  const isInitial = useRef<boolean>(true);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }

    if (typeof onChange === "function") {
      onChange(selected);
    }
  }, [selected]);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <Listbox.Button
        className={cx(
          styles.root,
          hasError ? styles.hasError : null,
          className
        )}
      >
        <span className={cx(styles.value, utilities.typograpy.gamma700)}>
          {selected ? getOptionLabel(selected) : emptyOptionLabel}
        </span>

        {hasError ? <Icon name="error" /> : <Icon name="down" />}
      </Listbox.Button>

      <Listbox.Options className={styles.options}>
        <Listbox.Option
          value={null}
          className={({ active, selected }) =>
            cx(
              styles.option,
              utilities.typograpy.gamma700,
              active ? styles.isActiveOption : null,
              selected ? styles.isSelectedOption : null
            )
          }
        >
          <Icon name="top" className={styles.checkIcon} />
          <span className={styles.optionLabel}>{emptyOptionLabel}</span>
        </Listbox.Option>

        {options.map((option) => (
          <Listbox.Option
            className={({ active, selected }) =>
              cx(
                styles.option,
                utilities.typograpy.gamma700,
                active ? styles.isActiveOption : null,
                selected ? styles.isSelectedOption : null
              )
            }
            key={option.id}
            value={option}
            disabled={option.disabled}
          >
            <Icon name="top" className={styles.checkIcon} />
            <span className={styles.optionLabel}>{getOptionLabel(option)}</span>
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
