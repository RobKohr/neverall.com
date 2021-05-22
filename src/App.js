import "./App.scss";
import "./fontello/css/fontello.css";
import { Location } from "@reach/router";
import { domainNameAppMapping } from "./constants";
import React, { lazy, Suspense } from "react";
export const AppContext = React.createContext();

function App({ children }) {
  return (
    <div className="App">
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
              <>
                {MainOfCurrentApp && (
                  <AppContext.Provider value={app}>
                    <MainOfCurrentApp app={app} location={props.location}>
                      {children}
                    </MainOfCurrentApp>
                  </AppContext.Provider>
                )}
              </>
            );
          }}
        </Location>
      </Suspense>
    </div>
  );
}

export default App;
