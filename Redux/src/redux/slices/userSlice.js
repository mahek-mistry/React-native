import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, {rejectWithValue}) => {
    try {
      const response = await api.get('/users');

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Something went wrong',
      );
    }
  },
);

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',

  initialState,

  reducers: {},

  extraReducers: builder => {
    builder

      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default userSlice.reducer;