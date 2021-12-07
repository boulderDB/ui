import { Autocomplete } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
import React from "react";

function Select({
  label,
  multiple = false,
  value,
  options,
  required,
  ...rest
}) {
  let isRequired = required;

  if (multiple && required) {
    isRequired = value.length === 0;
  }

  if (!value && multiple) {
    value = [];
  }

  if (!value) {
    value = null;
  }

  if (typeof value === "number") {
    value = options.find((item) => item.id === value);
  }

  if (value instanceof Array) {
    multiple = true;
    value = value
      .map((valueItem) => {
        return options.find((dataItem) => {
          return dataItem.id === valueItem.id;
        });
      })
      .filter((item) => item !== undefined);
  }

  return (
    <Autocomplete
      options={options}
      autoHighlight
      value={value}
      multiple={multiple}
      {...rest}
      renderInput={(params) => (
        <TextField
          required={isRequired}
          {...params}
          label={label}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password",
          }}
        />
      )}
    />
  );
}

export default Select;
