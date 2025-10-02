// JobList.jsx
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import JobCard from "./JobCard";
import JobForm from "./JobForm";
import JobActionBar from "./JobActionBar";
import { handleDeleteJob } from "./DeleteJob";
import { handleAddEditJob } from "./AddEditJob";
import { filterSortJobs } from "./FilterSortJob";

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

  useEffect(() => {
    loadJobs();
  }, [searchParams]); 

useEffect(() => {
  if (jobListRef.current && jobs.length > 0) {
    jobListRef.current.scrollIntoView({ behavior: "auto" });
  }
}, [jobs]);


  // Update URL params
  const updateParams = (newValues) => {
    const params = {};

    if (search) params.title = search;
    if (filterType) params.job_type = filterType;
    if (sortBy) params.sort_by = sortBy;
    if (sortOrder) params.sort_order = sortOrder;

    Object.assign(params, newValues);
    setSearchParams(params);
  };

  // Handlers
const handleSearch = (value) => updateParams({ title: value });
const handleFilter = (value) => updateParams({ job_type: value });
const handleSort = ({ sortBy, sortOrder }) =>
  updateParams({ sort_by: sortBy, sort_order: sortOrder });


  const handleAdd = () => {
    setEditingJob(null);
    setShowForm(true);
  };

  const reload = () => loadJobs();

  const handleSubmit = async (payload) => {
    await handleAddEditJob(editingJob, payload, reload, () => {
      setShowForm(false);
      setEditingJob(null);
    });
  };

  const handleDelete = (id) => handleDeleteJob(id, reload);
  const handleEdit = (job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  if (loading) return <p>Loading jobs...</p>;

  return (
    <>
      {showForm && (
        <JobForm
          initialData={editingJob}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
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
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onEdit={() => handleEdit(job)}
              onDelete={() => handleDelete(job.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default JobList;
