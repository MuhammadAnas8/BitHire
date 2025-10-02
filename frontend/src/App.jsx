import React from "react";
import JobList from "./components/JobList";
import "./App.css";
export default function App() {
  return (
    <div className="app">
      <h1 className="main-title">Available Jobs</h1>
      <JobList />
    </div>
  );
}
