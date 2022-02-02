import { Note } from "components/BasicComponents";
import React, { useContext } from "react";
import { FormContext } from "./Form";
import FormFieldError from "./FormFieldError";

export default function Input({
  name,
  label,
  hideLabel = false,
  type = "text",
  className = "",
  placeholder,
  note = "",
}: {
  name: string;
  label: string;
  hideLabel?: boolean;
  type?: string;
  className?: string;
  placeholder?: string;
  note?: string;
}) {
  const { updateValue, values, validate, setFieldDirty } =
    useContext(FormContext);

  function onChange(e: { target: { value: string } }) {
    updateValue({ name, value: e.target.value, label: label || name });
  }
  if (typeof values[name] === "undefined") {
    values[name] = "";
  }

  function onBlur() {
    validate(values);
    setFieldDirty(name);
  }
  return (
    <div className="input-wrapper">
      {!hideLabel && <label>{label}</label>}
      <input
        type={type}
        name={name}
        value={values[name]}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`form-input form-input-${type} ${className}`}
      />
      <FormFieldError name={name} label={label} />
      {note && <Note>{note}</Note>}
    </div>
  );
}
