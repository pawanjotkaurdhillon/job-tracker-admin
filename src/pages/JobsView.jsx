import React from "react";
import { useDispatch } from "react-redux";
import { deleteJob } from "../store/slices/jobsSlice";
import { addActivityLog } from "../store/slices/activitySlice";
import { buildActivityMessage } from "../utils";
import { useFilteredJobs } from "../hooks";
import JobRow from "../components/Jobs/JobRow";
import JobsToolbar from "../components/Jobs/JobsToolbar";

const JobsView = ({ onAdd, onEdit }) => {
  const dispatch = useDispatch();
  const filteredJobs = useFilteredJobs();

  const handleDelete = (id) => {
    const job = filteredJobs.find((j) => j.id === id);
    if (window.confirm(`Delete application at ${job?.company}?`)) {
      dispatch(deleteJob(id));
      dispatch(
        addActivityLog({
          text: buildActivityMessage("delete", job),
          time: "just now",
          icon: "arrow",
        })
      );
    }
  };

  return (
    <div>
      <JobsToolbar onAdd={onAdd} />

      <div className="small text-muted mb-2">
        {filteredJobs.length} application{filteredJobs.length !== 1 ? "s" : ""}
      </div>

      <div
        className="table-responsive rounded"
        style={{ border: "1px solid var(--border)" }}
      >
        <table
          className="table table-sm table-hover mb-0"
          style={{ color: "var(--text-primary)" }}
        >
          <thead
            style={{
              background: "var(--thead-bg)",
              borderBottom: "2px solid var(--border)",
            }}
          >
            <tr>
              <th className="small fw-semibold">Company</th>
              <th className="small fw-semibold">Role</th>
              <th className="small fw-semibold">Status</th>
              <th className="small fw-semibold">Priority</th>
              <th className="small fw-semibold">Applied</th>
              <th className="small fw-semibold">Deadline</th>
              <th className="small fw-semibold">Salary</th>
              <th className="small fw-semibold">Tags</th>
              <th className="small fw-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center text-muted py-5">
                  No applications found. Try adjusting filters or add a new one.
                </td>
              </tr>
            ) : (
              filteredJobs.map((job) => (
                <JobRow
                  key={job.id}
                  job={job}
                  onEdit={onEdit}
                  onDelete={handleDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobsView;
