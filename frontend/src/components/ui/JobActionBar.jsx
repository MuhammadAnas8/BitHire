// JobActionBar.jsx
import React, { useState } from "react";
import "../../styles/JobActionBar.css";
import { FaSearch } from "react-icons/fa";

const JobActionBar = ({ onSearchChange, onAddJob, onFilterChange, onSortChange }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearchChange(query); // trigger only when button clicked
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // also allow Enter key to search
    }
  };

  return (
    <div className="job-action-bar">
      {/* Search */}
      <div className="search-bar job-search">
        <input
          type="text"
          placeholder="Search jobs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)} // local state only
          onKeyDown={handleKeyPress}
          className="search-input"
        />
        <button className="search-btn" onClick={handleSearch}>
          <FaSearch /> Search
        </button>
      </div>

      {/* Filter, Sort, Add */}
      <div className="job-controls">
        <select className="job-select" onChange={(e) => onFilterChange(e.target.value)}>
          <option value="">Filter</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Contract">Contract</option>
        </select>

<select
  className="job-select"
  onChange={(e) => {
    const value = e.target.value;
    let sortBy = "";
    let sortOrder = "";

    if (value === "date_desc") {
      sortBy = "date_posted"; sortOrder = "desc";
    } else if (value === "date_asc") {
      sortBy = "date_posted"; sortOrder = "asc";
    } else if (value === "title_asc") {
      sortBy = "title"; sortOrder = "asc";
    } else if (value === "title_desc") {
      sortBy = "title"; sortOrder = "desc";
    }

    onSortChange({ sortBy, sortOrder });
  }}
>
  <option value="">Sort</option>
  <option value="date_desc">Newest First</option>
  <option value="date_asc">Oldest First</option>
  <option value="title_asc">Title A–Z</option>
  <option value="title_desc">Title Z–A</option>
</select>


        <button onClick={onAddJob} className="btn">
          + Add Job
        </button>
      </div>
    </div>
  );
};

export default JobActionBar;
