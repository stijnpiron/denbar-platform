import { NOT_FOUND } from 'http-status-codes';
import { HttpException } from '../../../common/exceptions/http.exception';

export class AllianceNotFoundException extends HttpException {
  constructor(id: string) {
    super(NOT_FOUND, `Alliance with id ${id} not found`);
  }
}
