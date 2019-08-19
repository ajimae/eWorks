/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
// third-party libraries
import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';

// project files
import { server } from '../../../index';
import {
  user,
  user_profile,
  user_profile_unknownmail,
  user_profile_unknownmail2,
  user2,
} from './fixtures';

chai.use(chaiHttp);
const { expect } = chai;

describe('profile test', () => {
  let token;
  let token2;
  let profileId;
  it('should sign in a user when credentials are correct', (done) => {
    chai.request(server)
      .get('/api/v1/users')
      .send(user)
      .end((error, response) => {
        if (error) throw new Error(error);
        token = response.body.data.token;
        expect(response.statusCode).equal(200);
        profileId = response.body.data.user.profileId;
        expect(response.body.status).equal('success');
        expect(response.body.data.token).to.be.a('string');
        expect(response.body.message).equal('login successful');
        expect(response.headers['content-type']).equal('application/json; charset=utf-8');
        done();
      });
  });

  it('should sign in a second user when credentials are correct', (done) => {
    chai.request(server)
      .get('/api/v1/users')
      .send(user2)
      .end((error, response) => {
        if (error) throw new Error(error);
        token2 = response.body.data.token;
        expect(response.statusCode).equal(200);
        expect(response.body.status).equal('success');
        expect(response.body.data.token).to.be.a('string');
        expect(response.body.message).equal('login successful');
        expect(response.headers['content-type']).equal('application/json; charset=utf-8');
        done();
      });
  });


  it('should return a 404 if profileId is not found', (done) => {
    chai.request(server)
      .get('/api/v1/users/5d5a0c136546241d49d09644/profile')
      .end((error, response) => {
        if (error) throw new Error(error);
        expect(response.statusCode).equal(404);
        expect(response.body.status).equal('error');
        expect(response.body.message).equal('the user was not found on this server');
        done();
      });
  });

  it('should fetch initial profile details', (done) => {
    chai.request(server)
      .get(`/api/v1/users/${profileId}/profile`)
      .end((error, response) => {
        if (error) throw new Error(error);
        expect(response.statusCode).equal(200);
        expect(response.body.status).equal('success');
        expect(response.body.data.handles.github).equal(null);
        expect(response.body.data.name).equal('chukwuemeka ajima');
        expect(response.body.data.name).equal('chukwuemeka ajima');
        expect(response.body.data.handles.twitter).equal(null);
        expect(response.body.data.handles).haveOwnProperty('github');
        expect(response.body.data.handles).haveOwnProperty('twitter');
        expect(response.body.data.handles.facebook).equal(null);
        expect(response.body.data.handles).haveOwnProperty('facebook');
        expect(response.body.data.additionalInfo.profileViewCount).equal(0);
        expect(response.headers['content-type']).equal('application/json; charset=utf-8');
        done();
      });
  });

  it('should return 400 if user account is not verified', (done) => {
    chai.request(server)
      .patch('/api/v1/users/profile')
      .set('Authorization', `Bearer ${token2}`)
      .send({ ...user_profile_unknownmail2 })
      .end((error, response) => {
        if (error) throw new Error(error);
        expect(response.statusCode).equal(400);
        expect(response.body.status).equal('error');
        expect(response.body.message).equal('please verify your account to proceed');
        expect(response.headers['content-type']).equal('application/json; charset=utf-8');
        done();
      });
  });

  it('should return 404 when email is not registered', (done) => {
    chai.request(server)
      .patch('/api/v1/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...user_profile_unknownmail })
      .end((error, response) => {
        if (error) throw new Error(error);
        expect(response.statusCode).equal(404);
        expect(response.body.status).equal('error');
        expect(response.headers['content-type']).equal('application/json; charset=utf-8');
        done();
      });
  });

  it('should update user profile successfully', (done) => {
    chai.request(server)
      .patch('/api/v1/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...user_profile })
      .end((error, response) => {
        if (error) throw new Error(error);
        expect(response.statusCode).equal(200);
        expect(response.body.status).equal('success');
        expect(response.body.data.name).equal('ajima chukwuemeka');
        expect(response.body.message).equal('successfully updated profile');
        expect(response.body.data.handles.github).equal('github_updated');
        expect(response.body.data.handles.twitter).equal('twitter_updated');
        expect(response.body.data.handles.facebook).equal('facebook_updated');
        expect(response.headers['content-type']).equal('application/json; charset=utf-8');
        done();
      });
  });
});
