import User from '../../user/interfaces/user.interface';

export default interface Login {
  cookie: string;
  user?: User;
  isTwoFactorAuthenticationEnabled?: boolean;
}
