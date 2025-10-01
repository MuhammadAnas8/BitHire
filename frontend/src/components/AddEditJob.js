// src/jobs/addEdit.js
import { createJob, updateJob } from "../api";

export async function handleAddEditJob(editingJob, payload, reloadCallback, closeForm) {
  if (editingJob) {
    await updateJob(editingJob.id, payload);
  } else {
    await createJob(payload);
  }
  closeForm();
  reloadCallback();
}
