import { createSlice } from '@reduxjs/toolkit';
import { fetchTopItems } from '../actions/actionCreators';

const initialState = {
  items: [],
  status: 'idle',
};

const topItemList = createSlice({
  name: 'topItemList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopItems.fulfilled, (state, action) => {
        Array.isArray(action.payload) ? (state.items = action.payload) : (state.items = []);
        state.status = 'succeeded';
      })
      .addCase(fetchTopItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTopItems.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default topItemList;
