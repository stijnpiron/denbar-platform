import HttpException from './http.exception';

class SendExceptionWithPayload extends HttpException {
  constructor(status: number, message: string, payload?: any) {
    super(status, message, payload);
  }
}

export default SendExceptionWithPayload;
