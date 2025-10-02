import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import JobForm from "./JobForm";
import JobActionBar from "./JobActionBar";
import { handleDeleteJob } from "./DeleteJob";
import { handleAddEditJob } from "./AddEditJob";
import { filterSortJobs } from "./FilterSortJob"; 
import { useSearchParams } from "react-router-dom";


const JobList = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("title") || "";
  const filterType = searchParams.get("location") || "";
  const sort = searchParams.get("order_by") || "";

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingJob, setEditingJob] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const items = await filterSortJobs({ search, filterType, sort });
      setJobs(items);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [search, filterType, sort]);

  const reload = () => loadJobs();

  const handleSubmit = async (payload) => {
    await handleAddEditJob(editingJob, payload, reload, () => {
      setShowForm(false);
      setEditingJob(null);
    });
  };

  const handleDelete = (id) => {
    handleDeleteJob(id, reload);
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingJob(null);
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
      <div className="jobs-container">
<JobActionBar
  onSearchChange={(value) => {
    const params = {};
    if (value) params.title = value;
    if (filterType) params.location = filterType;
    if (sort) params.order_by = sort;
    setSearchParams(params);
  }}
  onFilterChange={(value) => {
    const params = {};
    if (search) params.title = search;
    if (value) params.location = value;
    if (sort) params.order_by = sort;
    setSearchParams(params);
  }}
  onSortChange={(value) => {
    const params = {};
    if (search) params.title = search;
    if (filterType) params.location = filterType;
    if (value) params.order_by = value;
    setSearchParams(params);
  }}
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
