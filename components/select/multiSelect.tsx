import { ReactNode, useEffect, useRef, useState } from "react";
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

export type MultiSelectProps<TOption extends Option> = {
  options: TOption[];
  getOptionLabel: (option: TOption) => string | ReactNode;
  value?: TOption[];
  className?: string;
} & FormFieldProps<TOption>;

export function MultiSelect<TOption extends Option>({
  options,
  getOptionLabel,
  value = [],
  hasError,
  onChange,
  className,
}: MultiSelectProps<TOption>) {
  const [selected, setSelected] = useState<TOption[]>(
    options.filter((option) =>
      value.map((value) => value.id).includes(option.id)
    )
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
          {selected
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
