import { NOT_FOUND } from 'http-status-codes';
import { HttpException } from '../../../common/exceptions/http.exception';

export class PeriodNotFoundException extends HttpException {
  constructor(id: string) {
    super(NOT_FOUND, `Period with id ${id} not found`);
  }
}
