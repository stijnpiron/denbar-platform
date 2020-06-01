import User from '../../user/interfaces/user.interface';

export default interface SecondFactorAuthentication {
  cookie: string;
  result: User;
}
