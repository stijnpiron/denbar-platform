import { User } from './user.interface';

export interface AuthResponse {
  user?: User;
  cookie?: string;
}
