import React from "react";
import JobList from "./components/JobList";
import "./App.css";

const dummyJobs = [
  {
    title: "Frontend Developer",
    company: "Tech Corp",
    location: "Remote",
    posted_date: "2025-09-20",
    job_type: "Full-time",
    tags: ["React", "JavaScript", "CSS"],
    created_at: "2025-09-18",
    link: "https://example.com/apply1",
  },

  {
    title: "DevOps Engineer",
    company: "CloudOps",
    location: "London, UK",
    posted_date: "2025-09-25",
    job_type: "Full-time",
    tags: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    created_at: "2025-09-21",
    link: "https://example.com/apply4",
  },
  {
    title: "Backend Developer",
    company: "CodeWorks",
    location: "New York, USA",
    posted_date: "2025-09-22",
    job_type: "Part-time",
    tags: ["Node.js", "Express", "PostgreSQL"],
    created_at: "2025-09-19",
    link: "https://example.com/apply2",
  },
  {
    title: "UI/UX Designer",
    company: "Designify",
    location: "Berlin, Germany",
    posted_date: "2025-09-21",
    job_type: "Contract",
    tags: ["Figma", "Prototyping", "Wireframes"],
    created_at: "2025-09-20",
    link: "https://example.com/apply3",
  },
];

export default function App() {
  return (
    <div className="app">
      <h1 className="main-title">Available Jobs</h1>
      <JobList />
    </div>
  );
}
