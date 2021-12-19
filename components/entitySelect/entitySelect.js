import sortItemsAlphabetically from "../../utilties/sortItemsAlphabetically";
import { useEffect, useState } from "react";
import { useHttp } from "../../hooks/useHttp";
import { TextField } from "@material-ui/core";
import Loader from "../loader/loader";
import { Autocomplete } from "@material-ui/lab";
import filterStyles from "../boulderTable/filter.module.css";
import HoldType from "../holdType/holdType";
import Grade from "../grade/grade";
import AscentIcon from "../ascentIcon/ascentIcon";

export const optionRenderers = {
  holdType: (option) => (
    <div className={filterStyles.hasIconOption}>
      <HoldType image={option.image} small={true} /> {option.name}
    </div>
  ),
  grade: (option) => (
    <Grade
      color={option.color}
      name={option.name}
      internalName={option.internalName}
    />
  ),
  internalGrade: (option) => (
    <Grade
      color={option.color}
      name={option.name}
      internalName={option.internalName}
    />
  ),
  ascent: (option) => (
    <div className={filterStyles.hasIconOption}>
      <AscentIcon type={option.name} fill={true} /> {option.name}
    </div>
  ),
  tags: (option) => (
    <div className={filterStyles.hasIconOption}>
      {option.emoji} {option.name}
    </div>
  ),
};

function EntitySelect({
  value,
  label,
  resource,
  multiple,
  labelProperty = "name",
  compareProperty = "id",
  ...rest
}) {
  const http = useHttp();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const { data } = await http.get(resource);

      if (active) {
        setOptions(sortItemsAlphabetically(data, labelProperty));
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => {
        return option[compareProperty] === value[compareProperty];
      }}
      loading={loading}
      multiple={multiple}
      value={value}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <Loader /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      {...rest}
    />
  );
}

export default EntitySelect;
