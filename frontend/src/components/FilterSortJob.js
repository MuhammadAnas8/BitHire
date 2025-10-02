// src/components/FilterSortJob.js
import { fetchAllJobs } from "../api";

export const filterSortJobs = async ({ search, filterType, sort }) => {
  const params = {};

  // 🔍 Search only by title for now
  if (search) {
    params.title = search;
  }

  // 🏢 Filter (we map filterType to company/location/job_type depending on your backend)
  if (filterType) {
    params.location = filterType; 
  }

  // ↕️ Sorting
  if (sort === "date") {
    params.order_by = "date_posted";
  }
  if (sort === "title") {
    params.order_by = "title";
  }

  // call backend
  const data = await fetchAllJobs(params);
  return data.items;
};
