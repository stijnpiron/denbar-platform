import axios from 'axios';
import store from '../store';
import storeActions from '../store/store.actions';

const { logoutUser, logoutUserSuccess } = storeActions.auth.Actions;

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
/**
 intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired
 logout the user if the token has expired
**/

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response.data.code === 401) {
      store.dispatch(logoutUser());
      store.dispatch(logoutUserSuccess());
    }
    return Promise.reject(err.response.data);
  }
);

export default api;
