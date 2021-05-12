import React from "react";

export const FormContext = React.createContext();

export default function Form({ children, values, setValues, onSubmit }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(values);
        return false;
      }}
    >
      <FormContext.Provider value={{ values, setValues }}>
        {children}
      </FormContext.Provider>
    </form>
  );
}
