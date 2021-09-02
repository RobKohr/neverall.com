import { AppBar, Tab, Tabs } from "@material-ui/core";
import { Link, useLocation } from "@reach/router";
import React from "react";

export function Nav({ routes, role, navId = "main" }) {
  const location = useLocation();
  return (
    <nav id={navId}>
      <AppBar position="static">
        <Tabs aria-label="simple tabs example">
          {routes
            .filter(({ nav }) => nav === navId)
            .map((route) => renderRouteLink({ route, role, location }))}
        </Tabs>
      </AppBar>
    </nav>
  );
}

export function createRoute(props) {
  const { route, role } = props;

  if (!isRouteAllowed({ route, role })) {
    return null;
  }
  if (route.externalLink) {
    return null;
  }
  const { path, component: Component } = route;
  if (!path || !Component) {
    return;
  }

  delete props.route; // this is decomposed into component props

  return (
    <Component
      key={route.path}
      {...{
        role,
        ...route,
        ...props,
      }}
    />
  );
}

function renderRouteLink({ route, role, location }) {
  if (!isRouteAllowed({ route, role })) {
    return null;
  }
  const { label, to } = route;
  const active = to === location.pathname;
  return (
    <div key={label} className={`nav-tab-container${active ? " active" : ""}`}>
      {route.externalLink && (
        <a href={to} style={{ color: "white" }}>
          <Tab label={label} value={0} />
        </a>
      )}
      {!route.externalLink && (
        <Link to={to} style={{ color: "white" }}>
          <Tab label={label} />
        </Link>
      )}
    </div>
  );
}

function isRouteAllowed({ route, role }) {
  role = role || "logged-out";
  if (process.env[`REACT_APP_SKIP_${route.pageId.toUpperCase()}`]) {
    return false;
  }

  if (!route.roles) {
    return true; // we don't care about the role for this route
  }

  if (route.roles.includes(role)) {
    return true; // this is one of the allowed roles for the route
  }
  return false;
}
