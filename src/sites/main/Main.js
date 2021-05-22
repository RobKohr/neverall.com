import React from "react";
import { Router, Link } from "@reach/router";
import { ReactComponent as Logo } from "./neverall-logo.svg";

export default function Main(props) {
  return (
    <div>
      <div>
        <Logo style={{ fill: "white" }} />x{" "}
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

const Home = ({ app }) => (
  <div>
    <h2>Welcome {app.name}</h2>
    <Link to="/godot-asset-store">Godot Asset Store</Link>
  </div>
);

const Dashboard = () => (
  <div>
    <h2>Dashboard</h2>
  </div>
);
