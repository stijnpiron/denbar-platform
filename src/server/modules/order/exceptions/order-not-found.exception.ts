import { NOT_FOUND } from 'http-status-codes';
import { HttpException } from '../../../common/exceptions/http.exception';

export class OrderNotFoundException extends HttpException {
  constructor(id: string) {
    super(NOT_FOUND, `Order with id ${id} not found`);
  }
}
