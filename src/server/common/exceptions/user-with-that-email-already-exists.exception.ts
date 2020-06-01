import { BAD_REQUEST } from 'http-status-codes';
import HttpException from './http.exception';

class UserWithThatEmailAlreadyExistsException extends HttpException {
  constructor(email: string) {
    super(BAD_REQUEST, `User with email ${email} already exists`);
  }
}

export default UserWithThatEmailAlreadyExistsException;
