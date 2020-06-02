import { UNAUTHORIZED } from 'http-status-codes';
import { HttpException } from './http.exception';

export class WrongAuthenticationTokenException extends HttpException {
  constructor() {
    super(UNAUTHORIZED, 'Wrong authentication token');
  }
}
