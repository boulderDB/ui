import React, { useEffect, useState } from "react";
import { set } from "lodash";
import Switch from "../components/switch/switch";
import { Upload } from "../components/upload/upload";

const dataResolvers = {
  Select: ({ value }) => {
    return value;
  },
  Switch: ({ event }) => {
    return event.target.checked;
  },
  EntitySelect: ({ value }) => {
    return value;
  },
};

export default function useForm(defaults) {
  const [formData, setFormData] = useState(defaults ? defaults : {});
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setFormData(defaults);
  };

  const handleSubmit = async (callback) => {
    setSubmitting(true);

    await callback(formData, resetForm);

    setSubmitting(false);
  };

  const setValue = ({ name, value }) => {
    const current = { ...formData };

    set(current, name, value);
    setFormData({ ...current });
  };

  const observeField = ({ event, value, name, component }) => {
    const resolver = dataResolvers[component];

    console.log(event);
    console.log(value);
    console.log(name);
    console.log(component);

    setValue({
      name,
      value: resolver ? resolver({ event, value }) : event.target.value,
    });
  };

  const getFieldComponentProps = ({
    name,
    componentProps = {},
    Component,
    ...rest
  }) => {
    let value = "";

    if (formData) {
      value = name in formData ? formData[name] : "";
    }

    if (Component === Switch) {
      componentProps.checked = Boolean(value);
    }

    if (Component === Upload) {
      componentProps.onSuccess = (value) => setValue({ name, value });
    }

    return {
      name,
      value,
      componentProps,
      Component,
      ...rest,
    };
  };

  useEffect(() => {
    setFormData(defaults);
  }, [defaults]);

  return {
    formData,
    setFormData,
    handleSubmit,
    submitting,
    setSubmitting,
    observeField,
    setValue,
    resetForm,
    getFieldComponentProps,
  };
}
