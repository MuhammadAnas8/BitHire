// components/ui/JobList.jsx
import React, { useRef } from "react";
import JobForm from "./JobForm";
import JobActionBar from "./JobActionBar";
import JobListContent from "./JobListContent";
import Pagination from "./Pagination";
import { useJobFilters } from "../logic/useJobFilter";
import { useJobData } from "../logic/useJobData";
import { useJobForm } from "../logic/useJobForm";

const JobList = () => {
  const jobListRef = useRef(null);

  // Custom hooks for state management
  const {
    filters,
    scrollPositionRef,
    handleSearch,
    handleFilter,
    handleSort,
    handlePageChange,
  } = useJobFilters();

  const { jobs, loading, pagination, loadJobs } = useJobData(
    filters,
    scrollPositionRef
  );

  const {
    editingJob,
    showForm,
    handleAdd,
    handleEdit,
    handleSubmit,
    handleDelete,
    handleCancel,
  } = useJobForm(loadJobs);

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading jobs...</p>
      </div>
    );
  }

  return (
    <>
      {showForm && (
        <JobForm
          initialData={editingJob}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

      <div className="jobs-container" ref={jobListRef}>
        <JobActionBar
          onSearchChange={handleSearch}
          onFilterChange={handleFilter}
          onSortChange={handleSort}
          onAddJob={handleAdd}
        />

        <JobListContent
          jobs={jobs}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <Pagination pagination={pagination} onPageChange={handlePageChange} />
      </div>
    </>
  );
};

export default JobList;