import React from "react";
import { Router, Link } from "@reach/router";

export default function Main(props) {
  return (
    <div>
      <div>logo</div>
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
  </div>
);

const Dashboard = () => (
  <div>
    <h2>Dashboard</h2>
  </div>
);
