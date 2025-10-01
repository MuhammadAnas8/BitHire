import JobCard from "./JobCard";
import React, { useEffect, useState } from "react";
import { fetchAllJobs } from "../api.js";
import JobForm from "./JobForm.jsx";
import{createJob, updateJob, deleteJob} from "../api.js";   
const JobList = () => {
      const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
   const [editingJob, setEditingJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
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
   
  useEffect(() => {

    loadJobs();
  }, []);

  const handleAdd = () => {
    setEditingJob(null);
    setShowForm(true);
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const handleSubmit = async (payload) => {
    if (editingJob) {
      await updateJob(editingJob.id, payload);
    } else {
        console.log(payload);
      await createJob(payload);
    }
    setShowForm(false);
    setEditingJob(null);
    loadJobs();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      await deleteJob(id);
      loadJobs();
    }
  }

  if (loading) return <p>Loading jobs...</p>;

  return (
    <>
 {showForm ? (
        <JobForm
          initialData={editingJob}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      ) : (
          <button
            onClick={handleAdd}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + Add Job
          </button>
        )}
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
    </>

  );
};

export default JobList;
