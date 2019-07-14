// third-party libraries
import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';

// project files
import { server } from '../../../index';
import {
  user_no_password,
  user_no_email,
  user_invalid_email,
  user_short_password_length,
  user_wrong_password,
  user_wrong_email,
  user,
} from './fixtures';

chai.use(chaiHttp);
const { expect } = chai;

describe('signin test', () => {

  it('should throw validation error if email is not provided', (done) => {
    chai.request(server)
      .get('/api/v1/users')
      .send(user_no_email)
      .end((error, response) => {
        if (error) throw new Error(error);
        expect(response.statusCode).equal(400);
        expect(response.body.status).equal('error');
        expect(response.body.message).equal('invalid input');
        expect(response.body.data.invalidField).equal('email is empty. ');
        expect(response.headers['content-type']).equal('application/json; charset=utf-8');
        done();
      });
  });

  it('should throw validation error if password is not provided', (done) => {
    chai.request(server)
      .get('/api/v1/users')
      .send(user_no_password)
      .end((error, response) => {
        if (error) throw new Error(error);
        expect(response.statusCode).equal(400);
        expect(response.body.status).equal('error');
        expect(response.body.message).equal('invalid input');
        expect(response.body.data.invalidField).equal('password is empty. ');
        expect(response.headers['content-type']).equal('application/json; charset=utf-8');
        done();
      });
  });

  it('should throw validation error if email is invalid', (done) => {
    chai.request(server)
      .get('/api/v1/users')
      .send(user_invalid_email)
      .end((error, response) => {
        if (error) throw new Error(error);
        expect(response.statusCode).equal(400);
        expect(response.body.status).equal('error');
        expect(response.body.message).equal('invalid input');
        expect(response.body.data.email).equal('invalid email');
        expect(response.headers['content-type']).equal('application/json; charset=utf-8');
        done();
      });
  });

  it('should throw validation error if password is too short', (done) => {
    chai.request(server)
      .get('/api/v1/users')
      .send(user_short_password_length)
      .end((error, response) => {
        if (error) throw new Error(error);
        expect(response.statusCode).equal(400);
        expect(response.body.status).equal('error');
        expect(response.body.message).equal('invalid input');
        expect(response.body.data.invalidField).equal('password length is less then 8');
        expect(response.headers['content-type']).equal('application/json; charset=utf-8');
        done();
      });
  });

  it('should throw an error if the provided email doesn\'t exist', (done) => {
    chai.request(server)
      .get('/api/v1/users')
      .send(user_wrong_email)
      .end((error, response) => {
        if (error) throw new Error(error);
        expect(response.statusCode).equal(404);
        expect(response.body.status).equal('error');
        expect(response.body.message).equal('user with specified email is not found');
        expect(response.headers['content-type']).equal('application/json; charset=utf-8');
        done();
      });
  });

  it('should throw a 404 if matching credential is not found', (done) => {
    chai.request(server)
      .get('/api/v1/users')
      .send(user_wrong_password)
      .end((error, response) => {
        if (error) throw new Error(error);
        expect(response.statusCode).equal(404);
        expect(response.body.status).equal('error');
        expect(response.body.message).equal('email or password incorrect');
        expect(response.headers['content-type']).equal('application/json; charset=utf-8');
        done();
      });
  });

  it('should sign in a user when credentials are correct', (done) => {
    chai.request(server)
      .get('/api/v1/users')
      .send(user)
      .end((error, response) => {
        if (error) throw new Error(error);
        expect(response.statusCode).equal(200);
        expect(response.body.status).equal('success');
        expect(response.body.data.token).to.be.a('string');
        expect(response.body.message).equal('login successful');
        expect(response.headers['content-type']).equal('application/json; charset=utf-8');
        done();
      });
  });
});
