import { AppSettings } from "App";
import Navbar from "components/Navbar";
import LeftRail from "./components/LeftRail";
import { routes } from "./routes";
import RouteList from "components/RouteList";
import LogoContainer from "components/LogoContainer";
import logo from "./logo.png";

export default function Main({ app }: { app: AppSettings }) {
  return (
    <div className={app.name}>
      <Navbar />
      <LogoContainer app={app}>
        <img src={logo} alt="logo" />
      </LogoContainer>
      <LeftRail />
      <div id="content">
        <RouteList routes={routes} app={app} />
      </div>
    </div>
  );
}
