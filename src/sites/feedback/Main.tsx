import { AppSettings, CookieContext } from "App";
import Navbar from "components/Navbar";
import LeftRail from "./components/LeftRail";
import { routes } from "./routes";
import RouteList from "components/RouteList";
import LogoContainer from "components/LogoContainer";
import { ReactComponent as Logo } from "./logo.svg";

import Search from "components/Search";
import Lipsum from "components/Lipsum";
import HeaderMenu, { MenuItem } from "components/HeaderMenu";
import "./Site.scss";
import A from "components/A";
import NeverallAppsMenu from "components/NeverallAppsMenu";
import { useContext } from "react";

export default function Main({ app }: { app: AppSettings }) {
  const { cookies } = useContext(CookieContext);
  const menu: MenuItem[] = [
    { label: "Create A Forum", to: "create" },
    { label: "Login/Register", to: "login" },
    { label: "Logout", to: "logout" },
    {
      label: "test",
      subMenu: [
        { label: "asdf", to: "something" },
        { label: "asdff", to: "something" },
        { label: "asdfs", to: "something" },
      ],
    },
  ];

  return (
    <div className={`app-${app.name} site-container`}>
      <div id="header">
        <NeverallAppsMenu />
        <div className="logo-container logo" style={{ whiteSpace: "nowrap" }}>
          <A to="">
            <Logo
              style={{
                width: "45px",
                height: "46px",
                fill: "white",
                display: "inline-block",
                position: "relative",
                top: "5px",
                left: "0",
              }}
            />
            <span
              className="logo-text desktop-only inline-block"
              style={{
                position: "relative",
                top: "-2px",
                paddingLeft: "0.5em",
                fontSize: "1.0rem",
                color: "white",
              }}
            >
              <span>FEEDBACK</span>
              <br />
              <span>&nbsp;&nbsp;&nbsp;&nbsp;FORUMS</span>
            </span>
          </A>
        </div>
        <Search />
        <HeaderMenu menu={menu} />
      </div>
      <div id="content">
        <RouteList routes={routes} app={app} />
      </div>
    </div>
  );
}
