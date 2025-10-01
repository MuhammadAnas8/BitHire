// src/jobs/helpers.js
import { fetchAllJobs } from "../api";

export async function loadJobs(setJobs, setLoading) {
  try {
    const data = await fetchAllJobs();
    setJobs(data.items);
  } catch (err) {
    console.error("Error fetching jobs:", err);
  } finally {
    setLoading(false);
  }
}
