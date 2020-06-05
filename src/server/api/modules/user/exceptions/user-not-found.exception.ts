import { NOT_FOUND } from 'http-status-codes';
import { HttpException } from '../../../../common/exceptions/http.exception';

export class UserNotFoundException extends HttpException {
  constructor(id: string) {
    super(NOT_FOUND, `User with id ${id} not found`);
  }
}
