import { LoginData } from './../interfaces/login-data.interface';
import storeActions from '../store/store.actions';
import { Action } from '../interfaces/state/action.interface';
import { Dispatch } from 'react';
import AuthRestService, { AuthRestActions } from './rest/auth.rest.service';
import { User } from '../interfaces/user.interface';
import { RegisterData } from '../interfaces/register-data.interface';

const {
  loginUser,
  loginUserFailed,
  loginUserSuccess,
  logoutUser,
  logoutUserFailed,
  logoutUserSuccess,
  registerUser,
  registerUserFailed,
  registerUserSuccess,
} = storeActions.auth.Actions;

const { LOGIN, LOGOUT, REGISTER } = AuthRestActions;

const login = async (data: LoginData, dispatch: Dispatch<any>): Promise<void | Action> => {
  dispatch(loginUser());
  return await AuthRestService({ action: LOGIN, data })
    .then((user: User) => dispatch(loginUserSuccess(user)))
    .catch((err: any) => dispatch(loginUserFailed(err)));
};

const logout = async (dispatch: Dispatch<any>): Promise<void | Action> => {
  dispatch(logoutUser());
  return await AuthRestService({ action: LOGOUT })
    .then(() => dispatch(logoutUserSuccess()))
    .catch((err: any) => dispatch(logoutUserFailed(err)));
};

const register = async (data: RegisterData, dispatch: Dispatch<any>): Promise<void | Action> => {
  dispatch(registerUser());
  return await AuthRestService({ action: REGISTER })
    .then((user: User) => dispatch(registerUserSuccess(user)))
    .catch((err: any) => dispatch(registerUserFailed(err)));
};

const AuthService = { login, logout, register };
export default AuthService;
