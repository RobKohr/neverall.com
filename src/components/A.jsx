import React, { Link } from "@reach/router";
import { AppContext } from "App";
import { useContext } from "react";

export default function A({ to, children }) {
  const app = useContext(AppContext);
  return <Link to={app.baseUrl + to}>{children}</Link>;
}
