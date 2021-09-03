import React, { useContext } from "react";
import { FormContext } from "./Form";
import FormFieldError from "./FormFieldError";

export default function Input({ name, type = "text", label }) {
  const { updateValue, values, validate, setFieldDirty } =
    useContext(FormContext);

  function onChange(e) {
    updateValue({ name, value: e.target.value, label });
  }
  if (typeof values[name] === "undefined") {
    values[name] = "";
  }

  function onBlur() {
    validate();
    setFieldDirty(name);
  }
  return (
    <div className="input-wrapper">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={values[name]}
        onChange={onChange}
        onBlur={onBlur}
      />
      <FormFieldError name={name} label={label} />
    </div>
  );
}
