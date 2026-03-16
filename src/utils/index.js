import { STATUS } from "../constants";

export const exportJobsToCSV = (jobs) => {
  const headers = [
    "Company", "Role", "Location", "Salary", "Status",
    "Priority", "Applied", "Deadline", "URL", "Notes", "Tags",
  ];
  const rows = jobs.map((j) => [
    j.company, j.role, j.location, j.salary, j.status,
    j.priority, j.appliedDate, j.deadline, j.url, j.notes,
    j.tags?.join("|"),
  ]);
  const csv = [headers, ...rows]
    .map((r) =>
      r.map((c) => `"${(c || "").toString().replace(/"/g, '""')}"`).join(",")
    )
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "job_applications.csv";
  a.click();
};

export const getNextStatus = (currentStatus) => {
  const idx = STATUS.indexOf(currentStatus);
  return STATUS[(idx + 1) % STATUS.length];
};

export const buildActivityMessage = (action, job) => {
  const messages = {
    add: `Applied to ${job.company} – ${job.role}`,
    update: `Updated ${job.company} – ${job.role}`,
    delete: `Removed ${job.company} – ${job.role}`,
    status: `${job.company} status changed to ${job.status}`,
  };
  return messages[action] || `Action on ${job.company}`;
};

export const getEmptyJob = () => ({
  company: "",
  role: "",
  location: "",
  salary: "",
  status: "Applied",
  priority: "Medium",
  appliedDate: new Date().toISOString().split("T")[0],
  deadline: "",
  url: "",
  notes: "",
  tags: [],
});
