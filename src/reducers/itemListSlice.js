import { createSlice } from '@reduxjs/toolkit';
import { fetchItems, fetchMoreItems, fetchSelectedItem } from '../actions/actionCreators';

const initialState = {
  items: [],
  lastFetchedItems: [],
  selectedItem: {},
  storedSearchValue: '',
  statusFetch: 'idle',
  statusFetchMore: 'idle',
  statusFetchItem: 'idle',
};

const itemList = createSlice({
  name: 'itemList',
  initialState,
  reducers: {
    changeSearchValue: (state, action) => {
      state.storedSearchValue = action.payload;
    },
    clearSelectedItem: (state) => {
      state.selectedItem = {};
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
        state.statusFetch = 'succeeded';
      })
      .addCase(fetchItems.pending, (state) => {
        state.statusFetch = 'loading';
      })
      .addCase(fetchItems.rejected, (state) => {
        state.statusFetch = 'failed';
      })
      .addCase(fetchMoreItems.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.lastFetchedItems = action.payload;
          state.items = [...state.items, ...action.payload];
        } else {
          state.lastFetchedItems = [];
        }
        state.statusFetchMore = 'succeeded';
      })
      .addCase(fetchMoreItems.pending, (state) => {
        state.statusFetchMore = 'loading';
      })
      .addCase(fetchMoreItems.rejected, (state) => {
        state.statusFetchMore = 'failed';
      })
      .addCase(fetchSelectedItem.fulfilled, (state, action) => {
        state.selectedItem = action.payload;
        state.statusFetchItem = 'succeeded';
      })
      .addCase(fetchSelectedItem.pending, (state) => {
        state.statusFetchItem = 'loading';
      })
      .addCase(fetchSelectedItem.rejected, (state) => {
        state.statusFetchItem = 'failed';
      });
  },
});

export const { changeSearchValue, clearSelectedItem } = itemList.actions;
export default itemList;
