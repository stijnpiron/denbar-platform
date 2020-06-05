import { NOT_FOUND } from 'http-status-codes';
import { HttpException } from '../../../common/exceptions/http.exception';

export class ProductNotFoundException extends HttpException {
  constructor(id: string) {
    super(NOT_FOUND, `Product with id ${id} not found`);
  }
}
