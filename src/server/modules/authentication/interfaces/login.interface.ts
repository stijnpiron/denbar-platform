import { User } from '../../user/interfaces/user.interface';

export interface Login {
  cookie: string;
  user?: User;
  isTwoFactorAuthenticationEnabled?: boolean;
}
