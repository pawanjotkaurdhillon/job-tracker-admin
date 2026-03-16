import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveView,
  toggleTheme,
  selectActiveView,
  selectTheme,
} from "../../store/slices/uiSlice";
import { selectJobStats } from "../../store/slices/jobsSlice";
import { NAV_ITEMS } from "../../constants";

const Sidebar = () => {
  const dispatch = useDispatch();
  const activeView = useSelector(selectActiveView);
  const theme = useSelector(selectTheme);
  const stats = useSelector(selectJobStats);

  return (
    <div
      style={{
        width: 220,
        flexShrink: 0,
        background: "var(--sidebar-bg)",
        display: "flex",
        flexDirection: "column",
        padding: "1.5rem 1rem",
        minHeight: "100vh",
      }}
    >
      {/* Brand */}
      <div className="mb-4">
        <div style={{ color: "white", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.3px" }}>
          <span style={{ color: "#818cf8" }}>Job</span>Tracker
        </div>
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem" }}>
          Admin Panel
        </div>
      </div>

      {/* Quick stats */}
      <div
  className="rounded p-2 mb-4"
  style={{ background: "rgba(255,255,255,0.05)", fontSize: "0.72rem" }}
>
  <div className="d-flex justify-content-between mb-1">
    <span style={{ color: "rgba(255,255,255,0.6)" }}>Total</span>
    <span style={{ color: "white" }}>{stats.total}</span>
  </div>
  <div className="d-flex justify-content-between mb-1">
    <span style={{ color: "rgba(255,255,255,0.6)" }}>Interviews</span>
    <span style={{ color: "#fbbf24" }}>{stats.interviews}</span>
  </div>
  <div className="d-flex justify-content-between mb-1">
    <span style={{ color: "rgba(255,255,255,0.6)" }}>Offers</span>
    <span style={{ color: "#22c55e" }}>{stats.offers}</span>
  </div>
  <div className="d-flex justify-content-between">
    <span style={{ color: "rgba(255,255,255,0.6)" }}>Response Rate</span>
    <span style={{ color: "#818cf8" }}>{stats.responseRate}%</span>
  </div>
</div>

      {/* Nav */}
      <nav className="flex-grow-1">
        <div
          style={{
            color: "rgba(255,255,255,0.3)",
            fontSize: "0.65rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "0.5rem",
            paddingLeft: "1rem",
          }}
        >
          Menu
        </div>
        {NAV_ITEMS.map((item) => (
          <div
            key={item.id}
            className={`nav-link ${activeView === item.id ? "active" : ""}`}
            onClick={() => dispatch(setActiveView(item.id))}
            style={{ cursor: "pointer" }}
          >
            <span>{item.icon}</span> {item.label}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div
        className="d-flex align-items-center gap-2 px-2 py-2"
        style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.75rem",
            color: "white",
            fontWeight: 700,
          }}
        >
          A
        </div>
        <div>
          <div style={{ color: "white", fontSize: "0.8rem", fontWeight: 600 }}>Admin</div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem" }}>Job Seeker</div>
        </div>
        <button
          className="btn ms-auto"
          style={{
            background: "rgba(255,255,255,0.1)",
            color: "white",
            border: "none",
            borderRadius: 6,
            padding: "3px 8px",
            fontSize: "0.65rem",
          }}
          onClick={() => dispatch(toggleTheme())}
          title="Toggle theme"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
