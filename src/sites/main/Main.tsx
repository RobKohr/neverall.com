import React from "react";
//import { ReactComponent as Logo } from "./neverall-logo.svg";
import { apps } from "../../constants";
import { Link, Routes, Route } from "react-router-dom";
interface Props {
  app: {
    name: string;
    title: string;
  };
}

const Home = ({ app }: Props) => (
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
        const app = apps[key];
        const { name, title } = app;
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

export default function Main(props: Props) {
  return (
    <div>
      <div>{/* <Logo style={{ fill: "white" }} /> */}</div>
      <nav>
        <Link to="/">Home</Link> <Link to="dashboard">Dashboard</Link>
      </nav>
      <Routes>
        <Route element={<Home {...props} />} />
        <Route element={<Dashboard />} />
      </Routes>
    </div>
  );
}
