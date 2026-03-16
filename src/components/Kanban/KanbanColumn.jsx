import React from "react";
import { STATUS_COLORS } from "../../constants";
import KanbanCard from "./KanbanCard";

const KanbanColumn = ({ status, jobs, onEdit }) => (
  <div style={{ minWidth: 200, flex: "0 0 200px" }}>
    <div className="d-flex justify-content-between align-items-center mb-2">
      <span
        className={`badge bg-${STATUS_COLORS[status]} rounded-pill`}
        style={{ fontSize: "0.75rem" }}
      >
        {status}
      </span>
      <span className="text-muted small">{jobs.length}</span>
    </div>
    <div
      className="p-2 rounded"
      style={{
        background: "var(--kanban-col)",
        minHeight: 100,
        border: "1px solid var(--border)",
      }}
    >
      {jobs.map((job) => (
        <KanbanCard key={job.id} job={job} onEdit={onEdit} />
      ))}
      {jobs.length === 0 && (
        <div
          className="text-muted text-center"
          style={{ fontSize: "0.72rem", paddingTop: 24 }}
        >
          Empty
        </div>
      )}
    </div>
  </div>
);

export default KanbanColumn;
