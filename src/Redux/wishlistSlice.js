import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const token = localStorage.getItem("token")?.trim();
let userId = null;
if (token) {
  try {
    const decoded = jwtDecode(token);
    userId = decoded.id;
  } catch (error) {
    console.log("Error decoding token", error);
  }
}
console.log("userId from wishlist slice", userId);

// Retrieve authentication state & user data from localStorage
const storedAuth = localStorage.getItem("isAuthenticated") === "true";
// console.log('storedAuth', storedAuth);
const storedUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;
// Load wishlist from localStorage
 const loadWishlistFromStorage = () => {
  //  const storedWishlist = localStorage.getItem("wishlist");
  //  return storedWishlist ? JSON.parse(storedWishlist) : [];
  const storedWishlist = storedUser
    ? JSON.parse(localStorage.getItem(`wishlist_${storedUser.id}`)) || []
    : []; // Retrieve wishlist for logged-in user
  console.log("storedWishlist", storedWishlist);
  return storedWishlist;
 };

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    isAuthenticated: storedAuth,
    user: storedUser,
    wishlist: loadWishlistFromStorage(),
  },
  reducers: {
    addToWishlist: (state, action) => {
      const { userId, productId } = action.payload;
      console.log("userId, productId from wishlistSlice", userId, productId);

      // Check if the item already exists to avoid duplicates
      const existingItem = state.wishlist.find(
        (item) => item._id === action.payload._id
        // (item) => item.productId === action.payload.productId
      );
      console.log('existing item from wishlist slice', existingItem)
      if (!existingItem) {
        state.wishlist.push(action.payload);
        localStorage.setItem(
          `wishlist_${storedUser.id}`,
          JSON.stringify(state.wishlist)
        ); // Save to localStorage
      }
      if (!userId || !productId) {
        console.error("userId & productId is missing from wishlist Slice");
        return;
      }
      axios
        .post("http://localhost:8081/api/wishlist/add", {
          userId,
          productId,
        })
        .then((response) => {
          const savedItem = response.data.data;
          console.log("Response Data:", response.data); // Check the structure of response
          console.log("savedItem from response:", savedItem); // Ensure _id is present
          console.log("wishlist_id, userId, productId from slice", savedItem);
          localStorage.setItem(
            `wishlist_${storedUser.id}`,
            JSON.stringify(state.wishlist)
          );
          toast.success("Wishlist item added successfully!!", {
            position: "top-center",
            autoClose: "3000",
            hideProgressBar: false,
          });
          console.log("Wishlist item added successfully", savedItem);
        });
    },
    removeFromWishlist: (state, action) => {
      const { _id, userId, productId } = action.payload;
      console.log(
        "removeId, userId, productId from removeFromWishlist",
        _id,
        userId,
        productId
      );
      if (!_id || !userId || !productId) {
        console.error("_id, userId & product is missing");
        return;
      }
      axios
        .delete("http://localhost:8081/api/wishlist/delete-wishlist-item", {
          data: { _id, userId, productId },
        })
        .then((response) => console.log("Item removed:", response.data.data))
        .catch((error) => console.error("Error removing item:", error));

      console.log("Removing item with ID:", action.payload); // Debugging
      state.wishlist = state.wishlist.filter(
        (item) => item.productId !== action.payload.productId
      );
      localStorage.setItem(
        `wishlist_${storedUser.id}`,
        JSON.stringify(state.wishlist)
      ); // Save updated list
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

//wishlistSlice is for state management for addtowishlist item, removetowishlistitem

// import { createSlice } from "@reduxjs/toolkit";
// import { jwtDecode } from "jwt-decode";
// import axios from "axios";
// import { toast} from 'react-toastify'
// import "react-toastify/dist/ReactToastify.css";

// const token = localStorage.getItem("token")?.trim();
// let userId = null;
// if (token) {
//   try {
//     const decoded = jwtDecode(token);
//     userId = decoded.id;
//   } catch (error) {
//     console.log("Error decoding token", error);
//   }
// }
// console.log("userId from wishlist slice", userId);

// // Retrieve authentication state & user data from localStorage
// const storedAuth = localStorage.getItem("isAuthenticated") === "true";
// // console.log('storedAuth', storedAuth);
// const storedUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;
// // console.log('storedUser', storedUser);
// const storedWishlist = storedUser
//   ? JSON.parse(localStorage.getItem(`wishlist_${storedUser.id}`)) || []
//   : []; // Retrieve wishlist for logged-in user
// console.log("storedWishlist", storedWishlist);

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     isAuthenticated: storedAuth,
//     user: storedUser,
//     wishlist: storedWishlist || [], // Set initial wishlist
//   },

//   reducers: {
//     login: (state, action) => {
//       const user = action.payload;
//       console.log("user", user);
//       state.isAuthenticated = true;
//       state.user = user;
//       localStorage.setItem("isAuthenticated", "true");
//       localStorage.setItem("loggedInUser", JSON.stringify(user));

//       // Load the user's specific wishlist
//       const userWishlist =
//         JSON.parse(localStorage.getItem(`wishlist_${user.id}`)) || [];

//       // Update Redux state and localStorage with the user's wishlist
//       state.wishlist = userWishlist;
//       console.log("Wishlist before find:", state.wishlist);
//       console.log("Type of wishlist:", typeof state.wishlist);

//       localStorage.setItem("wishlist", JSON.stringify(userWishlist)); // For global access
//       localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(userWishlist)); // For specific user
//     },

//     logout: (state) => {
//       // Save the user's wishlist before logout
//       if (state.user) {
//         localStorage.setItem(
//           `wishlist_${state.user.id}`,
//           JSON.stringify(state.wishlist)
//         );
//       }

//       // Reset state
//       state.isAuthenticated = false;
//       state.user = null;
//       state.wishlist = []; // Clear wishlist in Redux
//       localStorage.removeItem("isAuthenticated");
//       localStorage.removeItem("loggedInUser");
//       localStorage.removeItem("wishlist");
//     },

//     // addToWishlist: (state, action) => {
//     //   const existingItem = state.wishlist.find(item => item._id === action.payload._id);
//     //   console.log('existingItem in whislist', existingItem)
//     //   if (!existingItem) {
//     //     state.wishlist.push(action.payload);
//     //     localStorage.setItem("wishlist", JSON.stringify(state.wishlist)); // Update global localStorage

//     //     // Save user-specific wishlist to localStorage only if user is logged in
//     //     if (state.user && state.user.id) {
//     //       localStorage.setItem(`wishlist_${state.user.id}`, JSON.stringify(state.wishlist));
//     //     }
//     //   }
//     // },

//     addToWishlist: (state, action) => {
//       const { userId, productId } = action.payload;
//       console.log("userId, productId from wishlistSlice", userId, productId);
//       const itemExists = state.wishlist.find(
//         (item) => item.productId === productId
//       );
//       if (itemExists) {
//         toast.warning('Item is already in your wishlist!!', {
//           position:'top-center',
//           autoClose: 3000,
//           hideProgressBar: false
//         })
//         return;
//       }

//       if (!userId || !productId) {
//         console.error("userId & productId is missing from wishlist Slice");
//         return;
//       }
//       axios
//         .post("http://localhost:8081/api/wishlist/add", {
//           userId,
//           productId,
//         })
//         .then((response) => {
//           const savedItem = response.data.data;
//           console.log("Response Data:", response.data);  // Check the structure of response
//           console.log("savedItem from response:", savedItem);  // Ensure _id is present
//           console.log('wishlist_id, userId, productId from slice', savedItem)
//           toast.success('Wishlist item added successfully!!', {
//             position: 'top-center',
//             autoClose: '3000',
//             hideProgressBar: false
//           })
//           console.log("Wishlist item added successfully", savedItem);
//           // Push to Redux only after receiving saved item
//           // state.wishlist.push(savedItem);  //not directly push  instead ...state.wishlist
//           // state.wishlist = [...state.wishlist, savedItem];
//         //   if (savedItem) {
//         //     // state.wishlist = state.wishlist ? [...state.wishlist, {...savedItem}] : [{...savedItem}];
//         //     console.log('Wishlist1233:', state.wishlist);
//         //     console.log('Saved Item:', savedItem);

//         //     state.wishlist = [...state.wishlist, { ...savedItem }];
//         //     console.log('wishlist state', ...state.wishlist)
//         // }
//         if (savedItem && savedItem._id) {
//           const updatedWishlist = [...state.wishlist, { ...savedItem }]; // Store in a temporary variable
//           console.log('Updated Wishlist:', updatedWishlist); // Log here
//           state.wishlist = updatedWishlist; // Assign to state without accessing the proxy again
//       } else {
//           console.error('Error: Invalid savedItem', savedItem); // Handle invalid data gracefully
//       }

//           // Update localStorage
//       if (state.user && state.user.id) {
//         localStorage.setItem(
//           `wishlist_${state.user.id}`,
//           JSON.stringify(state.wishlist)
//         );
//         localStorage.setItem("wishlist", JSON.stringify(state.wishlist)); // global too
//       }
//         });
//     },

//     //     removeFromWishlist: (state, action) => {
//     //       const updatedWishlist = state.wishlist.filter(item => item.id !== action.payload);
//     //       state.wishlist = updatedWishlist;
//     //       localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // Update global localStorage

//     //       // Save user-specific wishlist to localStorage only if user is logged in
//     //       if (state.user && state.user.id) {
//     //         localStorage.setItem(`wishlist_${state.user.id}`, JSON.stringify(updatedWishlist));
//     //       }
//     //     },
//     //   },
//     // });

//     removeFromWishlist: (state, action) => {
//       // const { _id: removeId, userId, productId } = action.payload;
//       const {_id, userId,  productId} = action.payload;
//       console.log(
//         "removeId, userId, productId from removeFromWishlist",
//         _id,
//         userId,
//         productId
//       );
//       if (!userId || !productId || !_id) {
//         console.error("userId & product is missing");
//         return;
//       }
//       // state.wishlist = state.wishlist.filter(
//       //   (item) => item._id !== action.payload._id
//       // );
//       // redudundant code
//       // state.wishlist = state.wishlist.filter((item) => item._id !== _id && item.productId && item.productId?._id !== productId)

//       // localStorage.setItem("wishlist", JSON.stringify(state.wishlist));

//       if (state.user && state.user.id) {
//         localStorage.setItem(
//           `wishlist_${state.user.id}`,
//           JSON.stringify(state.wishlist)
//         );
//       }
//       axios
//         .delete(`http://localhost:8081/api/wishlist/delete-wishlist-item`, {
//           data: { _id, userId, productId },
//         })
//         .then((response) => console.log("Item removed:", response.data.data))
//         .catch((error) => console.error("Error removing item:", error));
//       const updatedWishlist = state.wishlist.filter(
//         (item) => item._id !== _id && item.productId && item.productId?._id !== productId);
//       state.wishlist = updatedWishlist;

//       // Save user-specific wishlist to localStorage only if user is logged in
//       if (state.user && state.user.id) {
//         localStorage.setItem(
//           `wishlist_${state.user.id}`,
//           JSON.stringify(updatedWishlist)
//         );
//       }
//     },
//   },
// });
// export const { login, logout, addToWishlist, removeFromWishlist } =
//   authSlice.actions;
// export default authSlice.reducer;
