import { AppContext } from "App";
import { ReactNode, useContext } from "react";
import { Link } from "react-router-dom";

export default function A({
  to,
  children,
  absolute = false,
  className = "",
  onClick = null,
}: {
  to?: string;
  onClick?: (() => void) | null;
  children: ReactNode;
  absolute?: boolean;
  className?: string;
}) {
  const app = useContext(AppContext);
  const prefix = absolute ? "" : app.baseUrl ? app.baseUrl + "/" : "";
  if (onClick) {
    return <a onClick={onClick}>{children}</a>;
  }

  return (
    <Link to={prefix + to} className={className}>
      {children}
    </Link>
  );
}
