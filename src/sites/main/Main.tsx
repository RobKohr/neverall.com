import React from "react";
//import { ReactComponent as Logo } from "./neverall-logo.svg";
import { apps } from "../../appSettings";
import { Link, Routes, Route } from "react-router-dom";
import { Error404 } from "pages/Error404";
import A from "components/A";
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
            <A absolute to={`${name}`}>
              {title}
            </A>
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
  console.log("here");
  return (
    <div>
      <div>{/* <Logo style={{ fill: "white" }} /> */}</div>
      <nav>
        <A to="/">Home</A> <A to="dashboard">Dashboard</A>
      </nav>
      <Routes>
        <Route path="/" element={<Home {...props} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}
