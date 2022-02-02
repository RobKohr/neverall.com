import { AppSettings } from "App";
import Navbar from "components/Navbar";
import LeftRail from "./components/LeftRail";
import { routes } from "./routes";
import RouteList from "components/RouteList";
import LogoContainer from "components/LogoContainer";
import logo from "./logo.png";
import Search from "components/Search";
import Lipsum from "components/Lipsum";
import HeaderMenu from "components/HeaderMenu";
import "./Site.scss";

export default function Main({ app }: { app: AppSettings }) {
  const linkPrefix = "editthis-info/";
  const menu = [
    { label: "Create A Forum", to: "create" },
    { label: "Login/Register", to: "login" },
    { label: "Logout", to: "logout" },
  ];

  return (
    <div className={`app-${app.name} main-app-container`}>
      <div id="header">
        <LogoContainer app={app}>
          <img src={logo} alt="logo" className="small-logo" />
          <div className="big-logo">
            <img src={logo} alt="logo" /> FEEDBACK
          </div>
        </LogoContainer>
        <Search />
        <HeaderMenu menu={menu} />
      </div>
      <div id="content">
        <RouteList routes={routes} app={app} />
        {/* 
        <Lipsum paragraphs={30} /> */}
      </div>
    </div>
  );
}
