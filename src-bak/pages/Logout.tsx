import { RouteComponentProps } from "@reach/router";
import { CookieContext } from "App";
import React, { useContext, useEffect } from "react";

export default function Logout(_props: RouteComponentProps) {
  const { clearCookies, cookies, setCookie } = useContext(CookieContext);
  useEffect(() => {
    clearCookies();
  }, [clearCookies]);
  return <div>User logged out</div>;
}
