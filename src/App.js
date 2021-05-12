import "./App.scss";
import "./fontello/css/fontello.css";
import { Location } from "@reach/router";
import { domainNameAppMapping } from "./constants";
import React, { lazy, Suspense, useState } from "react";

export const StateContext = React.createContext();

function App({ children }) {
  const [state, setState] = useState({});
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Location>
          {(props) => {
            const appFromPathname = props.location.pathname.split("/")[1];
            const app =
              domainNameAppMapping[props.location.hostname] ||
              domainNameAppMapping[appFromPathname] ||
              domainNameAppMapping.default;

            setState({ app });
            const Main = lazy(() => import(`./sites/${app.name}/Main`));

            return (
              <StateContext.Provider value={state}>
                {Main && (
                  <Main app={app} location={props.location}>
                    {children}
                  </Main>
                )}
              </StateContext.Provider>
            );
          }}
        </Location>
      </Suspense>
    </div>
  );
}

export default App;
