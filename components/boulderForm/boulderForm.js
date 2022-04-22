import useForm from "../../hooks/useForm";
import styles from "../form/form.module.css";
import cn from "classnames";
import { colors, typography } from "../../styles/utilities";
import Button from "../button/button";
import { useContext, useEffect, useState } from "react";
import { fetchOnceConfig, useCachedHttp } from "../../hooks/useHttp";
import { AppContext } from "../../pages/_app";
import EntitySelect from "../entitySelect/entitySelect";

export default function BoulderForm({ defaults, fields, onSubmit }) {
  const { currentLocation } = useContext(AppContext);

  const {
    handleSubmit,
    submitting,
    observeField,
    getFieldComponentProps,
  } = useForm(defaults);

  const config = useCachedHttp(
    `/${currentLocation?.url}/config`,
    null,
    fetchOnceConfig
  );

  const grades = useCachedHttp(
    `/${currentLocation?.url}/grades`,
    null,
    fetchOnceConfig
  );

  const [internalGrade, setInternalGrade] = useState(null);

  useEffect(() => {
    if (!config?.grades?.internal) {
      return;
    }

    if (!internalGrade) {
      return;
    }

    const gradeId = config.grades?.mapping.find(
      (map) => map.internal === internalGrade.id
    )?.external;

    if (!gradeId) {
      observeField({
        value: internalGrade,
        name: "grade",
        component: EntitySelect.typename,
      });

      return;
    }

    const grade = grades.find((grade) => grade.id === gradeId);

    if (!grade) {
      return;
    }

    observeField({
      value: grade,
      name: "grade",
      component: EntitySelect.typename,
    });
  }, [internalGrade]);

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
                observeField({
                  event,
                  value,
                  name,
                  component: Component.typename,
                });

                if (name === "internalGrade" && config?.grades?.internal) {
                  setInternalGrade(value);
                }
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
