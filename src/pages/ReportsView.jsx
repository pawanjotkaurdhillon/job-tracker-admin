import React from "react";
import { useSelector } from "react-redux";
import { selectAllJobs, selectJobStats } from "../store/slices/jobsSlice";
import { STATUS, PRIORITY } from "../constants";
import StatusBadge from "../components/Shared/StatusBadge";

const ReportsView = () => {
  const jobs = useSelector(selectAllJobs);
  const stats = useSelector(selectJobStats);

  const byStatus = STATUS.map((s) => ({
    status: s,
    count: jobs.filter((j) => j.status === s).length,
    pct: stats.total > 0 ? Math.round((jobs.filter((j) => j.status === s).length / stats.total) * 100) : 0,
  }));

  const byPriority = PRIORITY.map((p) => ({
    priority: p,
    count: jobs.filter((j) => j.priority === p).length,
  }));

  const topTags = Object.entries(
    jobs.flatMap((j) => j.tags || []).reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  const remoteCount = jobs.filter((j) =>
    j.location?.toLowerCase().includes("remote")
  ).length;

  return (
    <div className="row g-4">
      {/* Status Breakdown */}
      <div className="col-md-6">
        <div
          className="card border-0 shadow-sm h-100"
          style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
        >
          <div className="card-body">
            <h6 className="fw-bold mb-3" style={{ color: "var(--text-primary)" }}>
              📊 Status Breakdown
            </h6>
            <table className="table table-sm mb-0" style={{ color: "var(--text-primary)" }}>
              <thead>
                <tr style={{ borderColor: "var(--border)" }}>
                  <th className="small text-muted fw-normal">Status</th>
                  <th className="small text-muted fw-normal">Count</th>
                  <th className="small text-muted fw-normal">Share</th>
                </tr>
              </thead>
              <tbody>
                {byStatus.map(({ status, count, pct }) => (
                  <tr key={status} style={{ borderColor: "var(--border)" }}>
                    <td><StatusBadge status={status} /></td>
                    <td className="fw-semibold">{count}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div
                          className="progress flex-grow-1"
                          style={{ height: 6, background: "var(--border)", minWidth: 60 }}
                        >
                          <div
                            className="progress-bar bg-primary"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="small text-muted">{pct}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
                <tr style={{ borderColor: "var(--border)", borderTop: "2px solid var(--border)" }}>
                  <td className="fw-bold small">Total</td>
                  <td className="fw-bold">{stats.total}</td>
                  <td className="small text-muted">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="col-md-6 d-flex flex-column gap-3">
        {/* Key Metrics */}
        <div
          className="card border-0 shadow-sm"
          style={{ background: "var(--card-bg)" }}
        >
          <div className="card-body">
            <h6 className="fw-bold mb-3" style={{ color: "var(--text-primary)" }}>
              🎯 Key Metrics
            </h6>
            <div className="row g-2">
              {[
                { label: "Response Rate", value: `${stats.responseRate}%`, color: "text-info" },
                { label: "Interview Rate", value: `${stats.total > 0 ? Math.round((stats.interviews / stats.total) * 100) : 0}%`, color: "text-warning" },
                { label: "Offer Rate", value: `${stats.total > 0 ? Math.round((stats.offers / stats.total) * 100) : 0}%`, color: "text-success" },
                { label: "Remote Jobs", value: `${remoteCount}`, color: "text-primary" },
              ].map(({ label, value, color }) => (
                <div key={label} className="col-6">
                  <div
                    className="rounded p-2 text-center"
                    style={{ background: "var(--tag-bg)" }}
                  >
                    <div className={`fw-bold fs-5 ${color}`}>{value}</div>
                    <div className="text-muted" style={{ fontSize: "0.7rem" }}>{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Priority Split */}
        <div
          className="card border-0 shadow-sm"
          style={{ background: "var(--card-bg)" }}
        >
          <div className="card-body">
            <h6 className="fw-bold mb-2" style={{ color: "var(--text-primary)" }}>
              🔥 Priority Split
            </h6>
            <div className="d-flex gap-3">
              {byPriority.map(({ priority, count }) => (
                <div key={priority} className="text-center">
                  <div
                    className="fw-bold"
                    style={{
                      color: priority === "High" ? "#ef4444" : priority === "Medium" ? "#f59e0b" : "#22c55e",
                      fontSize: "1.4rem",
                    }}
                  >
                    {count}
                  </div>
                  <div className="text-muted" style={{ fontSize: "0.72rem" }}>{priority}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Tags */}
        <div
          className="card border-0 shadow-sm flex-grow-1"
          style={{ background: "var(--card-bg)" }}
        >
          <div className="card-body">
            <h6 className="fw-bold mb-2" style={{ color: "var(--text-primary)" }}>
              🏷 Top Tags
            </h6>
            <div className="d-flex flex-wrap gap-2">
              {topTags.length === 0 && (
                <span className="text-muted small">No tags yet</span>
              )}
              {topTags.map(([tag, count]) => (
                <span
                  key={tag}
                  className="badge rounded-pill d-flex align-items-center gap-1"
                  style={{
                    background: "var(--tag-bg)",
                    color: "var(--text-primary)",
                    fontSize: "0.72rem",
                    padding: "4px 10px",
                  }}
                >
                  {tag}
                  <span
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      background: "#6366f1",
                      color: "white",
                      width: 16,
                      height: 16,
                      fontSize: "0.6rem",
                    }}
                  >
                    {count}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Info */}
      <div className="col-12">
        <div
          className="card border-0 shadow-sm"
          style={{ background: "var(--card-bg)" }}
        >
          <div className="card-body">
            <h6 className="fw-bold mb-2" style={{ color: "var(--text-primary)" }}>
              🛠 Tech Stack
            </h6>
            <p className="small text-muted mb-2">
              This application demonstrates professional Redux Toolkit architecture:
            </p>
            <div className="d-flex flex-wrap gap-2">
              {[
                "React 18", "Redux Toolkit", "createSlice", "configureStore",
                "useSelector", "useDispatch", "Custom Hooks", "Bootstrap 5",
                "Memoized Selectors", "Component Composition",
              ].map((tech) => (
                <span
                  key={tech}
                  className="badge"
                  style={{
                    background: "var(--tag-bg)",
                    color: "var(--text-primary)",
                    fontSize: "0.72rem",
                    padding: "4px 10px",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsView;
