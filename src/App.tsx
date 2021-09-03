import "./App.scss";
import "./fontello/css/fontello.css";
import { Location } from "@reach/router";
import { Cookie, CookieSetOptions } from "universal-cookie";
import { Cookies, useCookies } from "react-cookie";
import React, { lazy, ReactNode, Suspense } from "react";
import AlertsProvider from "components/AlertsProvider";
import { domainNameAppMapping } from "./constants";
import { string } from "joi";

export interface SettingsForApp {
  name: string;
  baseUrl?: string;
}

export interface SettingsForApps {
  [appName: string]: SettingsForApp;
}

export interface CookieValues {
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

export const AppContext = React.createContext<SettingsForApp>({ name: "" });
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
              const settingsForApps = {
                ...(domainNameAppMapping[props.location.hostname] ||
                  domainNameAppMapping[appFromPathname] ||
                  domainNameAppMapping.default),
              };

              settingsForApps.baseUrl = `/${settingsForApps.name}/`;
              const MainOfCurrentApp = lazy(
                () => import(`./sites/${settingsForApps.name}/Main`)
              );
              return (
                <AlertsProvider>
                  {MainOfCurrentApp && (
                    <AppContext.Provider value={settingsForApps}>
                      <MainOfCurrentApp
                        app={settingsForApps}
                        location={props.location}
                      >
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
