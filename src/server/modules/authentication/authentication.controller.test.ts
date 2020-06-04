import { expect } from 'chai';
import { server } from '../../server';
import { User } from '../user/interfaces/user.interface';
import { userModel } from '../user/models/user.model';

describe('Authentication Controller tests', () => {
  let supertest: any = null;
  let testUser: User = null;

  before(async () => {
    supertest = require('supertest')(server.getExpressInstance());
  });

  after(async () => {
    await userModel.findByIdAndDelete(testUser._id);
  });

  describe('response codes when not authorized', () => {
    context('/auth', () => {
      testUser = {
        name: 'Authentication Service Test User',
        email: 'authentication.service@testusers.com',
        password: 'Password1234',
        address: {
          street: 'Muntplein 1',
          city: '1000 Brussels',
          country: 'Belgium',
        },
      };

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
        expect(res.status).to.equal(400);
      });

      it('POST /auth/register - register with payload - 200', async () => {
        const res = await supertest.post('/api/auth/register').send(testUser);
        testUser = res.body;
        expect(res.status).to.equal(200);
      });

      it('POST /auth/login - login without payload - 400', async () => {
        const res = await supertest.post('/api/auth/login');
        expect(res.status).to.equal(400);
      });

      it('POST /auth/logout - logout - 200', async () => {
        const res = await supertest.post('/api/auth/logout');
        expect(res.status).to.equal(200);
      });
    });
  });
});
