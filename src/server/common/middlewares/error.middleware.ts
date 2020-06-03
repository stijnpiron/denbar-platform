import { getStatusText, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/http.exception';

export function errorMiddleware(err: HttpException, _req: Request, res: Response, _next: NextFunction): void {
  const code = err.status || INTERNAL_SERVER_ERROR;
  const type = getStatusText(code);
  const message = err.message || 'Something went wrong';
  const data = err.payload || undefined;
  res.status(code).send({ code, type, message, data });
}
