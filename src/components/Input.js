import React, { useContext } from "react";
import { FormContext } from "./Form";
import { FormError } from "./FormError";
export default function Input({ name, type = "text", label }) {
  const { updateValue, values, validate, errors, setDirty, dirtyFields } =
    useContext(FormContext);
  console.log("asdf");
  function onChange(e) {
    updateValue({ name, value: e.target.value, label });
  }

  return (
    <div className="input-wrapper">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={values[name]}
        onChange={onChange}
        onBlur={validate}
      />
      <FormError name={name} label={label} errors={errors} />
    </div>
  );
}
