import sortItemsAlphabetically from "../../utilties/sortItemsAlphabetically";
import { useCallback, useEffect, useMemo, useState } from "react";
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
  getComparisonProperty = (option) => option.id,
  fetchOnce = true,
  required,
  ...rest
}) {
  const http = useHttp();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [fetched, setFetched] = useState(false);

  const loading = open && fetching;

  let isRequired = required;

  if (multiple && required) {
    isRequired = value?.length === 0;
  } else {
    isRequired = false;
  }

  useEffect(() => {
    if (!open) {
      return;
    }

    if (fetchOnce && fetched) {
      return;
    }

    (async () => {
      setFetching(true);
      const { data } = await http.get(resource);
      setFetched(true);
      setOptions;
      setOptions(sortItemsAlphabetically(data, labelProperty));
      setFetching(false);
    })();
  }, [open]);

  useEffect(() => {
    if (fetchOnce && fetched) {
      return;
    }

    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const renderInput = useCallback(
    (params) => {
      return (
        <TextField
          {...params}
          required={isRequired}
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
      );
    },
    [resource, isRequired]
  );

  if (!resource) {
    return (
      <Autocomplete
        multiple={multiple}
        value={value}
        options={options}
        renderInput={renderInput}
        {...rest}
      />
    );
  }

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
        return getComparisonProperty(option) === getComparisonProperty(value);
      }}
      loading={loading}
      multiple={multiple}
      value={value}
      options={options}
      renderInput={renderInput}
      {...rest}
    />
  );
}

export default EntitySelect;
