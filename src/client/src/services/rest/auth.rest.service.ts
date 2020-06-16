import { LoginData } from '../../interfaces/login-data.interface';
import { RegisterData } from '../../interfaces/register-data.interface';
import api from '../../utils/api';

export enum AuthRestActions {
  AUTHENTICATE = 'authenticate',
  LOGIN = 'login',
  LOGOUT = 'logout',
  REGISTER = 'register',
}

const basePath = '/auth';

const authenticate = () => api.get(`${basePath}/authenticate`);

const login = (data: LoginData) => api.post(`${basePath}/login`, data).then(res => res.data);

const logout = () => api.post(`${basePath}/logout`).then(res => res.data);

const register = (data: RegisterData) =>
  api.post(`${basePath}/register`, data).then(res => {
    return res.data;
  });

const AuthRestService = (options: { action: string; path?: string; data?: any }): any => {
  const { action, path, data } = options;
  switch (action) {
    case AuthRestActions.AUTHENTICATE:
      return authenticate();
    case AuthRestActions.LOGIN:
      return login(data);
    case AuthRestActions.LOGOUT:
      return logout();
    case AuthRestActions.REGISTER:
      return register(data);
    default:
      return;
  }
};

export default AuthRestService;
