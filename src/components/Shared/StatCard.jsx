import React from "react";

const StatCard = ({ label, value, icon, color, sub }) => (
  <div className="col-6 col-md-3">
    <div
      className="card border-0 shadow-sm h-100 stat-card"
      style={{
        borderLeft: `4px solid var(--bs-${color})`,
        background: "var(--card-bg)",
        transition: "transform 0.2s",
      }}
    >
      <div className="card-body d-flex align-items-center gap-3">
        <div className={`text-${color}`} style={{ fontSize: "2rem" }}>
          {icon}
        </div>
        <div>
          <div
            className="fw-bold fs-4 lh-1"
            style={{ color: "var(--text-primary)" }}
          >
            {value}
          </div>
          <div className="text-muted small">{label}</div>
          {sub && (
            <div className="text-muted" style={{ fontSize: "0.7rem" }}>
              {sub}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default StatCard;
