import { BAD_REQUEST } from 'http-status-codes';
import { HttpException } from './http.exception';

export class WrongTwoFactorAuthenticationCodeException extends HttpException {
  constructor() {
    super(BAD_REQUEST, 'Invalid two factor authentication token');
  }
}
