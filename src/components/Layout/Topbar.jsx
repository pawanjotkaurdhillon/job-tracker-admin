import React from "react";
import { useSelector } from "react-redux";
import { selectActiveView } from "../../store/slices/uiSlice";
import { selectJobStats } from "../../store/slices/jobsSlice";

const VIEW_TITLES = {
  dashboard: "📊 Dashboard",
  jobs: "📋 All Applications",
  kanban: "🗂 Kanban Board",
  reports: "📈 Reports & Info",
};

const Topbar = ({ onAddJob }) => {
  const activeView = useSelector(selectActiveView);
  const stats = useSelector(selectJobStats);

  return (
    <div className="d-flex align-items-center justify-content-between mb-4">
      <div>
        <h4
          className="mb-0 fw-bold"
          style={{ color: "var(--text-primary)" }}
        >
          {VIEW_TITLES[activeView]}
        </h4>
        <p className="small mb-0" style={{ color: "var(--text-primary)", opacity: 0.65 }}>
  {stats.total} total · {stats.interviews} interviews · {stats.offers} offers
</p>
      </div>
      <button className="btn btn-sm btn-primary px-3" onClick={onAddJob}>
        + New Application
      </button>
    </div>
  );
};

export default Topbar;
