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
  console.log({ errors });
  if (!errors || !errors[name] || !dirty[name]) return <div />;
  console.log(errors);
  const display = label ? errors[name].replace(name, label) : errors[name];
  return <div className="error">{display}</div>;
}
