import { BAD_REQUEST } from 'http-status-codes';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import express from 'express';
import { HttpException } from '../exceptions/http.exception';

export function validationMiddleware<T>(type: any, skipMissingProperties = false): express.RequestHandler {
  return (req, _, next): void => {
    validate(plainToClass(type, req.body), { skipMissingProperties }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
        next(new HttpException(BAD_REQUEST, message));
      } else {
        next();
      }
    });
  };
}
