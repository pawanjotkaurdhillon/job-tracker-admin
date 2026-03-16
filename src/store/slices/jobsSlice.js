import { createSlice } from "@reduxjs/toolkit";
import { SAMPLE_JOBS } from "../../constants";

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    items: SAMPLE_JOBS,
  },
  reducers: {
    addJob: (state, action) => {
      state.items.push({ ...action.payload, id: Date.now() });
    },
    updateJob: (state, action) => {
      const index = state.items.findIndex((j) => j.id === action.payload.id);
      if (index !== -1) state.items[index] = { ...state.items[index], ...action.payload };
    },
    deleteJob: (state, action) => {
      state.items = state.items.filter((j) => j.id !== action.payload);
    },
    cycleJobStatus: (state, action) => {
      const { id, statuses } = action.payload;
      const job = state.items.find((j) => j.id === id);
      if (job) {
        const idx = statuses.indexOf(job.status);
        job.status = statuses[(idx + 1) % statuses.length];
      }
    },
  },
});

export const { addJob, updateJob, deleteJob, cycleJobStatus } = jobsSlice.actions;

// Selectors
export const selectAllJobs = (state) => state.jobs.items;
export const selectJobById = (id) => (state) => state.jobs.items.find((j) => j.id === id);
export const selectJobsByStatus = (status) => (state) =>
  state.jobs.items.filter((j) => j.status === status);
export const selectJobStats = (state) => {
  const items = state.jobs.items;
  const total = items.length;
  const offers = items.filter((j) => j.status === "Offer").length;
  const interviews = items.filter((j) => j.status === "Interview").length;
  const applied = items.filter((j) => j.status === "Applied").length;
  const responseRate =
    total > 0 ? Math.round(((total - applied) / total) * 100) : 0;
  return { total, offers, interviews, applied, responseRate };
};
export const selectUpcomingDeadlines = (state) =>
  state.jobs.items
    .filter((j) => j.deadline && new Date(j.deadline) > new Date())
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 5);

export default jobsSlice.reducer;
