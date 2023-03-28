"use client";

import {
  Field as HouseFormField,
  Form as HouseForm,
  FieldInstanceProps,
  FormInstance,
} from "houseform";
import styles from "./_form.module.css";
import { useState } from "react";
import utilities from "../../styles/utilities/utilities";
import cx from "classix";
import { InputProps } from "../input/input";
import { Button } from "../button/_button";
import { UploadProps } from "../upload/_upload";
import { SelectProps } from "../select/_select";
import { HTTPError } from "../../lib/http";
import {
  ErrorReponse,
  FormErrorResponse,
  ServerErrorResponse,
} from "../../lib/types";

export type PrimitiveInput = number | string | boolean | null;

export type ChangeHandler<ComplexInput = void> = (
  value: PrimitiveInput | PrimitiveInput[] | ComplexInput | ComplexInput[]
) => void;

export type FormFieldProps<ComplexInput = void> = {
  name: string;
  onChange?: ChangeHandler<ComplexInput>;
  hasError?: boolean;
};

type ComponentProps = InputProps | UploadProps | SelectProps<any>;

type FormField = {
  placeholder?: string;
  label: string;
  description?: string;
  component: React.ComponentType<ComponentProps>;
} & FormFieldProps &
  FieldInstanceProps &
  ComponentProps;

type FormProps<TValues> = {
  onSubmit: (values: TValues, form: FormInstance<TValues>) => Promise<void>;
  submitLabel: string;
  fields: FormField[];
};

function isFormErrorResponse(
  error: FormErrorResponse | ServerErrorResponse
): error is FormErrorResponse {
  return (error as FormErrorResponse).errors !== undefined;
}

export function Form<TValues>({
  onSubmit,
  submitLabel,
  fields,
}: FormProps<TValues>) {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  return (
    <div>
      {error ? (
        <div className={styles.responseError}>
          <p className={utilities.typograpy.delta700}>{error}</p>
        </div>
      ) : null}

      <HouseForm<TValues>
        onSubmit={async (values, form) => {
          setSubmitting(true);

          try {
            await onSubmit(values, form);
          } catch (error) {
            if (error instanceof HTTPError) {
              if (!isFormErrorResponse(error.response)) {
                setError(error.response.message);
              } else {
                for (const field of Object.keys(error.response.errors)) {
                  form
                    .getFieldValue(field)
                    ?.setErrors(error.response.errors[field]);
                }
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
                    initialValue={initialValue}
                  >
                    {({ value, setValue, onBlur, errors }) => {
                      return (
                        <div className={styles.row} key={name}>
                          <label
                            className={cx(
                              utilities.typograpy.epsilon,
                              styles.label
                            )}
                          >
                            {label}
                          </label>

                          <InputComponent
                            {...rest}
                            name={name}
                            hasError={errors.length > 0}
                            className={cx(styles.input)}
                            value={value}
                            onBlur={onBlur}
                            onChange={(value: any) => setValue(value)}
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
              loading={submitting}
              disabled={!isValid}
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
