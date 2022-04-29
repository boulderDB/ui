import MUIAutocomplete from "@mui/material/Autocomplete";
import MUITextField from "@mui/material/TextField";
import React from "react";
import { Box } from "@mui/material";

function Select({
  label,
  multiple = false,
  value,
  options,
  required,
  renderOption,
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
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {renderOption(props, option)}
        </Box>
      )}
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

Select.typename = "Select";

export default Select;
