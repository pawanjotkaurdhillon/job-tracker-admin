import { createSlice } from "@reduxjs/toolkit";

const activitySlice = createSlice({
  name: "activity",
  initialState: {
    logs: [
      { id: 1, text: "Applied to Stripe – Senior Frontend Engineer", time: "2 days ago", icon: "send" },
      { id: 2, text: "Interview scheduled at Vercel", time: "1 day ago", icon: "calendar" },
      { id: 3, text: "Offer received from Figma 🎉", time: "3 hours ago", icon: "trophy" },
    ],
  },
  reducers: {
    addActivityLog: (state, action) => {
      state.logs.unshift({ ...action.payload, id: Date.now() });
      if (state.logs.length > 20) state.logs.pop(); // keep max 20 logs
    },
    clearActivityLogs: (state) => {
      state.logs = [];
    },
  },
});

export const { addActivityLog, clearActivityLogs } = activitySlice.actions;

// Selectors
export const selectActivityLogs = (state) => state.activity.logs;
export const selectRecentLogs = (count = 5) => (state) =>
  state.activity.logs.slice(0, count);

export default activitySlice.reducer;
