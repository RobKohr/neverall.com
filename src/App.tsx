import "./App.scss";
import "./fontello/css/fontello.css";
import { Location } from "@reach/router";
import { Cookie, CookieSetOptions } from "universal-cookie";
import { Cookies, useCookies } from "react-cookie";
import React, { lazy, ReactNode, Suspense } from "react";
import AlertsProvider from "components/AlertsProvider";
import { domainNameAppMapping } from "./constants";
import { string } from "joi";

export interface App {
  [configName: string]: string;
}
export interface Cookies {
  [name: string]: string;
}
export interface CookieManager {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cookies?: { [name: string]: any };
  setCookie?: (
    name: string,
    value: string,
    options?: CookieSetOptions | undefined
  ) => void;
  removeCookie?: (name: string) => void;
  clearCookies?: () => void;
}

export const AppContext = React.createContext<App>({});
export const CookieContext = React.createContext<CookieManager>({});
export const MessagingContext = React.createContext({});

function App({ children }: { children: ReactNode }) {
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
  const cookieManager: CookieManager = {
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

              app.baseUrl = `/${app.name}/`;
              const MainOfCurrentApp = lazy(
                () => import(`./sites/${app.name}/Main`)
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
