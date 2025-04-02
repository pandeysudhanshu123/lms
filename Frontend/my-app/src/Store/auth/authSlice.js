import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// ✅ Corrected Async Thunk
export const register = createAsyncThunk(
  "signup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

export const LoginData = createAsyncThunk(
  "login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8000/login", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data || "something went wrong");
    }
  }
);

const initialState = {
  user: null,
  isLoading: false,
  isAuth: false,
  token: localStorage.getItem("loginToken")
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuth = false;
      state.user = null; // ✅ Clear user data on logout
      localStorage.removeItem("loginToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
      });
    // ✅ Login Cases
    builder
      .addCase(LoginData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LoginData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; // ✅ Set full payload as `user`
        state.isAuth = true;
        state.token = action.payload.token;
        localStorage.setItem("loginToken", action.payload.token);
      })
      .addCase(LoginData.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
      });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
