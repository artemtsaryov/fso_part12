import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersService from "../services/users";

export const initUsers = createAsyncThunk(
  "blogs/initUsers",
  async (arg, thunkAPI) => {
    try {
      const users = await usersService.getAll(thunkAPI.getState().user.token);
      return users;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = [];

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initUsers.fulfilled, (state, action) => {
      return action.payload.slice();
    });
  },
});

export const { pushNotification, popNotification } = usersSlice.actions;

export default usersSlice.reducer;
