import { fetchOnceConfig, useCachedHttp, useHttp } from "./useHttp";
import { useContext } from "react";
import EntitySelect, {
  optionRenderers,
} from "../components/entitySelect/entitySelect";
import { AppContext } from "../pages/_app";
import TextField from "../components/textField/textField";
import Switch from "../components/switch/switch";
import DatePicker from "../components/datePicker/datePicker";
import Select from "../components/select/select";
import { Upload } from "../components/upload/upload";

const components = {
  TextType: TextField,
  CheckboxType: Switch,
  EntityType: EntitySelect,
  DateTimeType: DatePicker,
  ChoiceType: Select,
  IntegerType: TextField,
  NumberType: TextField,
};

export default function useSchemaForm(name, action) {
  const { currentLocation } = useContext(AppContext);

  const schema = useCachedHttp(
    `/schemas/${name}`,
    {
      location: currentLocation?.url,
    },
    fetchOnceConfig
  );

  if (!schema) {
    return { fields: [], defaults: {} };
  }

  return {
    fields: schema.map((field, index) => {
      const Component = components[field.type];

      let config = {
        name: field.name,
        label: field.name,
        Component,
        componentProps: {},
      };

      field.options?.constraints?.forEach((constraint) => {
        if (constraint.name === "NotBlank") {
          config.componentProps.required = true;
        }
      });

      if (index === 0 && field.type === "TextType" && action === "create") {
        config.componentProps.autoFocus = true;
      }

      if (field.type === "EntityType") {
        const labelProperty = field.schema.labelProperty
          ? field.schema.labelProperty
          : name;

        let renderOption = (option) => {
          if (!labelProperty || !option) {
            return "";
          }

          return labelProperty ? option[labelProperty] : option.name;
        };

        if (optionRenderers[field.name]) {
          renderOption = optionRenderers[field.name];
        }

        config.componentProps = {
          ...config.componentProps,
          renderOption: renderOption,
          getOptionLabel: (option) => {
            if (!labelProperty || !option) {
              return "";
            }

            return labelProperty ? option[labelProperty] : option.name;
          },
          multiple: field.options.multiple,
          labelProperty,
          resource: field.schema.resource
            ? `/${currentLocation.url}${field.schema.resource}`
            : null,
        };
      }

      if (field.type === "ChoiceType") {
        config.componentProps.options = Object.keys(
          field?.options?.choices
        )?.map((choice) => choice);
      }

      if (field.type === "IntegerType" || field.type === "NumberType") {
        config.componentProps.type = "number";
      }

      if (field?.schema?.type === "upload") {
        config.Component = Upload;
      }

      return config;
    }),
    defaults: schema
      .map((field) => {
        const name = field.name;

        if (field.schema?.default) {
          return { [name]: field.schema?.default };
        }

        if (field.options.multiple) {
          return { [name]: [] };
        }

        return { [name]: "" };
      })
      .reduce((object, item) => Object.assign(object, { ...item }), {}),
  };
}
