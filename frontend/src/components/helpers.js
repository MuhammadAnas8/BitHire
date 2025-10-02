const loadJobs = async () => {
  setLoading(true);
  try {
    const params = Object.fromEntries(searchParams.entries());
    const items = await filterSortJobs(params); // FilterSortJob.js stays the same
    setJobs(items);
  } catch (err) {
    console.error("Error fetching jobs:", err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  loadJobs();
}, [searchParams]);  // 🔥 reload whenever URL query changes
