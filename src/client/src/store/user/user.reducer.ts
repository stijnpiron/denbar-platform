import { UserState } from '../../interfaces/state/user-state.interface';
import { Action } from '../../interfaces/state/action.interface';
import * as actions from './user.actions';
import { Error } from '../../interfaces/error.interface';

export const initialState: UserState = {
  userInfo: null,
  loggedIn: false,
  loggingIn: false,
  loading: false,
  success: false,
  error: null,
};

// TODO: check to split reducers
const user = (state = initialState, action: Action): UserState => {
  switch (action.type) {
    case actions.USER_LOGIN:
      return userLogin(state);
    case actions.USER_LOGIN_SUCCESS:
      return userLoginSuccess(state, action.payload as any);
    case actions.USER_LOGIN_FAILED:
      return userLoginFailed(action.payload as Error);
    case actions.USER_LOGOUT:
      return userLogout();
    case actions.USER_LOGOUT_SUCCESS:
      return userLogoutSuccess();
    case actions.USER_REGISTER:
      return userRegister(state);
    case actions.USER_REGISTER_SUCCESS:
      return userRegisterSuccess(state);
    default:
      return state;
  }
};

const userLogin = (state: UserState): UserState => ({ ...state, loggingIn: true });

const userLoginSuccess = (state: UserState, userInfo: any): UserState => ({
  ...state,
  userInfo,
  loggedIn: true,
  loggingIn: false,
  success: true,
});

const userLoginFailed = (error: Error): UserState => ({
  ...initialState,
  error,
});

const userLogout = (): UserState => ({ ...initialState, loading: true });

const userLogoutSuccess = (): UserState => ({ ...initialState });

const userRegister = (state: UserState): UserState => ({ ...state });

const userRegisterSuccess = (state: UserState): UserState => ({ ...state });

export default user;
