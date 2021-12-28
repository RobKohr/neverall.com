import "./App.scss";
import "./fontello/css/fontello.css";
import { CookieSetOptions } from "universal-cookie";
import { useCookies } from "react-cookie";
import React, { lazy, ReactNode, Suspense } from "react";
// import AlertsProvider from "components/AlertsProvider";
import { domainNameAppMapping } from "./constants";
import { useLocation, BrowserRouter } from "react-router-dom";
import AlertsProvider from "components/AlertsProvider";

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
  cookies: { [name: string]: any };
  setCookie: (
    name: "username" | "role" | "userId" | "token",
    value: string,
    options?: CookieSetOptions | undefined
  ) => void;
  removeCookie: (name: "username" | "role" | "userId" | "token") => void;
  clearCookies: () => void;
}

export const AppContext = React.createContext<SettingsForApp>({ name: "" });
export const CookieContext = React.createContext<CookieManager>({
  cookies: {},
  setCookie: (
    name: "username" | "role" | "userId" | "token",
    value: string,
    options?: CookieSetOptions | undefined
  ) => {},
  removeCookie: (name: "username" | "role" | "userId" | "token") => {},
  clearCookies: () => {
    console.log("former");
  },
});
export const MessagingContext = React.createContext({});

function App({ children }: { children?: ReactNode }) {
  return (
    <BrowserRouter>
      <AppUnderRouter>{children}</AppUnderRouter>
    </BrowserRouter>
  );
}

function AppUnderRouter({ children }: { children?: ReactNode }) {
  const [cookies, setCookie, removeCookie] = useCookies([
    "username",
    "role",
    "userId",
    "token",
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
  const hostname = window.location.hostname;
  const location = useLocation();
  const appFromPathname = location.pathname.split("/")[1];

  const settingsForApps = {
    ...(domainNameAppMapping[hostname] ||
      domainNameAppMapping[appFromPathname] ||
      domainNameAppMapping.default),
  };
  settingsForApps.baseUrl = `/${settingsForApps.name}/`;
  console.log(settingsForApps);
  const MainOfCurrentApp = lazy(
    () => import(`./sites/${settingsForApps.name}/Main`)
  );

  return (
    <div className="App">
      <CookieContext.Provider value={cookieManager}>
        <Suspense fallback={<div>Loading...</div>}>
          <AlertsProvider>
            {MainOfCurrentApp && (
              <AppContext.Provider value={settingsForApps}>
                <MainOfCurrentApp app={settingsForApps}>
                  {children}
                </MainOfCurrentApp>
              </AppContext.Provider>
            )}
          </AlertsProvider>
        </Suspense>
      </CookieContext.Provider>
    </div>
  );
}

export default App;
