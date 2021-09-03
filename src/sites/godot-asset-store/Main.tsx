import React from "react";
import { Router } from "@reach/router";
import Lipsum from "components/Lipsum";
import SignIn from "pages/SignIn";
import Register from "pages/Register";
import A from "components/A";
import Filters from "./components/Filters";
import logo from "./logo.png";
import { any } from "joi";

interface Props {
  app: any;
}
export default function Main<Props>() {
  return (
    <div className="asset-store">
      <div id="navbar">
        <ul>
          <li>About</li>
          <li>
            <A to="signin">
              <i className="icon-login" />
              Sign In
            </A>
          </li>
          <li>
            <A to="logout">Logout</A>
          </li>
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
        </Router>
      </div>
    </div>
  );
}
