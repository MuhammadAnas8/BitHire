import { deleteJob } from "../../api";

export async function handleDeleteJob(id, reloadCallback) {
  if (window.confirm("Are you sure you want to delete this job?")) {
    await deleteJob(id);
    reloadCallback(); 
  }
}
