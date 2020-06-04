import { User } from '../../../modules/user/interfaces/user.interface';

export interface SecondFactorAuthentication {
  cookie: string;
  result: User;
}
