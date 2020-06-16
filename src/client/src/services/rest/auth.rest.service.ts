import { LoginData } from '../../interfaces/login-data.interface';
import { RegisterData } from '../../interfaces/register-data.interface';
import api from '../../utils/api';

export default class AuthService {
  private basePath = '/auth';

  public authenticate = () => api.get(`${this.basePath}/authenticate`);

  public login = (data: LoginData) => api.post(`${this.basePath}/login`, data).then((res) => res.data);

  public register = (data: RegisterData) =>
    api.post(`${this.basePath}/register`, data).then((res) => {
      return res.data;
    });
}
