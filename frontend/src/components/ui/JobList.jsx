// JobList.jsx
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import JobCard from "./JobCard";
import JobForm from "./JobForm";
import JobActionBar from "./JobActionBar";
import { handleDeleteJob } from "../logic/DeleteJob";
import { handleAddEditJob } from "../logic/AddEditJob";
import { filterSortJobs } from "../logic/FilterSortJob";

const JobList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Params
  const search = searchParams.get("title") || "";
  const filterType = searchParams.get("job_type") || "";
  const sortBy = searchParams.get("sort_by") || "date_posted";
  const sortOrder = searchParams.get("sort_order") || "desc";

  // State
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingJob, setEditingJob] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const jobListRef = useRef(null);
  const scrollPositionRef = useRef(0); // Store scroll position

  // Load Jobs
  const loadJobs = async () => {
    setLoading(true);
    try {
      const items = await filterSortJobs({ search, filterType, sortBy, sortOrder });
      setJobs(items);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load jobs when params change
  useEffect(() => {
    loadJobs();
  }, [search, filterType, sortBy, sortOrder]);

  // Restore scroll position after jobs load
  useEffect(() => {
    if (!loading) {
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollPositionRef.current);
      });
    }
  }, [loading]);

  // Update URL params and save scroll position
  const updateParams = (newValues) => {
    // Save current scroll position before updating params
    scrollPositionRef.current = window.scrollY;
    
    const params = new URLSearchParams(searchParams);
    
    // Update or delete params based on newValues
    Object.entries(newValues).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    // Update search params
    setSearchParams(params, { replace: true });
  };

  // Handlers
  const handleSearch = (title) => {
    updateParams({ title });
  };

  const handleFilter = (job_type) => {
    updateParams({ job_type });
  };

  const handleSort = ({ sortBy, sortOrder }) => {
    updateParams({ sort_by: sortBy, sort_order: sortOrder });
  };

  const handleAdd = () => {
    setEditingJob(null);
    setShowForm(true);
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const handleSubmit = async (payload) => {
    await handleAddEditJob(editingJob, payload, loadJobs, () => {
      setShowForm(false);
      setEditingJob(null);
    });
  };

  const handleDelete = async (id) => {
    try {
      await handleDeleteJob(id, loadJobs);
    } catch (err) {
      console.error("Error deleting job:", err);
    }
  };

  if (loading) return <p>Loading jobs...</p>;

  return (
    <>
      {showForm && (
        <JobForm
          initialData={editingJob}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingJob(null);
          }}
        />
      )}

      <div className="jobs-container" ref={jobListRef}>
        <JobActionBar
          onSearchChange={handleSearch}
          onFilterChange={handleFilter}
          onSortChange={handleSort}
          onAddJob={handleAdd}
        />

        <div className="job-list">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onEdit={() => handleEdit(job)}
                onDelete={() => handleDelete(job.id)}
              />
            ))
          ) : (
            <p>No jobs found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default JobList;