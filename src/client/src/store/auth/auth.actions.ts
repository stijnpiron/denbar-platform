import { Error } from '../../interfaces/error.interface';
import { Action } from '../../interfaces/state/action.interface';
import { User } from '../../interfaces/user.interface';

export const AUTH_CHECK = 'AUTH_CHECK';
export const AUTH_CHECK_FAILED = 'AUTH_CHECK_FAILED';
export const AUTH_CHECK_SUCCESS = 'AUTH_CHECK_SUCCESS';
export const CLEAR_AUTH_ERRORS = 'CLEAR_AUTH_ERRORS';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_LOGOUT_FAILED = 'USER_LOGOUT_FAILED';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_REGISTER = 'USER_REGISTER';
export const USER_REGISTER_FAILED = 'USER_REGISTER_FAILED';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';

const checkAuth = (): Action => ({ type: AUTH_CHECK });

const checkAuthFailed = (payload: Error): Action => ({
  type: AUTH_CHECK_FAILED,
  payload,
});

const checkAuthSuccess = (userData: User): Action => ({
  type: AUTH_CHECK_SUCCESS,
  payload: userData,
});

const clearAuthErrors = (): Action => ({ type: CLEAR_AUTH_ERRORS });

const loginUser = (): Action => ({ type: USER_LOGIN });

const loginUserFailed = (payload: Error): Action => ({
  type: USER_LOGIN_FAILED,
  payload,
});

const loginUserSuccess = (userData: User): Action => ({
  type: USER_LOGIN_SUCCESS,
  payload: userData,
});

const logoutUser = (): Action => ({ type: USER_LOGOUT });

const logoutUserFailed = (payload: Error): Action => ({
  type: USER_LOGOUT_FAILED,
  payload,
});

const logoutUserSuccess = (): Action => ({ type: USER_LOGOUT_SUCCESS });

const registerUser = (): Action => ({ type: USER_REGISTER });

const registerUserFailed = (payload: Error): Action => ({
  type: USER_REGISTER_FAILED,
  payload,
});

const registerUserSuccess = (userData: User): Action => ({
  type: USER_REGISTER_SUCCESS,
  payload: userData,
});

export const Actions = {
  checkAuth,
  checkAuthFailed,
  checkAuthSuccess,
  clearAuthErrors,
  loginUser,
  loginUserFailed,
  loginUserSuccess,
  logoutUser,
  logoutUserFailed,
  logoutUserSuccess,
  registerUser,
  registerUserFailed,
  registerUserSuccess,
};
