import useForm from "../../hooks/useForm";
import styles from "./form.module.css";
import Button from "../button/button";
import EntitySelect from "../entitySelect/entitySelect";
import Switch from "../switch/switch";
import { Upload } from "../upload/upload";
import Select from "../select/select";

function Form({ defaults, fields, onSubmit, submitLabel }) {
  const {
    handleSubmit,
    submitting,
    formData,
    observeField,
    setKeyValue,
  } = useForm(defaults);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(onSubmit);
      }}
    >
      {fields.map(({ name, Component, componentProps }) => {
        const value = name in formData ? formData[name] : "";

        if (Component === EntitySelect || Component === Select) {
          componentProps.onChange = (event, value) => setKeyValue(name, value);
        }

        if (Component === Switch) {
          componentProps.checked = value;
        }

        if (Component === Upload) {
          componentProps.onSuccess = (value) => setKeyValue(name, value);
        }

        componentProps.label = name;

        return (
          <div className={styles.row} key={name}>
            <Component
              name={name}
              id={name}
              label={name}
              value={value}
              onChange={observeField}
              {...componentProps}
            />
          </div>
        );
      })}

      <Button type="submit" disabled={submitting}>
        {submitLabel}
      </Button>
    </form>
  );
}

export default Form;
