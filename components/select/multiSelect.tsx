import { useEffect, useRef, useState } from "react";
import { Listbox } from "@headlessui/react";
import { Icon } from "../icon/icon";
import styles from "./select.module.css";
import { cx } from "classix";
import utilities from "../../styles/utilities/utilities";
import { Option, SelectProps } from "./select";

export type MultiSelectProps<TOption extends Option> = {
  value: TOption[];
  onChange: (value: TOption[]) => void;
} & Omit<SelectProps<TOption>, "value" | "onChange">;

function filterValueOptionReferences<TOption extends Option>(
  options: TOption[],
  value: TOption[]
): TOption[] {
  return options.filter((option) =>
    value.map((value) => value.id).includes(option.id)
  );
}

export function MultiSelect<TOption extends Option>({
  options,
  getOptionLabel,
  value = [],
  hasError,
  onChange,
  className,
}: MultiSelectProps<TOption>) {
  const [selected, setSelected] = useState<TOption[]>(
    filterValueOptionReferences(options, value)
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
    if (value.length === 0) {
      setSelected([]);
    }
  }, [value]);

  return (
    <Listbox value={selected} onChange={setSelected} multiple>
      <Listbox.Button
        className={cx(
          styles.root,
          hasError ? styles.hasError : null,
          className
        )}
      >
        <span className={cx(styles.value, utilities.typograpy.gamma700)}>
          {selected.length > 0
            ? selected.map((entry) => (
                <div className={styles.tag} key={entry.id}>
                  {getOptionLabel(entry)}
                </div>
              ))
            : "—"}
        </span>

        {hasError ? <Icon name="error" /> : <Icon name="down" />}
      </Listbox.Button>

      <Listbox.Options className={styles.options}>
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
            <Icon name="top" className={styles.checkIcon} />{" "}
            <span className={styles.optionLabel}>{getOptionLabel(option)}</span>
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
