import { AuthState } from '../../interfaces/state/auth-state.interface';
import { Action } from '../../interfaces/state/action.interface';
import * as actions from './auth.actions';
import { Error, ErrorSource } from '../../interfaces/error.interface';
import { ObjectState } from '../../interfaces/state/state.interface';
import { User } from '../../interfaces/user.interface';

export const initialState: ObjectState<AuthState> = {
  data: { cookie: localStorage.getItem('cookie') || undefined },
};

const {
  AUTH_CHECK,
  AUTH_CHECK_FAILED,
  AUTH_CHECK_SUCCESS,
  CLEAR_AUTH_ERRORS,
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
const authReducer = (state: ObjectState<AuthState> = initialState, action: Action): ObjectState<AuthState> => {
  const { type, payload } = action;
  switch (type) {
    case AUTH_CHECK:
      return checkAuth(state);
    case AUTH_CHECK_FAILED:
      return checkAuthFailed(state, payload as Error);
    case AUTH_CHECK_SUCCESS:
      return checkAuthSuccess(state, payload as User);
    case CLEAR_AUTH_ERRORS:
      return clearAuthErrors(state);
    case USER_LOGIN:
      return userLogin(state);
    case USER_LOGIN_FAILED:
      return userLoginFailed(state, payload as Error);
    case USER_LOGIN_SUCCESS:
      return userLoginSuccess(state, payload as User);
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

const checkAuth = (state: ObjectState<AuthState>): ObjectState<AuthState> => ({
  ...state,
  loading: true,
  loaded: false,
  success: false,
  failed: false,
  data: {},
  error: undefined,
});

const checkAuthFailed = (state: ObjectState<AuthState>, error: Error): ObjectState<AuthState> => ({
  ...state,
  loading: false,
  loaded: true,
  success: false,
  failed: true,
  data: {
    ...state.data,
    user: undefined,
  },
  error: { ...error, source: ErrorSource.AUTH },
});

const checkAuthSuccess = (state: ObjectState<AuthState>, user: User): ObjectState<AuthState> => {
  return {
    ...state,
    loading: false,
    loaded: true,
    success: true,
    failed: false,
    data: {
      ...state.data,
      isAuthenticated: true,
      user,
    },
    error: undefined,
  };
};

const clearAuthErrors = (state: ObjectState<AuthState>): ObjectState<AuthState> => {
  return {
    ...state,
    error: undefined,
  };
};

const userLogin = (state: ObjectState<AuthState>): ObjectState<AuthState> => ({
  ...state,
  loading: true,
  loaded: false,
  success: false,
  failed: false,
  data: {},
  error: undefined,
});

const userLoginSuccess = (state: ObjectState<AuthState>, user: User): ObjectState<AuthState> => {
  return {
    ...state,
    loading: false,
    loaded: true,
    success: true,
    failed: false,
    data: {
      ...state.data,
      isAuthenticated: true,
      user,
    },
    error: undefined,
  };
};

const userLoginFailed = (state: ObjectState<AuthState>, error: Error): ObjectState<AuthState> => ({
  ...state,
  loading: false,
  loaded: true,
  success: false,
  failed: true,
  data: {
    ...state.data,
    user: undefined,
  },
  error: { ...error, source: ErrorSource.LOGIN },
});

const userLogout = (state: ObjectState<AuthState>): ObjectState<AuthState> => ({
  ...state,
  loading: true,
  loaded: false,
  success: false,
  failed: false,
  data: {
    ...state.data,
  },
  error: undefined,
});

const userLogoutFailed = (state: ObjectState<AuthState>, error: Error): ObjectState<AuthState> => ({
  ...state,
  loading: false,
  loaded: true,
  success: false,
  failed: true,
  data: {
    ...state.data,
  },
  error: { ...error, source: ErrorSource.LOGOUT },
});

const userLogoutSuccess = (state: ObjectState<AuthState>): ObjectState<AuthState> => {
  localStorage.removeItem('cookie');

  return {
    ...state,
    loading: false,
    loaded: true,
    success: true,
    failed: false,
    data: {},
    error: undefined,
  };
};

const userRegister = (state: ObjectState<AuthState>): ObjectState<AuthState> => ({
  ...state,
  loading: true,
  loaded: false,
  success: false,
  failed: false,
  data: {},
  error: undefined,
});

const userRegisterFailed = (state: ObjectState<AuthState>, error: Error): ObjectState<AuthState> => {
  localStorage.removeItem('cookie');
  return {
    ...state,
    loading: false,
    loaded: true,
    success: false,
    failed: true,
    data: {},
    error: { ...error, source: ErrorSource.REGISTER },
  };
};

const userRegisterSuccess = (state: ObjectState<AuthState>, authState: AuthState): ObjectState<AuthState> => {
  const { cookie } = authState;
  if (cookie) {
    localStorage.setItem('cookie', cookie);
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
      user: authState.user,
    },
    error: undefined,
  };
};

export default authReducer;
