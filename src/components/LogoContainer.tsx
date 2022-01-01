import { AppSettings } from "App";
import { ReactNode } from "react";
import A from "./A";

export default function LogoContainer({
  app,
  children,
}: {
  app: AppSettings;
  children: ReactNode;
}) {
  return (
    <div className="logo">
      <A to="">
        <div id="logo-container">{children}</div>
        <h1>{app.title}</h1>
      </A>
    </div>
  );
}
