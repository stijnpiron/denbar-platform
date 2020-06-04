import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { HttpException } from './http.exception';

export class ServerErrorException extends HttpException {
  constructor(message: string, payload?: any) {
    super(INTERNAL_SERVER_ERROR, message, payload);
  }
}
