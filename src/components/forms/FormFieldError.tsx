import { useContext } from "react";

import { FormContext } from "./Form";

export default function FormFieldError({
  name,
  label,
}: {
  name: string;
  label: string;
}) {
  const { errors, dirty } = useContext(FormContext);
  if (!errors || !errors[name] || !dirty[name]) return <div />;
  const display = label ? errors[name].replace(name, label) : errors[name];
  return <div className="error">{display}</div>;
}
