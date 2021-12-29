import { CookieContext } from "App";
import React, { useContext, useEffect } from "react";

export default function Logout() {
  const { clearCookies, cookies, setCookie } = useContext(CookieContext);
  useEffect(() => {
    clearCookies();
  }, [clearCookies]);
  return <div>User logged out</div>;
}
