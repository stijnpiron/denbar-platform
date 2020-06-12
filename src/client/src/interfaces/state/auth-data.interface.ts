import { User } from '../user.interface';

export interface AuthData {
  token?: string;
  isAuthenticated?: boolean;
  user?: User;
}
