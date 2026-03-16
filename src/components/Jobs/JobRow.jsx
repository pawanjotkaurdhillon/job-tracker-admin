import React from "react";
import { useDispatch } from "react-redux";
import { cycleJobStatus } from "../../store/slices/jobsSlice";
import { addActivityLog } from "../../store/slices/activitySlice";
import { STATUS } from "../../constants";
import { buildActivityMessage } from "../../utils";
import StatusBadge from "../Shared/StatusBadge";
import PriorityDot from "../Shared/PriorityDot";
import { useIsDeadlineSoon } from "../../hooks";

const JobRow = ({ job, onEdit, onDelete }) => {
  const dispatch = useDispatch();
  const isDeadlineSoon = useIsDeadlineSoon(job.deadline);

  const handleCycleStatus = () => {
    dispatch(cycleJobStatus({ id: job.id, statuses: STATUS }));
    const updated = { ...job, status: STATUS[(STATUS.indexOf(job.status) + 1) % STATUS.length] };
    dispatch(
      addActivityLog({
        text: buildActivityMessage("status", updated),
        time: "just now",
        icon: "arrow",
      })
    );
  };

  return (
    <tr style={{ borderColor: "var(--border)" }}>
      <td>
        <div className="fw-semibold" style={{ color: "var(--text-primary)" }}>
          {job.company}
        </div>
        {job.url && (
          <a
            href={job.url}
            target="_blank"
            rel="noreferrer"
            className="text-muted"
            style={{ fontSize: "0.7rem" }}
          >
            ↗ link
          </a>
        )}
      </td>
      <td style={{ color: "var(--text-primary)" }}>
        <div>{job.role}</div>
        <div className="text-muted small">{job.location}</div>
      </td>
      <td>
        <StatusBadge status={job.status} onClick={handleCycleStatus} clickable />
      </td>
      <td>
        <PriorityDot priority={job.priority} showLabel />
      </td>
      <td className="small text-muted">{job.appliedDate}</td>
      <td>
        {job.deadline ? (
          <span
            className={`small ${isDeadlineSoon ? "text-danger fw-semibold" : "text-muted"}`}
          >
            {isDeadlineSoon ? "⚠️ " : ""}
            {job.deadline}
          </span>
        ) : (
          <span className="text-muted small">—</span>
        )}
      </td>
      <td className="small text-muted">{job.salary || "—"}</td>
      <td>
        <div className="d-flex gap-1 flex-wrap">
          {job.tags?.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="badge rounded-pill"
              style={{
                background: "var(--tag-bg)",
                color: "var(--text-muted)",
                fontSize: "0.65rem",
              }}
            >
              {tag}
            </span>
          ))}
          {job.tags?.length > 2 && (
            <span className="text-muted small">+{job.tags.length - 2}</span>
          )}
        </div>
      </td>
      <td>
        <div className="d-flex gap-1">
          <button
            className="btn btn-outline-primary"
            style={{ padding: "2px 8px", fontSize: "0.7rem" }}
            onClick={() => onEdit(job)}
          >
            Edit
          </button>
          <button
            className="btn btn-outline-danger"
            style={{ padding: "2px 8px", fontSize: "0.7rem" }}
            onClick={() => onDelete(job.id)}
          >
            Del
          </button>
        </div>
      </td>
    </tr>
  );
};

export default JobRow;
