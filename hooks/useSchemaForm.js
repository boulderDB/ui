import { useCachedHttp, useHttp } from "./useHttp";
import { useContext, useEffect, useState } from "react";
import EntitySelect from "../components/entitySelect/entitySelect";
import { AppContext } from "../pages/_app";
import TextField from "../components/textField/textField";
import Switch from "../components/switch/switch";
import DatePicker from "../components/datePicker/datePicker";

const components = {
  TextType: TextField,
  CheckboxType: Switch,
  EntityType: EntitySelect,
  DateTimeType: DatePicker,
};

export default function useSchemaForm(name) {
  const { currentLocation } = useContext(AppContext);
  const schema = useCachedHttp(`/schemas/${name}`);
  const http = useHttp();

  const [fields, setFields] = useState([]);

  useEffect(async () => {
    if (!schema) {
      return [];
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

            config.componentProps = {
              renderOption: (option) => option.name,
              getOptionLabel: (option) => option.name,
              options: data,
              multiple: field.options.multiple,
            };
          }

          return config;
        })
      )
    );
  }, [schema, currentLocation]);

  return fields;
}
