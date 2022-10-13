import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ username, password }, thunkAPI) => {
    try {
      const authenticatedUser = await loginService.login(username, password);
      return authenticatedUser;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
