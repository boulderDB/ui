import sortItemsAlphabetically from "../../utilties/sortItemsAlphabetically";
import Select from "../select/select";

function EntitySelect({ value, options, resource, multiple, ...rest }) {
  return (
    <Select
      {...rest}
      multiple={multiple}
      value={value}
      options={sortItemsAlphabetically(options, "name")}
      renderOption={(option) => option.name}
      getOptionLabel={(option) => option.name}
    />
  );
}

export default EntitySelect;
