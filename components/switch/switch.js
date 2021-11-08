import { FormControlLabel } from "@material-ui/core";
import MuiSwitch from "@material-ui/core/Switch";
import React from "react";

function Switch({ name, ...rest }) {
  return (
    <FormControlLabel
      control={<MuiSwitch name={name} {...rest} />}
      label={name}
    />
  );
}

export default Switch;
