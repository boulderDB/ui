import { useRequest } from "../../hooks/useRequest";
import Select from "../Select/Select";
import React from "react";
import sortItemsAlphabetically from "../../utilties/sortItemsAlphabetically";

function EntitySelect({ value, resource, ...rest }) {
  const { data } = useRequest(resource, true);

  if (!data) {
    return "…";
  }

  if (typeof value === "number") {
    value = data.find((item) => item.id === value);
  }

  if (value instanceof Array) {
    value = value
      .map((valueItem) => {
        return data.find((dataItem) => {
          return dataItem.id === valueItem.id;
        });
      })
      .filter((item) => item !== undefined);
  }

  return (
    <Select
      {...rest}
      value={value}
      options={sortItemsAlphabetically(data, "name")}
      renderOption={(option) => option.name}
      getOptionLabel={(option) => option.name}
    />
  );
}

export default EntitySelect;
