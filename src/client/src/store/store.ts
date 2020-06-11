import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './store.reducer';
import { initialState as app } from './app/app.reducer';
import { initialState as user } from './user/user.reducer';
import { State } from '../interfaces/state/state.interface';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const initialState: State = { app, user };

export default function configureStore(preloadedState = initialState): any {
  const middlewares = [thunk];

  const composeEnhancers = composeWithDevTools({
    trace: true,
    traceLimit: 25,
  });

  const store = createStore(rootReducer, preloadedState, composeEnhancers(applyMiddleware(...middlewares)));

  return store;
}
