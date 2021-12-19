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
    isRequired = value?.length === 0;
  }

  if (!value && multiple) {
    value = [];
  }

  if (!value) {
    value = null;
  }

  return (
    <Autocomplete
      options={options}
      autoHighlight
      value={value}
      openOnFocus
      multiple={multiple}
      {...rest}
      renderInput={(params) => (
        <TextField
          required={isRequired}
          {...params}
          label={label}
          inputProps={params.inputProps}
        />
      )}
    />
  );
}

export default Select;
