import "./App.scss";
import "./fontello/css/fontello.css";
import { Location } from "@reach/router";
import { domainNameAppMapping } from "./constants";
import { useCookies } from "react-cookie";
import React, { lazy, Suspense } from "react";
import { useState } from "react";
import AlertsProvider from "components/ErrorsProvider";

export const AppContext = React.createContext();
export const CookieContext = React.createContext();
export const MessagingContext = React.createContext();

function App({ children }) {
  const [messages, setMessages] = useState([]);
  const setMessage = ({ code, duration = 2000, values }) => {};
  const [cookies, setCookie, removeCookie] = useCookies([
    "username",
    "role",
    "userId",
  ]); // not depending on token as it will change with refresh
  const clearCookies = () => {
    removeCookie("username");
    removeCookie("token");
    removeCookie("role");
    removeCookie("userId");
  };
  const cookieManager = {
    cookies,
    setCookie,
    removeCookie,
    clearCookies,
  };
  return (
    <div className="App">
      <CookieContext.Provider value={cookieManager}>
        <Suspense fallback={<div>Loading...</div>}>
          <Location>
            {(props) => {
              const appFromPathname = props.location.pathname.split("/")[1];
              const app = {
                ...(domainNameAppMapping[props.location.hostname] ||
                  domainNameAppMapping[appFromPathname] ||
                  domainNameAppMapping.default),
              };

              app.baseUrl = "/" + app.name + "/";
              const MainOfCurrentApp = lazy(() =>
                import(`./sites/${app.name}/Main`)
              );
              return (
                <AlertsProvider>
                  {MainOfCurrentApp && (
                    <AppContext.Provider value={app}>
                      <MainOfCurrentApp app={app} location={props.location}>
                        {children}
                      </MainOfCurrentApp>
                    </AppContext.Provider>
                  )}
                </AlertsProvider>
              );
            }}
          </Location>
        </Suspense>
      </CookieContext.Provider>
    </div>
  );
}

export default App;
