import MUIAutocomplete from "@mui/material/Autocomplete";
import MUITextField from "@mui/material/TextField";
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
    <MUIAutocomplete
      options={options}
      autoHighlight
      value={value}
      openOnFocus
      multiple={multiple}
      {...rest}
      renderInput={(params) => (
        <MUITextField
          variant={"standard"}
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
