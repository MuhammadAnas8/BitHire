// components/logic/useJobFilters.js
import { useSearchParams } from "react-router-dom";
import { useRef } from "react";

export const useJobFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const scrollPositionRef = useRef(0);

  const filters = {
    search: searchParams.get("title") || "",
    filterType: searchParams.get("job_type") || "",
    sortBy: searchParams.get("sort_by") || "date_posted",
    sortOrder: searchParams.get("sort_order") || "desc",
    currentPage: parseInt(searchParams.get("page") || "1", 10),
    perPage: parseInt(searchParams.get("per_page") || "15", 10),
  };

  const updateParams = (newValues, resetPage = true) => {
    scrollPositionRef.current = window.scrollY;

    const params = new URLSearchParams(searchParams);

    // Reset to page 1 when filtering/sorting/searching
    if (resetPage && !newValues.page) {
      params.set("page", "1");
    }

    Object.entries(newValues).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    setSearchParams(params, { replace: true });
  };

  const handleSearch = (title) => {
    updateParams({ title }, true);
  };

  const handleFilter = (job_type) => {
    updateParams({ job_type }, true);
  };

  const handleSort = ({ sortBy, sortOrder }) => {
    updateParams({ sort_by: sortBy, sort_order: sortOrder }, true);
  };

  const handlePageChange = (newPage) => {
    scrollPositionRef.current = 0; // Scroll to top on page change
    updateParams({ page: newPage.toString() }, false);
  };

  return {
    filters,
    scrollPositionRef,
    handleSearch,
    handleFilter,
    handleSort,
    handlePageChange,
  };
};