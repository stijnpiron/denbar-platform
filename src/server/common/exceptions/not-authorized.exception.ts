import { FORBIDDEN } from 'http-status-codes';
import HttpException from './http.exception';

class NotAuthorizedException extends HttpException {
  constructor() {
    super(FORBIDDEN, "You're not authorized");
  }
}

export default NotAuthorizedException;
