import { useEffect, useRef, useState } from "react";
import { FormFieldProps } from "../form/form";
import { Listbox } from "@headlessui/react";
import { Icon } from "../icon/icon";
import styles from "./select.module.css";
import { cx } from "classix";
import utilities from "../../styles/utilities/utilities";

export type Option = {
  id: string | number;
  disabled?: boolean;
};

export type SelectProps<TOption extends Option> = {
  options: TOption[];
  getOptionLabel: (option: TOption) => string | React.ReactElement;
  value?: TOption | null;
  className?: string;
  emptyOptionLabel?: string;
  required?: boolean;
} & FormFieldProps<TOption>;

export function createSelectProps<TOption extends Option>(
  props: SelectProps<TOption>
): SelectProps<TOption> {
  return {
    ...props,
  };
}

function findValueOptionReference<TOption extends Option>(
  options: TOption[],
  value: TOption | null
): TOption | null {
  return options.find((option) => option.id === value?.id) || null;
}

export function Select<TOption extends Option>({
  options,
  getOptionLabel,
  value = null,
  hasError,
  onChange,
  emptyOptionLabel = "—",
  required = true,
  className,
}: SelectProps<TOption>) {
  const [selected, setSelected] = useState<TOption | null>(
    findValueOptionReference<TOption>(options, value)
  );
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

  // ensure external resets are reflected
  useEffect(() => {
    if (!value) {
      setSelected(null);
    }
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
        {!required ? (
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
        ) : null}

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
