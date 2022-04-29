import sortItemsAlphabetically from "../../utilties/sortItemsAlphabetically";
import { useCallback, useEffect, useState } from "react";
import { useHttp } from "../../hooks/useHttp";
import MUIAutocomplete from "@mui/material/Autocomplete";
import Loader from "../loader/loader";
import filterStyles from "../boulderTable/filter.module.css";
import HoldType from "../holdType/holdType";
import Grade from "../grade/grade";
import AscentIcon from "../ascentIcon/ascentIcon";
import TextField from "../textField/textField";
import { Box } from "@mui/material";

export const optionRenderers = {
  default: (props, label) => (
    <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
      {label}
    </Box>
  ),
  holdType: (props, option) => (
    <div className={filterStyles.hasIconOption}>
      <HoldType image={option.image} small={true} /> {option.name}
    </div>
  ),
  grade: (props, option) => (
    <Grade
      color={option.color}
      name={option.name}
      internalName={option.internalName}
    />
  ),
  internalGrade: (props, option) => (
    <Grade
      color={option.color}
      name={option.name}
      internalName={option.internalName}
    />
  ),
  ascent: (props, option) => (
    <div className={filterStyles.hasIconOption}>
      <AscentIcon type={option.name} fill={true} /> {option.name}
    </div>
  ),
  tags: (props, option) => (
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
  renderOption,
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
                {loading && !fetched && !fetchOnce ? <Loader /> : null}
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
      <MUIAutocomplete
        multiple={multiple}
        value={value}
        options={options}
        renderInput={renderInput}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            {renderOption(option)}
          </Box>
        )}
        {...rest}
      />
    );
  }

  return (
    <MUIAutocomplete
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
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {renderOption(props, option)}
        </Box>
      )}
      {...rest}
    />
  );
}

EntitySelect.typename = "EntitySelect";

export default EntitySelect;
