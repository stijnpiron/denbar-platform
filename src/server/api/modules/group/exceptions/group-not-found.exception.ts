import { NOT_FOUND } from 'http-status-codes';
import { HttpException } from '../../../../common/exceptions/http.exception';

export class GroupNotFoundException extends HttpException {
  constructor(id: string) {
    super(NOT_FOUND, `Group with id ${id} not found`);
  }
}
