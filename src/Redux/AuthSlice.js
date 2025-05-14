//AuthSlice is for user authentication whose user is authenticated or not

import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("token")?.trim();
let userId = null;
if(token) {
  try {
    const decoded = jwtDecode(token);
    userId = decoded.id;
  } catch(error) {
    console.log('Error decoding token', error)
  }
}
console.log('userId from wishlist auth', userId)

// Retrieve authentication state & user data from localStorage
const storedAuth = localStorage.getItem("isAuthenticated") === "true";
console.log('storedAuth', storedAuth)
const storedUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;
console.log('storedAuth', storedUser)
const storedWishlist = storedUser ? JSON.parse(localStorage.getItem(`wishlist_${storedUser.id}`)) || [] : []; // Retrieve wishlist for logged-in user
console.log('storedWishlist', storedWishlist)

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: storedAuth,
    user: storedUser,
    wishlist: Array.isArray(storedWishlist) ? storedWishlist : [], // Set initial wishlist
  },
  
  reducers: {
    login: (state, action) => {
      const user = action.payload;
      state.isAuthenticated = true;
      state.user = user;
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      // Load the user's specific wishlist
      const userWishlist = JSON.parse(localStorage.getItem(`wishlist_${user.id}`)) || [];
      
      // Update Redux state and localStorage with the user's wishlist
      state.wishlist = userWishlist;
      localStorage.setItem("wishlist", JSON.stringify(userWishlist)); // For global access
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(userWishlist)); // For specific user
    },

    logout: (state) => {
      // Save the user's wishlist before logout
      if (state.user) {
        localStorage.setItem(`wishlist_${state.user.id}`, JSON.stringify(state.wishlist));
      }

      // Reset state
      state.isAuthenticated = false;
      state.user = null;
      state.wishlist = []; // Clear wishlist in Redux
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("wishlist");
    },

    addToWishlist: (state, action) => {
      if (!state.isAuthenticated || !state.user) {
        // If the user is not logged in, do not proceed with wishlist operations
        console.error("User must be logged in to add items to the wishlist.");
        return;
      }
      const wishlistArray = JSON.parse(JSON.stringify(state.wishlist))
      // console.log('Current wishlist state', [...state.wishlist])
      console.log("Converted Wishlist Array:", wishlistArray);
      if(!Array.isArray(state.wishlist)) {
        console.log('Error: state.wishlist is not an array', state.wishlist)
      } 
      // const wishlist = Array.isArray(state.wishlist) ? [...state.wishlist] : []
       const existingItem = wishlistArray.find(item => String(item.productId) === String(action.payload.productId));

      console.log('exxistiing Item in auth slice', existingItem)
      if (!existingItem) {
        // state.wishlist.push(action.payload);
        state.wishlist = [...wishlistArray, action.payload]  
        localStorage.setItem("wishlist", JSON.stringify(state.wishlist)); // Update global localStorage

        // Save user-specific wishlist to localStorage only if user is logged in
        if (state.user && state.user.id) {
          localStorage.setItem(`wishlist_${state.user.id}`, JSON.stringify(state.wishlist));
        }
      }
    },

    removeFromWishlist: (state, action) => {
      if (!state.isAuthenticated || !state.user) {
        // If the user is not logged in, do not proceed with wishlist operations
        console.error("User must be logged in to remove items from the wishlist.");
        return;
      }

      const updatedWishlist = state.wishlist.filter(item => item.productId !== action.payload);
      state.wishlist = updatedWishlist;
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // Update global localStorage

      // Save user-specific wishlist to localStorage only if user is logged in
      if (state.user && state.user.id) {
        localStorage.setItem(`wishlist_${state.user.id}`, JSON.stringify(updatedWishlist));
      }
    },
  },
});

export const { login, logout, addToWishlist, removeFromWishlist } = authSlice.actions;
export default authSlice.reducer;










