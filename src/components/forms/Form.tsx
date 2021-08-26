import { any, string } from "joi";
import React, { useState } from "react";

export const FormContext = React.createContext();

interface Props {
  children: any;
  values: string[];
  setValues: (values: string[]) => void;
  onSubmit: (values: string[]) => void;
  schema: any;
  remap: any;
}

interface DictList {
  [name: string]: string;
}

export default function Form({
  children,
  values,
  setValues,
  onSubmit,
  schema,
  remap,
}: Props) {
  const [errors, setErrors] = useState(null);
  const [labels, setLabels] = useState({});
  const [dirty, setDirty] = useState({});
  const updateValue = ({
    name,
    value,
    label,
  }: {
    name: string;
    value: string;
    label: string;
  }) => {
    const updatedValues = { ...values, [name]: value };
    setValues(updatedValues);
    if (!labels[name] && label) {
      setLabels({ ...labels, [name]: label });
    }
    if (value && !dirty[name]) {
      setFieldDirty(name);
    }
    validate({ ...values, [name]: value });
  };
  function setFieldDirty(name) {
    setDirty({ ...dirty, [name]: true });
  }

  const validate = (updatedValues) => {
    const validation = schema.validate(updatedValues || values, {
      abortEarly: false,
    });
    const errors = validation?.error?.details;
    const errorsToSet = errors
      ? remapErrorMessages({ errors, remap, labels })
      : null;
    setErrors(errorsToSet);
    return errorsToSet;
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const errors = validate(values);
        if (errors?.length) {
          setDirty({ ...dirty, ...errors });
        } else {
          onSubmit({ values });
          return false;
        }
      }}
    >
      <FormContext.Provider
        value={{
          values,
          setValues,
          updateValue,
          validate,
          errors,
          dirty,
          setFieldDirty,
        }}
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
    console.log(name);
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
