import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import QRCode from 'qrcode';
import speakeasy from 'speakeasy';
import { Login } from './interfaces/login.interface';
import { LoginDto } from './dtos/login.dto';
import { Logout } from './interfaces/logout.interface';
import { Register } from './interfaces/register.interface';
import { SecondFactorAuthentication } from './interfaces/second-factor-authentication.interface';
import { TokenData } from './interfaces/token-data.interface';
import { TwoFactorAuthenticationCode } from './interfaces/two-factor-authentication-code.interface';
import { User, UserOptional } from '../../modules/user/interfaces/user.interface';
import { UserModel } from '../../modules/user/models/user.model';
import { UserWithThatEmailAlreadyExistsException } from '../../common/exceptions/user-with-that-email-already-exists.exception';
import { SendExceptionWithPayload } from '../../common/exceptions/send-exception-with-payload.exception';
import { WrongCredentialsException } from '../../common/exceptions/wrong-credentials.exception';
import { WrongAuthenticationTokenException } from '../../common/exceptions/wrong-authentication-token.exception';
import { DataStoredInToken } from '../../common/interfaces/data-stored-in-token.interface';

export class AuthenticationService {
  private user = UserModel;

  public register = async (userData: UserOptional): Promise<Register> => {
    if (await this.user.findOne({ email: userData.email })) throw new UserWithThatEmailAlreadyExistsException(userData.email);

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    try {
      const user = await this.user.create({
        ...userData,
        password: hashedPassword,
      });
      user.password = undefined;
      const tokenData = this.createToken(user);
      const cookie = this.createCookie(tokenData);

      return {
        cookie,
        user,
      };
    } catch (errMessage) {
      throw new SendExceptionWithPayload(INTERNAL_SERVER_ERROR, 'Unable to register new user', { errMessage, userData });
    }
  };

  public login = async (loginData: LoginDto): Promise<Login> => {
    const user = await this.user.findOne({ email: loginData.email });

    if (user) {
      const isPasswordMatching = await bcrypt.compare(loginData.password, user.password);

      if (isPasswordMatching) {
        user.password = undefined;
        user.twoFactorAuthenticationCode = undefined;
        const tokenData = this.createToken(user);
        const cookie = this.createCookie(tokenData);

        if (user.isTwoFactorAuthenticationEnabled) return { cookie, isTwoFactorAuthenticationEnabled: true };

        return { cookie, user };
      }
      throw new WrongCredentialsException();
    }
    throw new WrongCredentialsException();
  };

  public logout = async (): Promise<Logout> => {
    const cookie = this.createCookie();

    return { cookie };
  };

  public secondFactorAuthentication = async (twoFactorAuthenticationCode: string, user: User): Promise<SecondFactorAuthentication> => {
    const isCodeValid = await this.verifyTwoFactorAuthenticationCode(twoFactorAuthenticationCode, user);

    if (isCodeValid) {
      const tokenData = this.createToken(user, true);
      const cookie = this.createCookie(tokenData);
      user.password = undefined;
      user.twoFactorAuthenticationCode = undefined;

      return { cookie, result: user };
    }
    throw new WrongAuthenticationTokenException();
  };

  public getTwoFactorAuthenticationCode = (): TwoFactorAuthenticationCode => {
    const secretCode = speakeasy.generateSecret({
      name: process.env.TWO_FACTOR_AUTHENTICATION_APP_NAME,
      length: 64,
    });

    return {
      otpauthUrl: secretCode.otpauth_url,
      base32: secretCode.base32,
    };
  };

  public respondWithQRCode = (data: string, res: Response): any => {
    QRCode.toFileStream(res, data);
  };

  public verifyTwoFactorAuthenticationCode(twoFactorAuthenticationCode: string, user: User): boolean {
    return speakeasy.totp.verify({
      secret: user.twoFactorAuthenticationCode,
      encoding: 'base32',
      token: twoFactorAuthenticationCode,
    });
  }

  public createToken(user: User, isSecondFactorAuthenticated = false): TokenData {
    const expiresIn = +process.env.JWT_TTL;
    const secret = process.env.JWT_SECRET;

    const dataStoredInToken: DataStoredInToken = {
      isSecondFactorAuthenticated,
      _id: user._id,
      role: user.role,
    };

    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }

  public createCookie(tokenData: TokenData = { token: '', expiresIn: 0 }): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }

  public getRoleForUser = async (userId: string): Promise<string> => {
    const userData = await this.user.findById(userId).select('role');

    return userData.role;
  };
}
