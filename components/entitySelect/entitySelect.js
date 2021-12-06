import sortItemsAlphabetically from "../../utilties/sortItemsAlphabetically";
import Select from "../select/select";

function EntitySelect({ value, options, resource, multiple, ...rest }) {
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
