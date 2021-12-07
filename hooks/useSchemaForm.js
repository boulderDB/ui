import { useCachedHttp, useHttp } from "./useHttp";
import { useContext, useEffect, useState } from "react";
import EntitySelect from "../components/entitySelect/entitySelect";
import { AppContext } from "../pages/_app";
import TextField from "../components/textField/textField";
import Switch from "../components/switch/switch";
import DatePicker from "../components/datePicker/datePicker";
import Select from "../components/select/select";

const components = {
  TextType: TextField,
  CheckboxType: Switch,
  EntityType: EntitySelect,
  DateTimeType: DatePicker,
  ChoiceType: Select,
  IntegerType: TextField,
};

export default function useSchemaForm(name) {
  const { currentLocation } = useContext(AppContext);
  const schema = useCachedHttp(`/schemas/${name}`);
  const http = useHttp();

  const [fields, setFields] = useState([]);
  const [defaults, setDefaults] = useState({});

  useEffect(async () => {
    if (!schema) {
      return {};
    }

    setFields(
      await Promise.all(
        schema.map(async (field) => {
          let config = {
            name: field.name,
            label: field.name,
            Component: components[field.type],
            componentProps: {},
          };

          if (config.Component === EntitySelect) {
            const { data } = await http.get(
              `/${currentLocation?.url}${field.schema.resource}`
            );

            const labelProperty = field.schema.labelProperty
              ? field.schema.labelProperty
              : name;

            config.componentProps = {
              renderOption: (option) =>
                labelProperty ? option[labelProperty] : option.name,
              getOptionLabel: (option) =>
                labelProperty ? option[labelProperty] : option.name,
              options: data,
              multiple: field.options.multiple,
            };
          }

          if (config.Component === Select) {
            config.componentProps = {
              options: Object.keys(field?.choices)?.map((choice) => {
                return {
                  name: choice,
                };
              }),
              renderOption: (option) => option.name,
              getOptionLabel: (option) => option.name,
            };
          }

          return config;
        })
      )
    );

    let defaultValues = {};

    schema.forEach((field) => {
      defaultValues[field.name] = field.schema?.default;
    });

    setDefaults(defaultValues);
  }, [schema, currentLocation]);

  return {
    fields,
    defaults,
  };
}
