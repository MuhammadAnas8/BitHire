import JobCard from "./JobCard";
import React, { useEffect, useState } from "react";
import { fetchAllJobs } from "../api.js";
const JobList = () => {
      const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchAllJobs();
        setJobs(data.items);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  if (loading) return <p>Loading jobs...</p>;
  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;
