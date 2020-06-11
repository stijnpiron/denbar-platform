import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.scss';
import App from './App/App';
import configureStore from './store/store';

/*
 * declare global {
 *   interface Window {
 *     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
 *   }
 * }
 */

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(rootReducer, composeEnhancers());
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
