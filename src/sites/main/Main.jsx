import React from "react";
import { Router, Link } from "@reach/router";
import { ReactComponent as Logo } from "./neverall-logo.svg";
import { apps } from "../../constants";

const Home = ({ app }) => (
  <div>
    <h2>Welcome {app.name}</h2>
    <p>
      Neverall is a creative profit distribution network. Members pay a small
      monthly fee, and the majority of that fee gets distributed to various
      creators based upon the consumption of the creators works: music, videos,
      digital assets, games, etc all are worth a specific amount of points.
      Membership fees are split based upon the points that creators accrue
      during a month. Would you like to earn revenue on your creations? Sign up
      and let us know what you are looking to create.
    </p>
    <ul>
      {Object.keys(apps).map((key) => {
        const { name, title } = apps[key];
        if (name === "main") return <></>;
        return (
          <li>
            <Link to={`/${name}`}>{title}</Link>
          </li>
        );
      })}
    </ul>
  </div>
);

const Dashboard = () => (
  <div>
    <h2>Dashboard</h2>
  </div>
);

export default function Main(props) {
  return (
    <div>
      <div>
        <Logo style={{ fill: "white" }} />
      </div>
      <nav>
        <Link to="/">Home</Link> <Link to="dashboard">Dashboard</Link>
      </nav>
      <Router>
        <Home path="/" {...props} />
        <Dashboard path="dashboard" />
      </Router>
    </div>
  );
}
