/* eslint-disable no-undef */
/* eslint-disable camelcase */
// third-party libraries
import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';

import { server } from '../../../index';
import { user_no_firstName, user } from './fixtures';
import Encryption from '../../helpers/Encryption';

chai.use(chaiHttp);
const { expect } = chai;
const { encrypt } = Encryption;

describe('account verification tests', () => {
  it('should throw an error when email is not registered', (done) => {
    const { email } = user_no_firstName;
    chai.request(server)
      .patch('/api/v1/users/verify')
      .query({ id: email })
      .end((error, response) => {
        if (error) throw new Error(error.message);
        expect(response.status).equal(400);
        expect(response.body.status).equal('error');
        expect(response.body.message).equal('user with the specified email is not a registered member');
        done();
      });
  });

  it('should verify a registered email', (done) => {
    const email = encrypt(user.email);
    chai.request(server)
      .patch('/api/v1/users/verify')
      .query({ id: email })
      .end((error, response) => {
        if (error) throw new Error(error.message);
        expect(response.statusCode).equal(200);
        expect(response.body.status).equal('success');
        expect(response.body.message).equal('account verified successfully');
        expect(response.headers['content-type']).equal('application/json; charset=utf-8');
        done();
      });
  });

  it('should throw an error when trying to verify an already verified account', (done) => {
    const email = encrypt(user.email);
    chai.request(server)
      .patch('/api/v1/users/verify')
      .query({ id: email })
      .end((error, response) => {
        if (error) throw new Error(error.message);
        expect(response.statusCode).equal(400);
        expect(response.body.status).equal('error');
        expect(response.body.message).equal('user account already verified');
        expect(response.headers['content-type']).equal('application/json; charset=utf-8');
        done();
      });
  });
});
