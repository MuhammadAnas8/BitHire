// src/components/FilterSortJob.js
import { fetchAllJobs } from "../api";

export const filterSortJobs = async ({ search, filterType, sortBy, sortOrder }) => {
  const params = {};

  // Search
  if (search) params.title = search;

  // Filter
  if (filterType) params.job_type = filterType;  

  // Sorting
  if (sortBy) {
    params.sort_by = sortBy;
    params.sort_order = sortOrder || "desc";
  }

  const data = await fetchAllJobs(params);
  return data.items;
};
