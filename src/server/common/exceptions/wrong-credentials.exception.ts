import { UNAUTHORIZED } from 'http-status-codes';
import HttpException from './http.exception';

class WrongCredentialsException extends HttpException {
  constructor() {
    super(UNAUTHORIZED, 'Wrong credentials provided');
  }
}

export default WrongCredentialsException;
