import React from "react";
import PriorityDot from "../Shared/PriorityDot";

const KanbanCard = ({ job, onEdit }) => (
  <div
    className="kanban-card p-2 mb-2 rounded"
    style={{
      background: "var(--card-bg)",
      border: "1px solid var(--border)",
      cursor: "pointer",
      transition: "transform 0.15s, box-shadow 0.15s",
    }}
    onClick={() => onEdit(job)}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "none";
    }}
  >
    <div className="d-flex justify-content-between align-items-start mb-1">
      <span className="fw-semibold small" style={{ color: "var(--text-primary)" }}>
        {job.company}
      </span>
      <PriorityDot priority={job.priority} />
    </div>
    <div className="text-muted" style={{ fontSize: "0.72rem" }}>
      {job.role}
    </div>
    {job.salary && (
      <div className="text-muted mt-1" style={{ fontSize: "0.68rem" }}>
        {job.salary}
      </div>
    )}
    <div className="d-flex flex-wrap gap-1 mt-1">
      {job.tags?.slice(0, 2).map((tag) => (
        <span
          key={tag}
          className="badge rounded-pill"
          style={{
            background: "var(--tag-bg)",
            color: "var(--text-muted)",
            fontSize: "0.6rem",
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

export default KanbanCard;
