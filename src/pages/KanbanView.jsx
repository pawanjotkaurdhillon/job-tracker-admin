import React from "react";
import { useSelector } from "react-redux";
import { selectAllJobs } from "../store/slices/jobsSlice";
import { STATUS } from "../constants";
import KanbanColumn from "../components/Kanban/KanbanColumn";

const KanbanView = ({ onEdit }) => {
  const jobs = useSelector(selectAllJobs);

  return (
    <div>
      <p className="text-muted small mb-3">
        Click any card to edit. In the list view, click a status badge to cycle it forward.
      </p>
      <div
        className="d-flex gap-3 overflow-auto pb-3"
        style={{ minHeight: 400 }}
      >
        {STATUS.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            jobs={jobs.filter((j) => j.status === status)}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanView;
