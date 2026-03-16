import { useSelector, useDispatch } from "react-redux";
import { useMemo } from "react";
import { selectAllJobs } from "../store/slices/jobsSlice";
import { selectFilter, selectSort, selectSearch } from "../store/slices/uiSlice";
import { PRIORITY } from "../constants";

// Typed dispatch and selector hooks
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

// Filtered + sorted jobs derived from Redux state
export const useFilteredJobs = () => {
  const jobs = useSelector(selectAllJobs);
  const filter = useSelector(selectFilter);
  const sort = useSelector(selectSort);
  const search = useSelector(selectSearch);

  return useMemo(() => {
    let result = jobs.filter((j) => {
      const matchesFilter = filter === "All" || j.status === filter;
      const matchesSearch =
        !search ||
        `${j.company} ${j.role} ${j.location} ${j.tags?.join(" ")}`
          .toLowerCase()
          .includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });

    result = [...result].sort((a, b) => {
      if (sort === "company") return a.company.localeCompare(b.company);
      if (sort === "status") return a.status.localeCompare(b.status);
      if (sort === "priority")
        return PRIORITY.indexOf(b.priority) - PRIORITY.indexOf(a.priority);
      return new Date(b.appliedDate || 0) - new Date(a.appliedDate || 0);
    });

    return result;
  }, [jobs, filter, sort, search]);
};

// Check if a deadline is approaching (within 3 days)
export const useIsDeadlineSoon = (deadline) => {
  return useMemo(() => {
    if (!deadline) return false;
    const diff = new Date(deadline) - new Date();
    return diff > 0 && diff < 3 * 86400000;
  }, [deadline]);
};
