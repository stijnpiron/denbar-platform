import { HttpException } from './http.exception';

export class SendExceptionWithPayload extends HttpException {
  constructor(status: number, message: string, payload?: any) {
    super(status, message, payload);
  }
}
