import { UNAUTHORIZED } from 'http-status-codes';
import HttpException from './http.exception';

class AuthenticationTokenMissingException extends HttpException {
  constructor() {
    super(UNAUTHORIZED, 'Authentication token missing');
  }
}

export default AuthenticationTokenMissingException;
