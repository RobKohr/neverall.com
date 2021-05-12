import "./App.css";
import { Router, Link, Location } from "@reach/router";
import { domainNameAppMapping } from "./constants";
import { lazy, Suspense } from "react";

function App({ children }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Location>
        {(props) => {
          const app =
            domainNameAppMapping[props.location.hostname] ||
            domainNameAppMapping.default;

          const Main = lazy(() => import(`./sites/${app.name}/Main`));

          return (
            <>
              {Main && (
                <Main app={app} location={props.location}>
                  {children}
                </Main>
              )}
            </>
          );
        }}
      </Location>
    </Suspense>
  );
}

export default App;
