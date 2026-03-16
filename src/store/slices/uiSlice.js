import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    activeView: "dashboard",
    filter: "All",
    sort: "appliedDate",
    search: "",
    theme: "dark",
    sidebarCollapsed: false,
  },
  reducers: {
    setActiveView: (state, action) => {
      state.activeView = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    resetFilters: (state) => {
      state.filter = "All";
      state.sort = "appliedDate";
      state.search = "";
    },
  },
});

export const {
  setActiveView,
  setFilter,
  setSort,
  setSearch,
  toggleTheme,
  toggleSidebar,
  resetFilters,
} = uiSlice.actions;

// Selectors
export const selectActiveView = (state) => state.ui.activeView;
export const selectFilter = (state) => state.ui.filter;
export const selectSort = (state) => state.ui.sort;
export const selectSearch = (state) => state.ui.search;
export const selectTheme = (state) => state.ui.theme;
export const selectSidebarCollapsed = (state) => state.ui.sidebarCollapsed;

export default uiSlice.reducer;
