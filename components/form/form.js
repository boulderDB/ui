import useForm from "../../hooks/useForm";
import styles from "./form.module.css";
import Button from "../button/button";
import cn from "classnames";
import { colors, typography } from "../../styles/utilities";

function Form({ defaults, fields, onSubmit, submitLabel }) {
  const {
    handleSubmit,
    submitting,
    observeField,
    getFieldComponentProps,
  } = useForm(defaults);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(onSubmit);
      }}
    >
      {fields.map((field, index) => {
        const {
          Component,
          name,
          label,
          value,
          componentProps,
          description,
        } = getFieldComponentProps(field);

        return (
          <div className={styles.row} key={index}>
            <Component
              name={name}
              id={name}
              label={label}
              value={value}
              onChange={(event, value) => {
                console.log(Component.name);
                console.log(Component);

                return observeField({
                  event,
                  value,
                  name,
                  component: Component.name,
                });
              }}
              {...componentProps}
            />

            {description && (
              <span className={cn(typography.eta, colors.black)}>
                {description}
              </span>
            )}
          </div>
        );
      })}

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
