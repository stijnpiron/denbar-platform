import { NextFunction, RequestHandler, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticationTokenMissingException } from '../exceptions/authentication-toke-missing.exception';
import { DataStoredInToken } from '../interfaces/data-stored-in-token.interface';
import { RequestWithUser } from '../interfaces/request-with-user.interface';
import { userModel } from '../../modules/user/models/user.model';
import { WrongAuthenticationTokenException } from '../exceptions/wrong-authentication-token.exception';

export function authMiddleware(omitSecondFactor = false): RequestHandler {
  return async (req: RequestWithUser, _: Response, next: NextFunction): Promise<void> => {
    const { cookies } = req;

    if (cookies && cookies.Authorization) {
      const secret = process.env.JWT_SECRET;

      try {
        const verificationResponse = jwt.verify(cookies.Authorization, secret) as DataStoredInToken;
        const { _id: id, isSecondFactorAuthenticated } = verificationResponse;
        const user = await userModel.findById(id);

        if (user)
          if (!omitSecondFactor && user.isTwoFactorAuthenticationEnabled && !isSecondFactorAuthenticated) {
            next(new WrongAuthenticationTokenException());
          } else {
            req.user = user;
            next();
          }
        else next(new WrongAuthenticationTokenException());
      } catch (error) {
        next(new WrongAuthenticationTokenException());
      }
    } else {
      next(new AuthenticationTokenMissingException());
    }
  };
}
