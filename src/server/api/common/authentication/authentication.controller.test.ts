import { server } from '../../../server';
import { UserModel } from '../../modules/user/models/user.model';
import { expect } from 'chai';
import { BAD_REQUEST, OK } from 'http-status-codes';
import { User } from '../../modules/user/interfaces/user.interface';
import { UserTypes } from '../../modules/user/enums/user-types.enum';

describe('Authentication Controller tests', () => {
  let supertest: any = null;
  let testUser: User = {
    name: 'Authentication Service Test User',
    email: 'authentication.service@testusers.com',
    password: 'Password1234',
    type: UserTypes.TESTRUN,
    address: {
      street: 'Muntplein 1',
      city: '1000 Brussels',
      country: 'Belgium',
    },
  };

  before((done) => {
    supertest = require('supertest')(server.getExpressInstance());
    done();
  });

  before(async () => {
    await UserModel.findOneAndDelete({ email: testUser.email });
  });

  after(async () => {
    await UserModel.findByIdAndRemove(testUser._id);
  });

  describe('response codes when not authorized', () => {
    context('/auth', () => {
      context('/auth/2fa', () => {
        /*
         * it('POST /auth/2fa/generate - generateTwoFactorAuthenticationCode - 401', async () => {
         *   const res = await supertest.post('/auth/2fa/generate');
         *   expect(res.status).to.equal(401);
         * });
         * it('POST /auth/2fa/toggle - toggleTwoFactorAuthentication - 401', async () => {
         *   const res = await supertest.get('/auth/2fa/toggle');
         *   expect(res.status).to.equal(401);
         * });
         * it('POST /auth/2fa/authenticate - secondFactorAuthentication - 401', async () => {
         *   const res = await supertest.get('/auth/2fa/authenticate');
         *   expect(res.status).to.equal(401);
         * });
         */
      });

      it('POST /auth/register - register without payload - 400', async () => {
        const res = await supertest.post('/api/auth/register');
        expect(res.status).to.equal(BAD_REQUEST);
      });

      it('POST /auth/register - register with payload - 200', async () => {
        const res = await supertest.post('/api/auth/register').send(testUser);
        testUser = res.body;
        expect(res.status).to.equal(OK);
      });

      it('POST /auth/register - register duplicate user - 400', async () => {
        const res = await supertest.post('/api/auth/register').send(testUser);
        expect(res.status).to.equal(BAD_REQUEST);
      });

      it('POST /auth/login - login without payload - 400', async () => {
        const res = await supertest.post('/api/auth/login');
        expect(res.status).to.equal(BAD_REQUEST);
      });

      it('POST /auth/logout - logout - 200', async () => {
        const res = await supertest.post('/api/auth/logout');
        expect(res.status).to.equal(OK);
      });
    });
  });
});
