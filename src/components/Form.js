import React, { useState } from "react";

export const FormContext = React.createContext();

export default function Form({
  children,
  values,
  setValues,
  onSubmit,
  schema,
  remap,
}) {
  const [errors, setErrors] = useState(null);
  const [labels, setLabels] = useState({});
  const updateValue = ({ name, value, label }) => {
    setValues({ ...values, [name]: value });
    if (!labels[name] && label) {
      setLabels({ ...labels, [name]: label });
    }
  };

  const validate = () => {
    const validation = schema.validate(values, { abortEarly: false });
    const errors = validation?.error?.details;
    setErrors(errors ? remapErrorMessages({ errors, remap, labels }) : null);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(values);
        return false;
      }}
    >
      <FormContext.Provider
        value={{ values, setValues, updateValue, validate, errors }}
      >
        {children}
      </FormContext.Provider>
    </form>
  );
}
const defaultRemap = [
  { original: "is not allowed to be empty", replacement: "is missing" },
];

export function remapErrorMessages({ errors, remap, labels }) {
  const combinedRemap = (remap || []).concat(defaultRemap);
  const out = {};

  errors.forEach(function processError({ context, message }) {
    const name = context?.key;
    if (!name) return;

    out[name] = { message };
    const container = out[name];
    if (labels[name]) {
      container.message = container.message.replace(
        `"${name}"`,
        `"${labels[name]}"`
      );
    }
    combinedRemap.forEach(({ original, replacement, name: replaceField }) => {
      if (original) {
        container.message = container.message.replace(original, replacement);
      }
      if (replaceField === name) {
        container.message = replacement;
      }
    });
  });

  return out;
}
