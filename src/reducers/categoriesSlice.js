import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories } from '../actions/actionCreators';

const initialState = {
  categories: [],
  active: 0, // 0 for 'all'
};

const categoriesList = createSlice({
  name: 'itemList',
  initialState,
  reducers: {
    changeCategory: (state, action) => {
      const id = action.payload;
      if (id !== state.active) {
        state.active = +id;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const { changeCategory } = categoriesList.actions;
export default categoriesList;
