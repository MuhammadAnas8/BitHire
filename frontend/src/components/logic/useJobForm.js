// components/logic/useJobForm.js
import { useState } from "react";
import { handleAddEditJob } from "./AddEditJob";
import { handleDeleteJob } from "./DeleteJob";

export const useJobForm = (loadJobs) => {
  const [editingJob, setEditingJob] = useState(null);
  const [showForm, setShowForm] = useState(false);

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

  const handleCancel = () => {
    setShowForm(false);
    setEditingJob(null);
  };

  return {
    editingJob,
    showForm,
    handleAdd,
    handleEdit,
    handleSubmit,
    handleDelete,
    handleCancel,
  };
};