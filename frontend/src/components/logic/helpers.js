import { useEffect } from "react";
import { filterSortJobs } from "./FilterSortJob";
const loadJobs = async () => {
  setLoading(true);
  try {
    const params = Object.fromEntries(searchParams.entries());
    const items = await filterSortJobs(params); 
    setJobs(items);
  } catch (err) {
    console.error("Error fetching jobs:", err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  loadJobs();
}, [searchParams]);  
