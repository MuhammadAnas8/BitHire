import React from "react";
import "../styles/JobActionBar.css";
import { FaSearch } from "react-icons/fa";

const JobActionBar = ({ onSearchChange, onAddJob }) => {
  return (
    <div className="job-action-bar">
      {/* Search */}

      <div className="search-bar job-search">
       
              <input
        type="text"
        placeholder="Search jobs..."
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
        
      />
      <button className="search-btn">
<FaSearch /> Search
      </button>
       
      </div>


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
