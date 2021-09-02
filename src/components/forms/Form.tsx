import Joi from "joi";
import React, { useState } from "react";

interface UpdateValue {
  name: string;
  value: string;
  label: string;
}

interface FormContextValue {
  values: Values;
  setValues: (values: Values) => void;
  updateValue: (updatedValue: UpdateValue) => void;
  validate: (updatedValues: Values) => Errors | null;
  errors: Errors | null;
  dirty: Dirty;
  setFieldDirty: (fieldName: string) => void;
}

export const FormContext = React.createContext<FormContextValue>({
  values: {},
  setValues: () => {},
  updateValue: () => {},
  validate: () => {
    return null;
  },
  errors: {},
  dirty: {},
  setFieldDirty: () => {},
});

export interface Values {
  [name: string]: string;
}

export interface Errors {
  [name: string]: string;
}

export interface Labels {
  [name: string]: string;
}
export interface Dirty {
  [name: string]: boolean | string;
}
interface Props {
  children: any;
  values: Values;
  setValues: (values: Values) => void;
  onSubmit: (values: Values) => void;
  schema: Joi.ObjectSchema;
  remap: any;
}

export default function Form({
  children,
  values,
  setValues,
  onSubmit,
  schema,
  remap,
}: Props) {
  const [errors, setErrors] = useState<Errors | null>(null);
  const [labels, setLabels] = useState<Labels>({});
  const [dirty, setDirty] = useState<Dirty>({});

  const updateValue = ({ name, value, label }: UpdateValue) => {
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
  function setFieldDirty(name: string) {
    setDirty({ ...dirty, [name]: true });
  }

  const validate = (updatedValues: Values) => {
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

  const formContextValue: FormContextValue = {
    values,
    setValues,
    updateValue,
    validate,
    errors,
    dirty,
    setFieldDirty,
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const errors = validate(values);
        if (errors?.length) {
          setDirty({ ...dirty, ...errors });
        } else {
          onSubmit(values);
          return false;
        }
      }}
    >
      <FormContext.Provider value={formContextValue}>
        {children}
      </FormContext.Provider>
    </form>
  );
}

interface Remap {
  original: string;
  replacement: string;
  name?: string;
}

const defaultRemap: Remap[] = [
  { original: "is not allowed to be empty", replacement: "is missing" },
];
interface RemapErrorMessages {
  errors: Joi.ValidationErrorItem[] | undefined;
  remap: Remap[];
  labels: Labels;
}
export function remapErrorMessages({
  errors,
  remap,
  labels,
}: RemapErrorMessages) {
  const combinedRemap = (remap || []).concat(defaultRemap);
  const out: Errors = {};
  if (!errors) return {};
  errors.forEach(function processError({ context, message }) {
    const name = context?.key;
    if (!name) return;
    const container = out[name];
    console.warn("remapErrorMessages resolve", {
      context,
      message,
      container,
      combinedRemap,
    });

    // out[name] = message;
    //
    // if (labels[name]) {
    //   container.message = container.message.replace(
    //     `"${name}"`,
    //     `"${labels[name]}"`
    //   );
    // }
    // combinedRemap.forEach(({ original, replacement, name: replaceField }) => {
    //   if (original) {
    //     container.message = container.message.replace(original, replacement);
    //   }
    //   if (replaceField === name) {
    //     container.message = replacement;
    //   }
    // });
  });

  return out;
}
