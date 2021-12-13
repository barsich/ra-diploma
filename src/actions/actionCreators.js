import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchItems = createAsyncThunk('itemList/fetchAllItems', async ({ id, query }) => {
  let url = `${process.env.REACT_APP_API_URL}/items?categoryId=${id}`;
  if (query) {
    url = url.concat(`&q=${query}`);
  }
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  return data;
});

export const fetchMoreItems = createAsyncThunk(
  'itemList/fetchMoreItems',
  async ({ id, offset, query }) => {
    let url = `${process.env.REACT_APP_API_URL}/items?categoryId=${id}&offset=${offset}`;
    if (query) {
      url = url.concat(`&q=${query}`);
    }
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
);

export const searchItems = createAsyncThunk('itemList/search', async (query) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/items?q=${query}`);
  const data = await response.json();
  return data;
});

export const fetchSelectedItem = createAsyncThunk('itemList/fetchSelectedItem', async (id) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/items/${id}`);
  const data = await response.json();
  return data;
});

export const fetchTopItems = createAsyncThunk('topItemList/fetchAllTopItems', async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/top-sales`);
  const data = await response.json();
  return data;
});

export const fetchCategories = createAsyncThunk('categoriesList/fetchCategories', async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`);
  const data = await response.json();
  return data;
});

export const sendOrder = createAsyncThunk('cartItemList/sendOrder', async (order) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });
  return response.ok;
});
