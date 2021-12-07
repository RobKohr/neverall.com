import { CookieContext } from "App";
import React, { useContext } from "react";
import A from "./A";

export default function Navbar() {
  const { cookies } = useContext(CookieContext);

  return (
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
  );
}
