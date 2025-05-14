import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false, // Default: Sidebar closed
};

const sidebarSlice = createSlice({
  name: "adminsidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen; // Toggle karega
      console.log("Sidebar toggled, new state:", state.isOpen); // ✅ Console check
    },
    closeSidebar: (state) => {
      state.isOpen = false;
    },
  },
});

export const { toggleSidebar, closeSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
