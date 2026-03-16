import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./slices/jobsSlice";
import uiReducer from "./slices/uiSlice";
import activityReducer from "./slices/activitySlice";

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    ui: uiReducer,
    activity: activityReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
