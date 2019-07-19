/* eslint-disable no-undef */
/* eslint-disable camelcase */
// third-party libraries
import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';

// project files
import { server, connection } from '../../../index';
import {
  user_no_firstName,
  user_no_lastName,
  user_no_password,
  user_no_email,
  user_invalid_firstname,
  user_invalid_lastname,
  user_invalid_email,
  user_short_password_length,
  user,
} from './fixtures';

chai.use(chaiHttp);
const { expect } = chai;

describe('signup test', () => {
  before(() => {
    connection.connection.dropDatabase();
  });

  it('should throw validation error if firstname is not provided', (done) => {
    chai.request(server)
      .post('/api/v1/users')
      .send(user_no_firstName)
      .end((error, response) => {
        if (error) throw new Error(error);
        expect(response.statusCode).equal(400);
        expect(response.body.status).equal('error');
        expect(response.body.message).equal('invalid input');
        expect(response.body.data.invalidField).equal('firstname is empty. ');
        expect(response.headers['content-type']).equal('application/json; charset=utf-8');
        done();
      });
  });

  it('should throw validation error if lastname is not provided', (done) => {
    chai.request(server)
      .post('/api/v1/users')
      .send(user_no_lastName)
      .end((error, response) => {
        if (error) throw new Error(error);
        expect(response.statusCode).equal(400);
        expect(response.body.status).equal('error');
        expect(response.body.message).equal('invalid input');
        expect(response.body.data.invalidField).equal('lastname is empty. ');
        expect(response.headers['content-type']).equal('application/json; charset=utf-8');
        done();
      });
  });

  it('should throw validation error if email is not provided', (done) => {
    chai.request(server)
      .post('/api/v1/users')
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
      .post('/api/v1/users')
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

  it('should throw validation error if firstname is invalid', (done) => {
    chai.request(server)
      .post('/api/v1/users')
      .send(user_invalid_firstname)
      .end((error, response) => {
        if (error) throw new Error(error);
        expect(response.statusCode).equal(400);
        expect(response.body.status).equal('error');
        expect(response.body.message).equal('invalid input');
        expect(response.body.data.firstName).equal('invalid firstname');
        expect(response.headers['content-type']).equal('application/json; charset=utf-8');
        done();
      });
  });

  it('should throw validation error if lastname is invalid', (done) => {
    chai.request(server)
      .post('/api/v1/users')
      .send(user_invalid_lastname)
      .end((error, response) => {
        if (error) throw new Error(error);
        expect(response.statusCode).equal(400);
        expect(response.body.status).equal('error');
        expect(response.body.message).equal('invalid input');
        expect(response.body.data.lastName).equal('invalid lastname');
        expect(response.headers['content-type']).equal('application/json; charset=utf-8');
        done();
      });
  });

  it('should throw validation error if email is invalid', (done) => {
    chai.request(server)
      .post('/api/v1/users')
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
      .post('/api/v1/users')
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

  it('should register a user when all inputs are correct', (done) => {
    chai.request(server)
      .post('/api/v1/users')
      .send(user)
      .end((error, response) => {
        if (error) throw new Error(error);
        expect(response.statusCode).equal(201);
        expect(response.body.status).equal('success');
        expect(response.body.data.token).to.be.a('string');
        expect(response.body.message).equal('user created successfully');
        expect(response.headers['content-type']).equal('application/json; charset=utf-8');
        done();
      });
  }).timeout(7000);

  it('should throw a validation when using duplicate email', (done) => {
    chai.request(server)
      .post('/api/v1/users')
      .send(user)
      .end((error, response) => {
        if (error) throw new Error(error);
        expect(response.statusCode).equal(409);
        expect(response.body.status).equal('error');
        expect(response.body.message).equal(`user with the email ${user.email} already exists`);
        expect(response.headers['content-type']).equal('application/json; charset=utf-8');
        done();
      });
  });
});
