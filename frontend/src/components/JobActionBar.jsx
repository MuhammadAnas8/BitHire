import React from "react";
import "../styles/JobActionBar.css";

const JobActionBar = ({ onSearchChange, onAddJob }) => {
  return (
    <div className="job-action-bar">
      {/* Search */}
      <input
        type="text"
        placeholder="Search jobs..."
        onChange={(e) => onSearchChange(e.target.value)}
        className="job-search"
      />

      {/* Filter, Sort, Add */}
      <div className="job-controls">
        <select className="job-select">
          <option value="">Filter</option>
          <option value="remote">Remote</option>
          <option value="onsite">Onsite</option>
        </select>

        <select className="job-select">
          <option value="">Sort</option>
          <option value="date">Date</option>
          <option value="title">Title</option>
        </select>

        <button onClick={onAddJob} className="btn">
          + Add Job
        </button>
      </div>
    </div>
  );
};

export default JobActionBar;
