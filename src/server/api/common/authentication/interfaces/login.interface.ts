import { User } from '../../../modules/user/interfaces/user.interface';

export interface Login {
  cookie: string;
  user?: User;
  isTwoFactorAuthenticationEnabled?: boolean;
}
