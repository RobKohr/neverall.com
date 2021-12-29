import { AppSettings } from "App";
import A from "./A";

export default function LogoContainer({ app }: { app: AppSettings }) {
  return (
    <div className="logo">
      <A to="">
        <div id="logo-container">{/* <img src={logo} alt="logo" /> */}</div>
        <h1>{app.title}</h1>
      </A>
    </div>
  );
}
