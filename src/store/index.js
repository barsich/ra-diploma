import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import cartItemList from '../reducers/cartSlice';
import categoriesList from '../reducers/categoriesSlice';
import itemList from '../reducers/itemListSlice';
import thunk from 'redux-thunk';
import topItemList from '../reducers/topItemListSlice';
import { load, save } from 'redux-localstorage-simple';

const reducer = combineReducers({
  topItemListReducer: topItemList.reducer,
  itemListReducer: itemList.reducer,
  categoriesListReducer: categoriesList.reducer,
  cartItemListReducer: cartItemList.reducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
const createStoreWithMiddleware = composeEnhancers(
  applyMiddleware(thunk, save({ states: ['cartItemListReducer.items'], namespace: 'cart' }))
)(createStore);
const store = createStoreWithMiddleware(
  reducer,
  load({ states: ['cartItemListReducer.items'], namespace: 'cart' })
);

export default store;
