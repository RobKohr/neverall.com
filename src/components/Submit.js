import React, { useContext } from "react";
import { FormContext } from "./Form";
export default function Submit({ name, type = "text", label }) {
  // eslint-disable-next-line no-unused-vars
  const { updateValue, values, validate, errors, setDirty, dirtyFields } =
    useContext(FormContext);

  return (
    <div className="input-wrapper">
      <input type="submit" value={label} disabled={!!errors} />
    </div>
  );
}
