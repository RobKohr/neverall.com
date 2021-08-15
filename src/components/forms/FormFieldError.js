import React, { useContext } from "react";

import { FormContext } from "./Form";

export default function FormFieldError({ name, label }) {
  const { errors, dirty } = useContext(FormContext);

  if (!errors || !errors[name] || !dirty[name]) return <div></div>;

  return <div className="error">{errors[name].message}</div>;
}
