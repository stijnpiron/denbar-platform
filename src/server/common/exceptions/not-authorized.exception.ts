import { FORBIDDEN } from 'http-status-codes';
import { HttpException } from './http.exception';

export class NotAuthorizedException extends HttpException {
  constructor() {
    super(FORBIDDEN, "You're not authorized");
  }
}
