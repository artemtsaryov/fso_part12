import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

export const initBlogs = createAsyncThunk(
  "blogs/initBlogs",
  async (arg, thunkAPI) => {
    try {
      const blogs = await blogService.getAll(thunkAPI.getState().user.token);
      return blogs;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addBlog = createAsyncThunk(
  "blogs/addBlog",
  async (blog, thunkAPI) => {
    try {
      const newBlog = await blogService.create(
        blog,
        thunkAPI.getState().user.token
      );
      return newBlog;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const removeBlog = createAsyncThunk(
  "blogs/removeBlog",
  async (blog, thunkAPI) => {
    try {
      await blogService.remove(blog, thunkAPI.getState().user.token);
      return blog.id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const likeBlog = createAsyncThunk(
  "blogs/likeBlog",
  async (blog, thunkAPI) => {
    try {
      await blogService.addLike(blog, thunkAPI.getState().user.token);
      return blog.id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addBlogComment = createAsyncThunk(
  "blogs/addBlogComment",
  async ({ blog, comment }, thunkAPI) => {
    try {
      const updatedBlog = await blogService.addBlogComment(
        blog,
        comment,
        thunkAPI.getState().user.token
      );

      return updatedBlog;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const sort = (blogs) => {
  blogs.sort((a, b) => b.likes - a.likes);
};

const initialState = [];

export const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initBlogs.fulfilled, (state, action) => {
      const initialBlogs = action.payload.slice();
      sort(initialBlogs);
      return initialBlogs;
    });
    builder.addCase(addBlog.fulfilled, (state, action) => {
      state.push(action.payload);
      sort(state);
    });
    builder.addCase(removeBlog.fulfilled, (state, action) => {
      return state.filter((b) => b.id !== action.payload);
    });
    builder.addCase(likeBlog.fulfilled, (state, action) => {
      const updateBlogs = state.map((b) =>
        b.id !== action.payload ? b : { ...b, likes: b.likes + 1 }
      );
      sort(updateBlogs);
      return updateBlogs;
    });
    builder.addCase(addBlogComment.fulfilled, (state, action) => {
      const updateBlogs = state.map((b) =>
        b.id !== action.payload.id
          ? b
          : { ...b, comments: action.payload.comments }
      );
      return updateBlogs;
    });
  },
});

export default blogsSlice.reducer;
