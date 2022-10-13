import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./reducers/blogs";
import usersReducer from "./reducers/users";
import userReducer from "./reducers/user";
import notificationsReducer from "./reducers/notifications";

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    users: usersReducer,
    user: userReducer,
    notifications: notificationsReducer,
  },
});
