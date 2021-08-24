import React, { useContext } from "react";
import { FormContext } from "./Form";
export default function Submit({ label = "Submit" }: { label: string }) {
  // eslint-disable-next-line no-unused-vars
  const { errors } = useContext(FormContext);

  return (
    <div className="input-wrapper">
      <input type="submit" value={label} disabled={!!errors} />
    </div>
  );
}
