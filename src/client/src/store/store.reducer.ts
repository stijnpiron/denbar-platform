import app from './app/app.reducer';
import user from './user/user.reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  app,
  user,
});

export default rootReducer;
