import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// LocalStorage se data get karne ka function
const loadState = () => {
  try {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : null;
  } catch (error) {
    console.error("Could not load state", error);
    return null;
  }
};

// LocalStorage me data save karne ka function
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("users", serializedState);
  } catch (error) {
    console.error("Could not save state", error);
  }
};

// API Se Users Data Fetch Karne Ka Function
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: "User",
    status: "Active"
  }));
});

// Initial State (LocalStorage se load karega)
const initialState = {
  users: loadState() || [], // Agar localStorage me data hai to wahi load karega
  status: "idle",
  error: null
};

// User Slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
      saveState(state.users); // LocalStorage Update
    },
    updateUser: (state, action) => {
      const { id, name, email } = action.payload;
      const existingUser = state.users.find(user => user.id === id);
      if (existingUser) {
        existingUser.name = name;
        existingUser.email = email;
      }
      saveState(state.users); // LocalStorage Update
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        if (!loadState()) {  // Agar localStorage me data nahi hai to hi save karega
          state.users = action.payload;
          saveState(state.users); // LocalStorage Update
        }
        state.status = "succeeded";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

// Export Actions
export const { deleteUser, updateUser } = userSlice.actions;

// Export Reducer
export default userSlice.reducer;
