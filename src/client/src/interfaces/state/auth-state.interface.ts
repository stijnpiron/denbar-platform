import { User } from '../user.interface';

export interface AuthState {
  cookie?: string;
  isAuthenticated?: boolean;
  user?: User;
}
