import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { productReducer } from './productReducer';
import { cartReducer } from './cartReducer';
import { orderReducer } from './orderReducer';
import { authReducer } from './authReducer';
import { uiReducer } from './uiReducer';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer,
  auth: authReducer,
  ui: uiReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
