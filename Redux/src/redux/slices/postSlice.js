import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (userId, {rejectWithValue}) => {
    try {
      const response = await api.get(`/posts?userId=${userId}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Something went wrong',
      );
    }
  },
);

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: 'posts',

  initialState,

  reducers: {
    clearPosts: state => {
      state.posts = [];
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: builder => {
    builder

      .addCase(fetchPosts.pending, state => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })

      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const {clearPosts} = postSlice.actions;

export default postSlice.reducer;