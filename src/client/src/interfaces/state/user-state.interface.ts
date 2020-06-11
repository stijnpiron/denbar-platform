import { Error } from '../error.interface';

export interface UserState {
  userInfo: any | null;
  loggedIn: boolean;
  loggingIn: boolean;
  loading: boolean;
  success: boolean;
  error: Error | null;
}

export interface User {
  name: string;
  email: string;
  password?: string;
  id: string;
}
