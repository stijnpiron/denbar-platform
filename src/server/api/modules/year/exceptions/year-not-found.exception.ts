import { NOT_FOUND } from 'http-status-codes';
import { HttpException } from '../../../../common/exceptions/http.exception';

export class YearNotFoundException extends HttpException {
  constructor(id: string) {
    super(NOT_FOUND, `Year with id ${id} not found`);
  }
}
