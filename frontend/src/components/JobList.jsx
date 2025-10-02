import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import JobForm from "./JobForm";

import { loadJobs } from "./helpers";
import { handleDeleteJob } from "./DeleteJob";
import { handleAddEditJob } from "./AddEditJob";
import JobActionBar from "./JobActionBar";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingJob, setEditingJob] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // load jobs initially
  useEffect(() => {
    loadJobs(setJobs, setLoading);
  }, []);

  const reload = () => loadJobs(setJobs, setLoading);

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
        onSearchChange={handleAdd}
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
