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
    <div className="logo-container">
      <A to="">
        <div id="logo-image-container">{children}</div>
      </A>
    </div>
  );
}
