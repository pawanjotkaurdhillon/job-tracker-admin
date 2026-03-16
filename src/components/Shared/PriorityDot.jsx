import React from "react";
import { PRIORITY_COLORS } from "../../constants";

const PriorityDot = ({ priority, showLabel = false }) => (
  <span className="d-inline-flex align-items-center gap-1">
    <span
      title={priority}
      style={{
        display: "inline-block",
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: PRIORITY_COLORS[priority] || "#ccc",
        flexShrink: 0,
      }}
    />
    {showLabel && (
      <span className="small text-muted">{priority}</span>
    )}
  </span>
);

export default PriorityDot;
