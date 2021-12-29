import { AppContext } from "App";
import { ReactNode, useContext } from "react";
import { Link } from "react-router-dom";

export default function A({
  to,
  children,
  absolute = false,
}: {
  to: string;
  children: ReactNode;
  absolute?: boolean;
}) {
  const app = useContext(AppContext);
  const prefix = absolute ? "" : app.baseUrl ? app.baseUrl + "/" : "";
  return <Link to={prefix + to}>{children}</Link>;
}
