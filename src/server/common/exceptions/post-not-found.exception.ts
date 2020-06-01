import { NOT_FOUND } from 'http-status-codes';
import HttpException from './http.exception';

class PostNotFoundException extends HttpException {
  constructor(id: string) {
    super(NOT_FOUND, `Post with id ${id} not found`);
  }
}

export default PostNotFoundException;
