import { NOT_FOUND } from 'http-status-codes';
import { HttpException } from '../../../common/exceptions/http.exception';

export class ProfileNotFoundException extends HttpException {
  constructor(id: string) {
    super(NOT_FOUND, `Profile with id ${id} not found`);
  }
}
