import { useCachedHttp } from "./useHttp";
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
  const schema = useCachedHttp(`/schemas/${name}`);
  const { currentLocation } = useContext(AppContext);

  if (!schema) {
    return { fields: [], defaults: [] };
  }

  return {
    fields: schema.map((field, index) => {
      const Component = components[field.type];
      console.log(field);

      const constraints = field.options?.constraints
        ? field.options?.constraints?.map((constraint) => {
            if (constraint.name === "NotBlank") {
              return {
                required: true,
              };
            }
          })
        : [];

      let config = {
        name: field.name,
        label: field.name,
        Component,
        componentProps: { ...Object.assign({}, constraints) },
      };

      if (index === 0 && field.type === "TextType" && action === "create") {
        config.componentProps.autoFocus = "autoFocus";
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
          resource: `/${currentLocation.url}${field.schema.resource}`,
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

        return { [name]: null };
      })
      .reduce((object, item) => Object.assign(object, { ...item }), {}),
  };
}
