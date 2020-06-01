import express from 'express';
import { OK } from 'http-status-codes';
import AuthenticationService from './authentication.service';
import authMiddleware from '../../common/middlewares/auth.middleware';
import Controller from '../../common/interfaces/controller.interface';
import CreateUserDto from './dtos/create-user.dto';
import LoginDto from './dtos/login.dto';
import RequestWithUser from '../../common/interfaces/request-with-user.interface';
import TwoFactorAuthenticationDto from './dtos/two-factor-authentication.dto';
import userModel from '../user/models/user.model';
import validationMiddleware from '../../common/middlewares/validation.middleware';
import WrongTwoFactorAuthenticationCodeException from '../../common/exceptions/wrong-two-factor-authentication-code.exception';

class AuthenticationController implements Controller {
  public path = '/auth';
  public router = express.Router();
  private authenticationService = new AuthenticationService();
  private user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(`${this.path}/register`, validationMiddleware(CreateUserDto), this.registration);

    this.router.post(`${this.path}/login`, validationMiddleware(LoginDto), this.loggingIn);
    this.router.post(`${this.path}/logout`, this.loggingOut);

    this.router.post(`${this.path}/2fa/authenticate`, validationMiddleware(TwoFactorAuthenticationDto), authMiddleware(true), this.secondFactorAuthentication);

    this.router
      .all(`${this.path}/*`, authMiddleware())
      .get(`${this.path}`, authMiddleware(), this.auth)
      .post(`${this.path}/2fa/generate`, this.generateTwoFactorAuthenticationCode)
      .post(`${this.path}/2fa/toggle`, validationMiddleware(TwoFactorAuthenticationDto), this.toggleTwoFactorAuthentication);
  }

  private registration = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const userData: CreateUserDto = req.body;

    try {
      const { cookie, user } = await this.authenticationService.register(userData);
      res.setHeader('Set-Cookie', [cookie]);
      res.status(OK).send(user);
    } catch (err) {
      next(err);
    }
  };

  private loggingIn = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const loginData: LoginDto = req.body;

    try {
      const { cookie, user, isTwoFactorAuthenticationEnabled } = await this.authenticationService.login(loginData);
      res.setHeader('Set-Cookie', cookie);

      if (isTwoFactorAuthenticationEnabled) res.status(OK).send({ isTwoFactorAuthenticationEnabled });
      else res.status(OK).send(user);
    } catch (err) {
      next(err);
    }
  };

  private loggingOut = async (_: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
      const { cookie } = await this.authenticationService.logout();
      res.setHeader('Set-Cookie', cookie);
      res.status(OK).send();
    } catch (err) {
      next(err);
    }
  };

  private generateTwoFactorAuthenticationCode = async (req: RequestWithUser, res: express.Response): Promise<void> => {
    const { user } = req;

    const { otpauthUrl, base32 } = this.authenticationService.getTwoFactorAuthenticationCode();

    await this.user.findByIdAndUpdate(user._id, {
      twoFactorAuthenticationCode: base32,
    });
    this.authenticationService.respondWithQRCode(otpauthUrl, res);
  };

  private toggleTwoFactorAuthentication = async (req: RequestWithUser, res: express.Response, next: express.NextFunction): Promise<void> => {
    const { twoFactorAuthenticationCode } = req.body;
    const { user } = req;

    const isCodeValid = await this.authenticationService.verifyTwoFactorAuthenticationCode(twoFactorAuthenticationCode, user);

    if (isCodeValid) {
      await this.user.findByIdAndUpdate(user._id, {
        isTwoFactorAuthenticationEnabled: !user.isTwoFactorAuthenticationEnabled,
      });
      res.status(OK).send();
    } else {
      next(new WrongTwoFactorAuthenticationCodeException());
    }
  };

  private secondFactorAuthentication = async (req: RequestWithUser, res: express.Response, next: express.NextFunction): Promise<void> => {
    const { twoFactorAuthenticationCode } = req.body;
    const { user } = req;

    try {
      const { cookie, result } = await this.authenticationService.secondFactorAuthentication(twoFactorAuthenticationCode, user);
      res.setHeader('Set-Cookie', cookie);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };

  private auth = (req: RequestWithUser, res: express.Response): void => {
    res.send({
      ...req.user,
      password: undefined,
      twoFactorAuthenticationCode: undefined,
    });
  };
}

export default AuthenticationController;
