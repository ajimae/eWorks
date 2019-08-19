/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
// third-party libraries
import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';

// project files
import { user, user_profile } from './fixtures';
import {
  ProfileRepository,
} from '../../repository';

chai.use(chaiHttp);
const { expect } = chai;

let profileId;
describe('profile unit tests', () => {
  it('should return false if profile details are not provided', async () => {
    const profile = await ProfileRepository.insertInitialDetails('');
    expect(profile).equal(false);
  });

  it('should return the inserted profile details if all is good', async () => {
    const profile = await ProfileRepository.insertInitialDetails(user);
    profileId = profile.id;
    expect(profile.email).equal(user.email);
  });

  it('should return an error when deleting profile with unknown profile id', async () => {
    const deletedProfile = await ProfileRepository.deleteUserProfile(user.id);
    expect(deletedProfile).equal('there was error removing profile');
  });

  it('should return success when deleting profile a valid profile id', async () => {
    const deletedProfile = await ProfileRepository.deleteUserProfile(profileId);
    expect(deletedProfile.message).equal('profile successfully removed');
  });

  it('should return null when email is not found for update request', async () => {
    const updateProfile = await ProfileRepository.updateUserProfile(user_profile);
    expect(updateProfile).equal(null);
  });
});
