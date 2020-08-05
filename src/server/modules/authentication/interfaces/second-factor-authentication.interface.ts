import { User } from '../../user/interfaces/user.interface';

export interface SecondFactorAuthentication {
  cookie: string;
  result: User;
}
