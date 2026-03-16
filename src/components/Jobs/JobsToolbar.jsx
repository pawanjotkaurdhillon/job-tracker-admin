import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilter,
  setSort,
  setSearch,
  selectFilter,
  selectSort,
  selectSearch,
  resetFilters,
} from "../../store/slices/uiSlice";
import { selectAllJobs } from "../../store/slices/jobsSlice";
import { STATUS, SORT_OPTIONS } from "../../constants";
import { exportJobsToCSV } from "../../utils";

const JobsToolbar = ({ onAdd }) => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const sort = useSelector(selectSort);
  const search = useSelector(selectSearch);
  const jobs = useSelector(selectAllJobs);

  return (
    <div>
      {/* Main toolbar row */}
      <div className="d-flex flex-wrap gap-2 mb-3 align-items-center">
        <input
          className="form-control form-control-sm"
          style={{ maxWidth: 220, background: "var(--input-bg)", color: "var(--text-primary)", border: "1px solid var(--border)" }}
          placeholder="🔍  Search jobs..."
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
        <select
          className="form-select form-select-sm"
          style={{ maxWidth: 160, background: "var(--input-bg)", color: "var(--text-primary)", border: "1px solid var(--border)" }}
          value={sort}
          onChange={(e) => dispatch(setSort(e.target.value))}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              Sort: {opt.label}
            </option>
          ))}
        </select>
        {(filter !== "All" || search || sort !== "appliedDate") && (
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => dispatch(resetFilters())}
          >
            ✕ Reset
          </button>
        )}
        <div className="ms-auto d-flex gap-2">
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => exportJobsToCSV(jobs)}
          >
            ⬇ Export CSV
          </button>
          <button className="btn btn-sm btn-primary" onClick={onAdd}>
            + Add Job
          </button>
        </div>
      </div>

      {/* Status filter pills */}
      <div className="d-flex gap-2 flex-wrap mb-3">
        {["All", ...STATUS].map((s) => (
          <button
            key={s}
            onClick={() => dispatch(setFilter(s))}
            className={`btn rounded-pill ${filter === s ? "btn-primary" : "btn-outline-secondary"}`}
            style={{ padding: "2px 12px", fontSize: "0.75rem" }}
          >
            {s}
            {s !== "All" && (
              <span className="ms-1">
                ({jobs.filter((j) => j.status === s).length})
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default JobsToolbar;
