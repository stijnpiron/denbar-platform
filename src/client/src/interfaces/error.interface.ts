export interface Error {
  code?: number;
  type?: string;
  message: string | null;
  source?: ErrorSource;
  object?: {};
}
export enum ErrorSource {
  AUTH = 'auth',
  LOGIN = 'login',
  LOGOUT = 'logout',
  REGISTER = 'register',
}
