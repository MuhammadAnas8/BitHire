import React from "react";
import JobList from "./components/JobList";
import "./App.css";
import HeroSection from "./components/HeroSection";
export default function App() {
  return (
    <div className="app">
      <HeroSection />
      <h1 className="main-title">Available Jobs</h1>
      <JobList />
    </div>
  );
}
