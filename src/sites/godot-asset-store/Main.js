import React, { useContext } from "react";
import { Router, Link } from "@reach/router";
import Filters from "components/Filters";
import Lipsum from "components/Lipsum";
import SignIn from "pages/SignIn";
import Register from "pages/Register";
import { StateContext } from "App";
export default function Main(props) {
  const app = useContext(StateContext);
  console.log({ app });
  return (
    <div className="asset-store">
      <div id="navbar">
        <ul>
          <li>About</li>
          <li>
            <Link to="signin">
              <i className="icon-login" />
              Sign In
            </Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
          <li>Upgrade</li>
        </ul>
      </div>
      <div className="logo">
        <Link to="/">
          <div id="logo-container">
            <img src="/images/icon.png" alt="logo" />
          </div>
          <h1>Godot Asset Store</h1>
        </Link>
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
