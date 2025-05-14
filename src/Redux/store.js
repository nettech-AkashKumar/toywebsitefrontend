


import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice"; // Auth slice ko import karein
import wishlistReducer from "../Redux/wishlistSlice"; // Wishlist slice ko import karein
import userSlice from "../Redux/userSlice"
import notificationSlice from "../Redux/notificationSlice"
import sidebarSlice from "../Redux/sidebarSlice"; // Sidebar reducer import karein
import analyticsSlice from "../Redux/analyticsSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    wishlist: wishlistReducer, // Wishlist reducer ko store me add karein
    usersData: userSlice,
    notifications: notificationSlice,
    adminsidebar: sidebarSlice, // Store mein sidebar reducer add karein
    analytics: analyticsSlice, // Store mein sidebar reducer add karein
  },
});

export default store;
