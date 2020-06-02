import { HttpException } from './http.exception';
import { SERVICE_UNAVAILABLE } from 'http-status-codes';

export class ServiceUnavailableException extends HttpException {
  constructor(service: string) {
    super(SERVICE_UNAVAILABLE, `Unable to connect to ${service}, please try again`);
  }
}
