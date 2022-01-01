import React, { useContext } from "react";

import { FormContext } from "./Form";

export default function FormFieldError({ name, label }) {
  const { errors, dirty } = useContext(FormContext);
  console.log({errors})
  if (!errors || !errors[name] || !dirty[name]) return <div />;
  console.log(errors)
  const display = label
    ? errors[name]?.message.replace(name, label)
    : errors[name]?.message;
  return <div className="error">{display}</div>;
}
