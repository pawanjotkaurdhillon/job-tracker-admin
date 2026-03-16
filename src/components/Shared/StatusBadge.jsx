import React from "react";
import { STATUS_COLORS } from "../../constants";

const StatusBadge = ({ status, onClick, clickable = false }) => (
  <span
    className={`badge bg-${STATUS_COLORS[status] || "secondary"} rounded-pill`}
    onClick={onClick}
    title={clickable ? "Click to cycle status" : undefined}
    style={{
      cursor: clickable ? "pointer" : "default",
      fontSize: "0.72rem",
      border: "none",
    }}
  >
    {status}
  </span>
);

export default StatusBadge;
