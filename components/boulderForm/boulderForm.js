import useForm from "../../hooks/useForm";
import styles from "../form/form.module.css";
import cn from "classnames";
import { colors, typography } from "../../styles/utilities";
import Button from "../button/button";

export default function BoulderForm({ defaults, fields, onSubmit }) {
  const {
    handleSubmit,
    submitting,
    observeField,
    setValue,
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
              {...componentProps}
              name={name}
              id={name}
              label={label}
              value={value}
              onChange={(event, value) => {
                if (name === "grade") {
                  setValue({
                    name: "internalGrade",
                    value,
                  });
                }

                observeField({
                  event,
                  value,
                  name,
                  component: Component.name,
                });
              }}
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
        Create
      </Button>
    </form>
  );
}
