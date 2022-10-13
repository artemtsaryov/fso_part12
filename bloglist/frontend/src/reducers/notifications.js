import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = [];

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    pushNotification: (state, action) => {
      const updatedNotifications = Array.from(state);
      updatedNotifications.unshift({
        id: uuidv4(),
        text: action.payload.text,
        isError: action.payload.isError || false,
      });
      return updatedNotifications;
    },
    popNotification: (state) => {
      const updatedNotifications = Array.from(state);
      updatedNotifications.pop();
      return updatedNotifications;
    },
  },
});

export const { pushNotification, popNotification } = notificationsSlice.actions;

export const notifyWithTimeout = (text, isError) => {
  return async (dispatch) => {
    dispatch(pushNotification({ text, isError }));

    setTimeout(() => {
      dispatch(popNotification());
    }, 5000);
  };
};

export default notificationsSlice.reducer;
