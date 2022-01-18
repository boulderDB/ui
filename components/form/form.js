import useForm from "../../hooks/useForm";
import styles from "./form.module.css";
import Button from "../button/button";
import EntitySelect from "../entitySelect/entitySelect";
import Switch from "../switch/switch";
import { Upload } from "../upload/upload";
import Select from "../select/select";
import cn from "classnames";
import { colors, typography } from "../../styles/utilities";

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
      {fields.map(
        (
          { name, label, Component, componentProps = {}, description },
          index
        ) => {
          let value = "";

          if (formData) {
            value = name in formData ? formData[name] : "";
          }

          if (Component === EntitySelect || Component === Select) {
            componentProps.onChange = (event, value) =>
              setKeyValue(name, value);
          }

          if (Component === Switch) {
            componentProps.checked = Boolean(value);
          }

          if (Component === Upload) {
            componentProps.onSuccess = (value) => setKeyValue(name, value);
          }

          return (
            <div className={styles.row} key={index}>
              <Component
                name={name}
                id={name}
                label={label}
                value={value}
                onChange={observeField}
                {...componentProps}
              />

              {description && (
                <span className={cn(typography.eta, colors.danger)}>
                  {description}
                </span>
              )}
            </div>
          );
        }
      )}

      <Button
        type="submit"
        disabled={submitting}
        className={styles.button}
        loading={submitting}
      >
        {submitLabel}
      </Button>
    </form>
  );
}

export default Form;
