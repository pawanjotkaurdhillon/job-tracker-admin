import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addJob, updateJob } from "./store/slices/jobsSlice";
import { addActivityLog } from "./store/slices/activitySlice";
import { selectActiveView, selectTheme } from "./store/slices/uiSlice";
import { buildActivityMessage } from "./utils";

import Sidebar from "./components/Layout/Sidebar";
import Topbar from "./components/Layout/Topbar";
import JobModal from "./components/Jobs/JobModal";

import Dashboard from "./pages/Dashboard";
import JobsView from "./pages/JobsView";
import KanbanView from "./pages/KanbanView";
import ReportsView from "./pages/ReportsView";

const THEME_VARS = {
  dark: {
    "--card-bg": "#1e2433",
    "--page-bg": "#141825",
    "--sidebar-bg": "#0f1119",
    "--border": "#2d3348",
    "--text-primary": "#e8ecf4",
    "--text-muted": "#8b95b0",
    "--input-bg": "#252b3b",
    "--tag-bg": "#2d3348",
    "--thead-bg": "#252b3b",
    "--kanban-col": "#252b3b",
  },
  light: {
    "--card-bg": "#ffffff",
    "--page-bg": "#f1f5f9",
    "--sidebar-bg": "#1e293b",
    "--border": "#e2e8f0",
    "--text-primary": "#0f172a",
    "--text-muted": "#64748b",
    "--input-bg": "#f8fafc",
    "--tag-bg": "#e2e8f0",
    "--thead-bg": "#f8fafc",
    "--kanban-col": "#f1f5f9",
  },
};

const PAGE_MAP = {
  dashboard: Dashboard,
  jobs: JobsView,
  kanban: KanbanView,
  reports: ReportsView,
};

const App = () => {
  const dispatch = useDispatch();
  const activeView = useSelector(selectActiveView);
  const theme = useSelector(selectTheme);

  // modal state: null = closed, "add" = new job, job object = edit
  const [modal, setModal] = useState(null);

  const handleSave = (form) => {
    if (form.id) {
      dispatch(updateJob(form));
      dispatch(addActivityLog({ text: buildActivityMessage("update", form), time: "just now", icon: "arrow" }));
    } else {
      dispatch(addJob(form));
      dispatch(addActivityLog({ text: buildActivityMessage("add", form), time: "just now", icon: "send" }));
    }
    setModal(null);
  };

  const ActivePage = PAGE_MAP[activeView] || Dashboard;
  const themeVars = THEME_VARS[theme] || THEME_VARS.dark;

  // Extra props per page
  const pageProps = {
    jobs: { onAdd: () => setModal("add"), onEdit: (job) => setModal(job) },
    kanban: { onEdit: (job) => setModal(job) },
  };

  return (
    <div style={{ ...themeVars, display: "flex", minHeight: "100vh", background: "var(--page-bg)", fontFamily: "'DM Sans', sans-serif" }}>
      <Sidebar />

      <div style={{ flex: 1, overflow: "auto", padding: "1.5rem 2rem" }}>
        <Topbar onAddJob={() => setModal("add")} />
        <ActivePage {...(pageProps[activeView] || {})} />
      </div>

      {modal && (
        <JobModal
          job={modal === "add" ? null : modal}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
};

export default App;
