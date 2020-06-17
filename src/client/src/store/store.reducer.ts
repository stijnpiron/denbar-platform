import { combineReducers, Reducer } from 'redux';

import authReducer from './auth/auth.reducer';
import menuReducer from './menu/menu.reducer';
import productsReducer from './products/products.reducer';

import { AppState } from '../interfaces/state/app-state.interface';

const rootReducer: Reducer<AppState> = combineReducers({
  auth: authReducer,
  menu: menuReducer,
  products: productsReducer,
});

export default rootReducer;
