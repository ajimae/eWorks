// third-party libraries
import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';

// project files
import { user, user_wrong_email, user_no_password } from './fixtures';
import {
  UserRepository,
} from '../../repository';

chai.use(chaiHttp);
const { expect } = chai;

describe('signup unit test', () => {
  
  it('should return true if email exists', async () => {
    const isRegistered = await UserRepository.isRegistered(user.email);
    expect(isRegistered).equal(true);
  });

  it('should return false if email doesn\'t exists', async () => {
    const isRegistered = await UserRepository.isRegistered(user_wrong_email.email);
    expect(isRegistered).equal(false);
  });
  
  // it('should simulate a server error', async () => {
  //   const isRegistered = await UserRepository.registerUser(user_no_password);
  //   expect(isRegistered).equal(false);
  // });
});
