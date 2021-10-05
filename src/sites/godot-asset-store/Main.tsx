import React, { useContext } from "react";
import { Router } from "@reach/router";
import Lipsum from "components/Lipsum";
import SignIn from "pages/SignIn";
import Register from "pages/Register";
import A from "components/A";
import { CookieContext } from "App";
import Logout from "pages/Logout";
import Filters from "./components/Filters";
import logo from "./logo.png";

export default function Main() {
  const { cookies } = useContext(CookieContext);
  return (
    <div className="asset-store">
      <div id="navbar">
        <ul>
          <li>About</li>
          {!cookies?.username && (
            <li>
              <A to="signin">
                <i className="icon-login" />
                Sign In
              </A>
            </li>
          )}
          {cookies?.username && (
            <li>
              <A to="logout">Logout {cookies?.username}</A>
            </li>
          )}
          <li>Upgrade</li>
        </ul>
      </div>
      <div className="logo">
        <A to="">
          <div id="logo-container">
            <img src={logo} alt="logo" />
          </div>
          <h1>Godot Asset Store</h1>
        </A>
      </div>
      <Filters />
      <div id="content">
        <Router basepath="/godot-asset-store/">
          <Lipsum path="/" />
          <SignIn path="/signin" />
          <Register path="/register" />
          <Logout path="/logout" />
        </Router>
      </div>
    </div>
  );
}
