import { NOT_FOUND } from 'http-status-codes';
import { HttpException } from './http.exception';

export class PostNotFoundException extends HttpException {
  constructor(id: string) {
    super(NOT_FOUND, `Post with id ${id} not found`);
  }
}
