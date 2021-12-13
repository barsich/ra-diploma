import { createSlice } from '@reduxjs/toolkit';
import { sendOrder } from '../actions/actionCreators';

const initialState = {
  items: [],
  status: 'idle',
};

// item props: {
//   id,
//   name,
//   size,
//   count,
//   price,
// }

const cartItemList = createSlice({
  name: 'cartItemList',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      // если итем есть в корзине
      const sameItem = state.items.find((item) => item.id === newItem.id);
      const sameItemIndex = state.items.findIndex((item) => item.id === newItem.id);
      if (sameItem) {
        // проверяем такого же ли он размера
        const sameSize = sameItem.size === newItem.size;
        if (sameSize) {
          // если совпадают размеры, то суммируем кол-во
          state.items[sameItemIndex].count += newItem.count;
        } else {
          // если нет, то добавляем отдельно
          state.items.push(newItem);
        }
      } else {
        // если итема нет в корзине, то добавляем
        state.items.push(newItem);
      }
    },
    removeFromCart: (state, action) => {
      const itemToRemove = action.payload;
      state.items = state.items.filter(
        (item) => item.id !== itemToRemove.id && item.size !== itemToRemove.size
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.fulfilled, (state) => {
        state.items = [];
        state.status = 'succeeded';
      })
      .addCase(sendOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendOrder.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { addToCart, removeFromCart } = cartItemList.actions;
export default cartItemList;
