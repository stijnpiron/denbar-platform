import { UNAUTHORIZED } from 'http-status-codes';
import { HttpException } from './http.exception';

export class WrongCredentialsException extends HttpException {
  constructor() {
    super(UNAUTHORIZED, 'Wrong credentials provided');
  }
}
