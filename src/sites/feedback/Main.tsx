import { AppSettings } from "App";
import Navbar from "components/Navbar";
import LeftRail from "./components/LeftRail";
import { routes } from "./routes";
import RouteList from "components/RouteList";
import LogoContainer from "components/LogoContainer";

export default function Main({ app }: { app: AppSettings }) {
  return (
    <div className={app.name}>
      <Navbar />
      <LogoContainer app={app} />
      <LeftRail />
      <div id="content">
        <RouteList routes={routes} app={app} />
      </div>
    </div>
  );
}
