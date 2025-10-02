// logic/FilterSortJob.js
export const filterSortJobs = async ({ search, filterType, sortBy, sortOrder, page = 1, per_page = 15 }) => {
  try {
    const params = new URLSearchParams();

    if (search) params.append("title", search);
    if (filterType) params.append("job_type", filterType);
    if (sortBy) params.append("sort_by", sortBy);
    if (sortOrder) params.append("sort_order", sortOrder);
    params.append("page", page);
    params.append("per_page", per_page);

    const response = await fetch(`http://localhost:5000/jobs?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }

    const data = await response.json();
    return data; // Returns { items, page, per_page, total, pages }
  } catch (error) {
    console.error("Error in filterSortJobs:", error);
    throw error;
  }
};