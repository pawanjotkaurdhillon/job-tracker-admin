export const STATUS = ["Applied", "Phone Screen", "Interview", "Offer", "Rejected", "Withdrawn"];

export const STATUS_COLORS = {
  Applied: "primary",
  "Phone Screen": "info",
  Interview: "warning",
  Offer: "success",
  Rejected: "danger",
  Withdrawn: "secondary",
};

export const PRIORITY = ["Low", "Medium", "High"];

export const PRIORITY_COLORS = {
  High: "#ef4444",
  Medium: "#f59e0b",
  Low: "#22c55e",
};

export const SORT_OPTIONS = [
  { value: "appliedDate", label: "Date Applied" },
  { value: "company", label: "Company" },
  { value: "status", label: "Status" },
  { value: "priority", label: "Priority" },
];

export const NAV_ITEMS = [
  { id: "dashboard", icon: "🏠", label: "Dashboard" },
  { id: "jobs", icon: "📋", label: "Applications" },
  { id: "kanban", icon: "🗂", label: "Kanban Board" },
  { id: "reports", icon: "📈", label: "Reports" },
];

export const SAMPLE_JOBS = [
  {
    id: 1,
    company: "Stripe",
    role: "Senior Frontend Engineer",
    location: "Remote",
    salary: "$160k–$200k",
    status: "Interview",
    priority: "High",
    appliedDate: "2025-03-01",
    deadline: "2026-03-20",
    url: "https://stripe.com",
    notes: "Great culture, strong eng team. Prep system design.",
    tags: ["fintech", "remote", "react"],
  },
  {
    id: 2,
    company: "Vercel",
    role: "Staff Engineer",
    location: "San Francisco, CA",
    salary: "$180k–$220k",
    status: "Phone Screen",
    priority: "High",
    appliedDate: "2025-03-05",
    deadline: "2026-03-25",
    url: "https://vercel.com",
    notes: "Referred by ex-colleague. Strong product focus.",
    tags: ["infra", "nextjs", "devtools"],
  },
  {
    id: 3,
    company: "Linear",
    role: "Product Engineer",
    location: "Remote",
    salary: "$140k–$170k",
    status: "Applied",
    priority: "Medium",
    appliedDate: "2025-03-08",
    deadline: "",
    url: "https://linear.app",
    notes: "Love the product. Small team.",
    tags: ["startup", "remote", "react"],
  },
  {
    id: 4,
    company: "Figma",
    role: "Frontend Engineer",
    location: "New York, NY",
    salary: "$155k–$195k",
    status: "Offer",
    priority: "High",
    appliedDate: "2025-02-20",
    deadline: "2026-04-15",
    url: "https://figma.com",
    notes: "Offer received! Deadline for decision is 4/15.",
    tags: ["design", "canvas", "react"],
  },
  {
    id: 5,
    company: "Notion",
    role: "React Engineer",
    location: "Remote",
    salary: "$130k–$160k",
    status: "Rejected",
    priority: "Medium",
    appliedDate: "2025-02-15",
    deadline: "",
    url: "https://notion.so",
    notes: "Rejected after take-home. Feedback: needed more system design.",
    tags: ["saas", "remote"],
  },
  {
    id: 6,
    company: "Shopify",
    role: "Senior Developer",
    location: "Remote",
    salary: "$150k–$180k",
    status: "Applied",
    priority: "Low",
    appliedDate: "2025-03-10",
    deadline: "",
    url: "https://shopify.com",
    notes: "",
    tags: ["ecommerce", "remote"],
  },
];
