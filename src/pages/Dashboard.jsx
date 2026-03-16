import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveView } from "../store/slices/uiSlice";
import { selectJobStats, selectAllJobs, selectUpcomingDeadlines } from "../store/slices/jobsSlice";
import { selectRecentLogs } from "../store/slices/activitySlice";
import { STATUS, STATUS_COLORS } from "../constants";
import StatCard from "../components/Shared/StatCard";

const ACTIVITY_ICONS = { trophy: "🏆", calendar: "📅", send: "📤", arrow: "→" };

const Dashboard = () => {
  const dispatch = useDispatch();
  const stats = useSelector(selectJobStats);
  const jobs = useSelector(selectAllJobs);
  const upcoming = useSelector(selectUpcomingDeadlines);
  const recentLogs = useSelector(selectRecentLogs(4));

  const statusCounts = STATUS.map((s) => ({
    status: s,
    count: jobs.filter((j) => j.status === s).length,
  }));
  const maxCount = Math.max(...statusCounts.map((s) => s.count), 1);

  return (
    <div>
      {/* Stat Cards */}
      <div className="row g-3 mb-4">
        <StatCard label="Total Applications" value={stats.total} icon="📋" color="primary" />
        <StatCard
          label="Interviews"
          value={stats.interviews}
          icon="🎤"
          color="warning"
          sub={`${stats.total > 0 ? Math.round((stats.interviews / stats.total) * 100) : 0}% rate`}
        />
        <StatCard label="Offers" value={stats.offers} icon="🏆" color="success" sub="Active offers" />
        <StatCard label="Response Rate" value={`${stats.responseRate}%`} icon="📈" color="info" />
      </div>

      <div className="row g-3">
        {/* Pipeline Chart */}
        <div className="col-md-7">
          <div
            className="card border-0 shadow-sm h-100"
            style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
          >
            <div className="card-body">
              <h6 className="fw-bold mb-3" style={{ color: "var(--text-primary)" }}>
                📊 Pipeline Overview
              </h6>
              {statusCounts.map(({ status, count }) => (
                <div key={status} className="mb-2">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="small" style={{ color: "var(--text-primary)" }}>
                      {status}
                    </span>
                    <span className="small text-muted">{count}</span>
                  </div>
                  <div className="progress" style={{ height: 8 }}>
                    <div
                      className={`progress-bar bg-${STATUS_COLORS[status]}`}
                      style={{
                        width: `${(count / maxCount) * 100}%`,
                        transition: "width 0.6s ease",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="col-md-5 d-flex flex-column gap-3">
          {/* Upcoming Deadlines */}
          <div
            className="card border-0 shadow-sm"
            style={{ background: "var(--card-bg)" }}
          >
            <div className="card-body">
              <h6 className="fw-bold mb-2" style={{ color: "var(--text-primary)" }}>
                ⏰ Upcoming Deadlines
              </h6>
              {upcoming.length === 0 ? (
                <p className="text-muted small mb-0">No upcoming deadlines</p>
              ) : (
                upcoming.map((job) => (
                  <div
                    key={job.id}
                    className="d-flex justify-content-between align-items-center py-1"
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <div>
                      <div className="small fw-semibold" style={{ color: "var(--text-primary)" }}>
                        {job.company}
                      </div>
                      <div className="text-muted" style={{ fontSize: "0.7rem" }}>
                        {job.role}
                      </div>
                    </div>
                    <span className="badge bg-danger rounded-pill small">
                      {job.deadline}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Activity Feed */}
          <div
            className="card border-0 shadow-sm flex-grow-1"
            style={{ background: "var(--card-bg)" }}
          >
            <div className="card-body">
              <h6 className="fw-bold mb-2" style={{ color: "var(--text-primary)" }}>
                🕐 Recent Activity
              </h6>
              {recentLogs.map((log) => (
                <div key={log.id} className="d-flex gap-2 align-items-start mb-2">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: 24,
                      height: 24,
                      background: "var(--tag-bg)",
                      fontSize: "0.65rem",
                      flexShrink: 0,
                    }}
                  >
                    {ACTIVITY_ICONS[log.icon] || "→"}
                  </div>
                  <div>
                    <div
                      className="small"
                      style={{ color: "var(--text-primary)", lineHeight: 1.3 }}
                    >
                      {log.text}
                    </div>
                    <div className="text-muted" style={{ fontSize: "0.65rem" }}>
                      {log.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-3 text-center">
        <button
          className="btn btn-sm btn-outline-primary me-2"
          onClick={() => dispatch(setActiveView("jobs"))}
        >
          View All Jobs →
        </button>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => dispatch(setActiveView("kanban"))}
        >
          Open Kanban Board →
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
