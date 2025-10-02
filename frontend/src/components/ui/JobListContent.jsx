import React from "react";
import JobCard from "./JobCard";

const JobListContent = ({ jobs, onEdit, onDelete }) => {
  if (jobs.length === 0) {
    return (
      <div className="no-jobs">
        <p>No jobs found.</p>
      </div>
    );
  }

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onEdit={() => onEdit(job)}
          onDelete={() => onDelete(job.id)}
        />
      ))}
    </div>
  );
};

export default JobListContent;