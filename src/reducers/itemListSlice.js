import { createSlice } from '@reduxjs/toolkit';
import { fetchItems, fetchMoreItems, fetchSelectedItem } from '../actions/actionCreators';

const initialState = {
  items: [],
  lastFetchedItems: [],
  selectedItem: null,
  storedSearchValue: '',
  status: 'idle',
};

// TODO add error, loading
const itemList = createSlice({
  name: 'itemList',
  initialState,
  reducers: {
    changeSearchValue: (state, action) => {
      state.storedSearchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.items = action.payload;
          state.lastFetchedItems = action.payload;
        } else {
          state.items = [];
        }
      })
      .addCase(fetchMoreItems.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.lastFetchedItems = action.payload;
          state.items = [...state.items, ...action.payload];
        } else {
          state.lastFetchedItems = [];
        }
      })
      .addCase(fetchSelectedItem.fulfilled, (state, action) => {
        state.selectedItem = action.payload;
      });
  },
});

export const { changeSearchValue } = itemList.actions;
export default itemList;
