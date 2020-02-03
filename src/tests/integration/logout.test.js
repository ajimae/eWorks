/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
// third-party libraries
import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';

// project files
import { server } from '../../../index';
import { user, user_profile_unknownmail2 } from './fixtures';


chai.use(chaiHttp);
const { expect } = chai;

describe('logout test', () => {
  let token;
  it('should first signin a user', (done) => {
    chai.request(server)
      .get('/api/v1/users')
      .send(user)
      .end((error, response) => {
        if (error) throw new Error(error);
        token = response.body.data.token;
        expect(response.statusCode).equal(200);
        expect(response.body.status).equal('success');
        expect(response.body.data.token).to.be.a('string');
        expect(response.body.message).equal('login successful');
        expect(response.headers['content-type']).equal('application/json; charset=utf-8');
        done();
      });
  });

  // it('should return 400 if user account is not verified', (done) => {
  //   chai.request(server)
  //     .patch('/api/v1/users/profile')
  //     .set('Authorization', `Bearer ${token}`)
  //     .send({ ...user_profile })
  //     .end((error, response) => {
  //       console.log(response.body, '>>>>');
  //       if (error) throw new Error(error);
  //       expect(response.statusCode).equal(400);
  //       expect(response.body.status).equal('error');
  //       expect(response.body.message).equal('please verify your account to proceed');
  //       expect(response.headers['content-type']).equal('application/json; charset=utf-8');
  //       done();
  //     });
  // });

  it('should logout a user', (done) => {
    chai.request(server)
      .post('/api/v1/users/logout')
      .set('Authorization', `Bearer ${token}`)
      .end((error, response) => {
        if (error) throw new Error(error);
        expect(response.body.status).equal('success');
        expect(response.statusCode).equal(200);
        expect(response.body.message).equal('you are logged out');
        done();
      });
  });

  it('should return session expired if user account is logged out', (done) => {
    chai.request(server)
      .patch('/api/v1/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...user_profile_unknownmail2 })
      .end((error, response) => {
        if (error) throw new Error(error);
        expect(response.statusCode).equal(400);
        expect(response.body.status).equal('error');
        expect(response.body.message).equal('session expired, please login');
        expect(response.headers['content-type']).equal('application/json; charset=utf-8');
        done();
      });
  });
});
