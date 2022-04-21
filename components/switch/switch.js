import FormControlLabel from "@mui/material/FormControlLabel";
import MUISwitch from "@mui/material/Switch";
import React from "react";

function Switch({ name, ...rest }) {
  return (
    <FormControlLabel
      control={<MUISwitch name={name} {...rest} />}
      label={name}
    />
  );
}

export default Switch;
