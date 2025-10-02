// components/logic/useJobData.js
import { useState, useEffect } from "react";
import { filterSortJobs } from "./FilterSortJob";

export const useJobData = (filters, scrollPositionRef) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 15,
    total: 0,
    pages: 0,
  });

  const { search, filterType, sortBy, sortOrder, currentPage, perPage } = filters;

  const loadJobs = async () => {
    setLoading(true);
    try {
      const response = await filterSortJobs({
        search,
        filterType,
        sortBy,
        sortOrder,
        page: currentPage,
        per_page: perPage,
      });

      setJobs(response.items || []);
      setPagination({
        page: response.page,
        per_page: response.per_page,
        total: response.total,
        pages: response.pages,
      });
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // Load jobs when filters change
  useEffect(() => {
    loadJobs();
  }, [search, filterType, sortBy, sortOrder, currentPage, perPage]);

  // Restore scroll position after jobs load
  useEffect(() => {
    if (!loading) {
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollPositionRef.current);
      });
    }
  }, [loading, scrollPositionRef]);

  return {
    jobs,
    loading,
    pagination,
    loadJobs,
  };
};