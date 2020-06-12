import { combineReducers, Reducer } from 'redux';

import menuReducer from './menu/menu.reducer';
import authReducer from './auth/auth.reducer';
import { AppState } from '../interfaces/state/app-state.interface';

const rootReducer: Reducer<AppState> = combineReducers({
  menu: menuReducer,
  auth: authReducer,
});

export default rootReducer;
