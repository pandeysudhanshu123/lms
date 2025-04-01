import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// ✅ Corrected Async Thunk
export const register = createAsyncThunk(
  "signup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8000/register", data);
      return response.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

const initialState = {
  user: null,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true; 
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false; 
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false; 
      });
  },
});

export default authSlice.reducer;
