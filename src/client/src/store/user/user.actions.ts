import { Error } from '../../interfaces/error.interface';
import { Action } from '../../interfaces/state/action.interface';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_REGISTER = 'USER_REGISTER';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';

const loginUser = (): Action => ({ type: USER_LOGIN });
const loginUserFailed = (payload: Error): Action => ({ type: USER_LOGIN_FAILED, payload });
const loginUserSuccess = (userData: any): Action => ({
  type: USER_LOGIN_SUCCESS,
  payload: userData,
});
const logoutUser = (): Action => ({ type: USER_LOGOUT });
const logoutUserSuccess = (): Action => ({ type: USER_LOGOUT_SUCCESS });
const registerUser = (): Action => ({ type: USER_REGISTER });
const registerUserSuccess = (): Action => ({ type: USER_REGISTER_SUCCESS });

export const Actions = {
  loginUser,
  loginUserFailed,
  loginUserSuccess,
  logoutUser,
  logoutUserSuccess,
  registerUser,
  registerUserSuccess,
};
