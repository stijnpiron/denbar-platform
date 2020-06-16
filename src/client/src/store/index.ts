import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './store.reducer';
import { initialState as auth } from './auth/auth.reducer';
import { initialState as menu } from './menu/menu.reducer';
import { initialState as products } from './products/products.reducer';
import { AppState } from '../interfaces/state/app-state.interface';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const initialState: AppState = { auth, menu, products };

const middlewares = [thunk];

const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
});

const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middlewares)));

export default store;
