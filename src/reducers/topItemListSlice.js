import { createSlice } from '@reduxjs/toolkit';
import { fetchTopItems } from '../actions/actionCreators';

const initialState = {
  items: [],
  status: 'idle',
};

// TODO add error, loading
const topItemList = createSlice({
  name: 'topItemList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTopItems.fulfilled, (state, action) => {
      Array.isArray(action.payload) ? state.items = action.payload : state.items = [];
    });
  },
});

export default topItemList;
