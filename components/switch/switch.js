import { FormControlLabel } from "@material-ui/core";
import MUISwitch from "@material-ui/core/Switch";
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
