import FormControlLabel from "@mui/material/FormControlLabel";
import MUISwitch from "@mui/material/Switch";
import React from "react";
import EntitySelect from "../entitySelect/entitySelect";

function Switch({ name, ...rest }) {
  return (
    <FormControlLabel
      control={<MUISwitch name={name} {...rest} />}
      label={name}
    />
  );
}

Switch.typename = "Switch";

export default Switch;
