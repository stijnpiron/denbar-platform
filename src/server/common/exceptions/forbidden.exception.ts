import { FORBIDDEN } from 'http-status-codes';
import { HttpException } from './http.exception';

export class ForbiddenException extends HttpException {
  constructor(message = "You're not authorized") {
    super(FORBIDDEN, message);
  }
}
