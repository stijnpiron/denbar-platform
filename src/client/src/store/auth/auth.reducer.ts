import { AuthData } from '../../interfaces/state/auth-data.interface';
import { Action } from '../../interfaces/state/action.interface';
import * as actions from './auth.actions';
import { Error } from '../../interfaces/error.interface';
import { ObjectState } from '../../interfaces/state/state.interface';

export const initialState: ObjectState<AuthData> = {
  data: { token: localStorage.getItem('token') || undefined },
};

const {
  USER_LOGIN,
  USER_LOGIN_FAILED,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_LOGOUT_FAILED,
  USER_LOGOUT_SUCCESS,
  USER_REGISTER,
  USER_REGISTER_FAILED,
  USER_REGISTER_SUCCESS,
} = actions;

// TODO: check to split reducers
const authReducer = (state: ObjectState<AuthData> = initialState, action: Action): ObjectState<AuthData> => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGIN:
      return userLogin(state);
    case USER_LOGIN_FAILED:
      return userLoginFailed(state, payload as Error);
    case USER_LOGIN_SUCCESS:
      return userLoginSuccess(state, payload as AuthData);
    case USER_LOGOUT:
      return userLogout(state);
    case USER_LOGOUT_FAILED:
      return userLogoutFailed(state, payload as Error);
    case USER_LOGOUT_SUCCESS:
      return userLogoutSuccess(state);
    case USER_REGISTER:
      return userRegister(state);
    case USER_REGISTER_FAILED:
      return userRegisterFailed(state, payload as Error);
    case USER_REGISTER_SUCCESS:
      return userRegisterSuccess(state, payload as any);
    default:
      return state;
  }
};

const userLogin = (state: ObjectState<AuthData>): ObjectState<AuthData> => ({
  ...state,
  loading: true,
  loaded: false,
  success: false,
  failed: false,
  data: {},
});

const userLoginSuccess = (state: ObjectState<AuthData>, authData: AuthData): ObjectState<AuthData> => {
  if (authData.token) {
    localStorage.setItem('token', authData.token);
  }

  return {
    ...state,
    loading: false,
    loaded: true,
    success: true,
    failed: false,
    data: {
      ...state.data,
      token: authData.token,
      isAuthenticated: true,
      user: authData.user,
    },
  };
};

const userLoginFailed = (state: ObjectState<AuthData>, error: Error): ObjectState<AuthData> => ({
  ...state,
  loading: false,
  loaded: true,
  success: false,
  failed: true,
  data: {
    ...state.data,
    user: undefined,
    token: undefined,
  },
  error,
});

const userLogout = (state: ObjectState<AuthData>): ObjectState<AuthData> => ({
  ...state,
  loading: true,
  loaded: false,
  success: false,
  failed: false,
  data: {
    ...state.data,
  },
});

const userLogoutFailed = (state: ObjectState<AuthData>, error: Error): ObjectState<AuthData> => ({
  ...state,
  loading: false,
  loaded: true,
  success: false,
  failed: true,
  data: {
    ...state.data,
  },
  error,
});

const userLogoutSuccess = (state: ObjectState<AuthData>): ObjectState<AuthData> => {
  localStorage.removeItem('token');
  return {
    ...state,
    loading: false,
    loaded: true,
    success: true,
    failed: false,
    data: {},
  };
};

const userRegister = (state: ObjectState<AuthData>): ObjectState<AuthData> => ({
  ...state,
  loading: true,
  loaded: false,
  success: false,
  failed: false,
  data: {},
});

const userRegisterFailed = (state: ObjectState<AuthData>, error: Error): ObjectState<AuthData> => {
  localStorage.removeItem('token');
  return {
    ...state,
    loading: false,
    loaded: true,
    success: false,
    failed: true,
    data: {},
    error,
  };
};

const userRegisterSuccess = (state: ObjectState<AuthData>, authData: AuthData): ObjectState<AuthData> => {
  if (authData.token) {
    localStorage.setItem('token', authData.token);
  }

  return {
    ...state,
    loading: false,
    loaded: true,
    success: true,
    failed: false,
    data: {
      ...state.data,
      isAuthenticated: true,
      user: authData.user,
      token: authData.token,
    },
  };
};

export default authReducer;
