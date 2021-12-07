import React, { useState } from "react";
import { set } from "lodash";

const dataResolvers = {
  "select-multiple": (current, event) => {
    set(
      current,
      event.target.name,
      Array.from(event.target.selectedOptions, (option) => option.value)
    );
  },
  "styled-multiselect": (current, event) => {
    set(
      current,
      event.target.name,
      event.target.selected.map((option) => option.value)
    );
  },
  "styled-select": (current, event) => {
    const selected = event.target.selected;
    set(
      current,
      event.target.name,
      selected.length > 0 ? selected.map((option) => option.value)[0] : null
    );
  },
  checkbox: (current, event) => {
    set(current, event.target.name, event.target.checked);
  },
};

export default function useForm(defaults) {
  const [formData, setFormData] = useState(defaults ? defaults : {});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (callback) => {
    setSubmitting(true);

    await callback(formData);

    setSubmitting(false);

    return false;
  };

  const setKeyValue = (key, value) => {
    const current = { ...formData };

    set(current, key, value);
    setFormData({ ...current });
  };

  const observeField = (event) => {
    const current = { ...formData };
    const resolver = dataResolvers[event.target.type];

    if (!resolver) {
      set(current, event.target.name, event.target.value);
    } else {
      resolver(current, event);
    }

    setFormData({ ...current });
  };

  const resetForm = () => {
    setFormData(defaults);
  };

  return {
    formData,
    setFormData,
    setKeyValue,
    handleSubmit,
    submitting,
    setSubmitting,
    observeField,
    resetForm,
  };
}
