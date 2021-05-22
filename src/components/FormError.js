import React from "react";

export function FormError({ name, label, errors }) {
  if (!errors || !errors[name]) return <div></div>;
  return <div className="error">{errors[name].message}</div>;
}
