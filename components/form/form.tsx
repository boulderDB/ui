import {
  Field as HouseFormField,
  Form as HouseForm,
  FieldInstanceProps,
  FormInstance,
} from "houseform";
import styles from "./form.module.css";
import { useState } from "react";
import utilities from "../../styles/utilities/utilities";
import cx from "classix";
import { InputProps } from "../input/input";
import { Button } from "../button/button";
import { UploadProps } from "../upload/upload";
import { Option, SelectProps } from "../select/select";
import { FormErrorResponse, ServerErrorResponse } from "../../lib/types";
import { SwitchProps } from "../switch/switch";
import { Label } from "../label/label";
import { Notice } from "../notice/notice";
import { MultiSelectProps } from "../select/multiSelect";

export type FormFieldProps<TValue> = {
  id?: string;
  name?: string;
  onChange?: (value: TValue | null) => void;
  hasError?: boolean;
};

type ComponentProps =
  | InputProps
  | UploadProps
  | SelectProps<Option>
  | MultiSelectProps<Option>
  | SwitchProps;

type FormField<TValue> = {
  placeholder?: string;
  label: string;
  description?: string;
  component: React.ComponentType<ComponentProps>;
} & FormFieldProps<TValue> &
  FieldInstanceProps &
  ComponentProps;

type FormProps<TValues> = {
  data?: TValues;
  onSubmit: (
    values: TValues,
    form: FormInstance<TValues>,
    setSuccess: (message: React.ReactNode) => void
  ) => Promise<void>;
  submitLabel: string;
  fields: FormField<unknown>[];
};

function isFormErrorResponse(
  error: FormErrorResponse | ServerErrorResponse
): error is FormErrorResponse {
  return (error as FormErrorResponse).errors !== undefined;
}

export function Form<TValues extends {}>({
  data,
  onSubmit,
  submitLabel,
  fields,
}: FormProps<TValues>) {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<React.ReactNode>();

  return (
    <div className={cx(styles.root, submitting ? styles.isSubmitting : null)}>
      <div className={styles.notice}>
        {error ? (
          <Notice type="error">
            <p className={utilities.typograpy.delta700}>{error}</p>
          </Notice>
        ) : null}

        {success ? (
          <Notice type="success">
            <p className={utilities.typograpy.delta700}>{success}</p>
          </Notice>
        ) : null}
      </div>

      <HouseForm<TValues>
        onSubmit={async (values, form) => {
          setSubmitting(true);

          try {
            await onSubmit(values, form, setSuccess);
          } catch (error) {
            if (!error.response) {
              throw error;
            }

            if (!isFormErrorResponse(error.response.data)) {
              setError(error.response.data.message);
            } else {
              for (const field of Object.keys(error.response.data.errors)) {
                form
                  .getFieldValue(field)
                  ?.setErrors(error.response.data.errors[field]);
              }
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isValid, submit }) => (
          <form
            className={styles.root}
            onSubmit={(event) => {
              event.preventDefault();
              submit();
            }}
          >
            {fields.map(
              ({
                name,
                label,
                description,
                onBlurValidate,
                onChangeValidate,
                onSubmitValidate,
                initialValue,
                component: InputComponent,
                ...rest
              }) => {
                return (
                  <HouseFormField
                    key={name}
                    name={name}
                    onBlurValidate={onBlurValidate}
                    onChangeValidate={onChangeValidate}
                    onSubmitValidate={onSubmitValidate}
                    initialValue={data ? data[name] : initialValue}
                  >
                    {({ value, setValue, onBlur, errors }) => {
                      return (
                        <div className={styles.row} key={name}>
                          <Label htmlFor={name}>{label}</Label>

                          <InputComponent
                            {...rest}
                            id={name}
                            label={label}
                            name={name}
                            hasError={errors.length > 0}
                            className={cx(styles.input)}
                            value={value}
                            onBlur={onBlur}
                            onChange={(value) => setValue(value)}
                          />

                          {description ? (
                            <p
                              className={cx(
                                styles.description,
                                utilities.typograpy.epsilon
                              )}
                            >
                              {description}
                            </p>
                          ) : null}

                          {errors.map((error) => (
                            <p
                              key={error}
                              className={cx(
                                styles.error,
                                utilities.typograpy.epsilon,
                                utilities.colors.red
                              )}
                            >
                              {error}
                            </p>
                          ))}
                        </div>
                      );
                    }}
                  </HouseFormField>
                );
              }
            )}

            <Button
              disabled={!isValid || submitting}
              type="submit"
              className={styles.button}
            >
              {submitLabel}
            </Button>
          </form>
        )}
      </HouseForm>
    </div>
  );
}
