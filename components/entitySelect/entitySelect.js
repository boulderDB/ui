import sortItemsAlphabetically from "../../utilties/sortItemsAlphabetically";
import Select from "../select/select";

function EntitySelect({
  value,
  options,
  resource,
  multiple,
  labelProperty,
  ...rest
}) {
  return (
    <Select
      {...rest}
      multiple={multiple}
      value={value}
      options={sortItemsAlphabetically(options, labelProperty)}
    />
  );
}

export default EntitySelect;
