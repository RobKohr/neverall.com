import React, { useContext } from "react";
import { FormContext } from "./Form";
export default function Input({
  name,
  type = "text",
  values,
  updateValue,
  label,
}) {
  const formContext = useContext(FormContext);
  console.log({ formContext });
  function onChange(e) {
    updateValue({ name, value: e.target.value });
  }

  return (
    <div className="input-wrapper">
      <label>{label}</label>
      <input type={type} name={name} value={values[name]} onChange={onChange} />
    </div>
  );
}
