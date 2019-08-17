// third-party library
import bcrypt from 'bcryptjs';

// project files
import models from '../models';
import ProfileRepository from './ProfileRepository';

/**
 * @description user repository class
 *
 * @method isRegistered
 * @method registerUser
 * @method loginUser
 *
 */
export default class UserRepository {
  /**
   * @description method to check if user already exists
   *
   * @param email
   *
   * @returns { boolean } true | false
   */
  static isRegistered = async (email) => {
    const user = await models.User.findOne({ email });

    if (user) {
      return true;
    }

    return false;
  }

  /**
   * @description method to handle user registration
   *
   * @param req.body
   *
   * @return user object
   */
  static registerUser = async (requestObject) => {
    const { email, phone, password } = requestObject;
    const lastName = requestObject.lastName.toString().toLowerCase();
    const firstName = requestObject.firstName.toString().toLowerCase();

    // insert profile initial details
    const profile = await ProfileRepository.insertInitialDetails({ firstName, lastName, email });
    const profileId = profile.id;

    if (profileId) {
      const userModel = new models.User({
        firstName,
        lastName,
        email,
        phone,
        password,
        profileId,
      });

      const user = await userModel.save();
      if (user) {
        return user;
      }

      // remove created profile if user creation fails
      const userProfile = await ProfileRepository.deleteUserProfile(profileId);
      if (typeof userProfile === 'string') {
        throw new Error(userProfile);
      }
      throw new Error('there was error registering user');
    }

    throw new Error('there was error registering user profile');
  }

  /**
   * @description method to handle user login
   *
   * @param req.body
   *
   * @return user details { res.body }
   */
  static loginUser = async ({ email, password }) => {
    const isUser = await this.isRegistered(email);

    if (!isUser) {
      throw new Error('user with specified email is not found');
    }

    const userObject = models.User;
    const user = await userObject.findOne({ email });
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (isValidPassword) {
      return user;
    }

    return null;
  }

  /**
   * @description method to handle user account verification
   *
   * @param email
   *
   * @return {Object | String } user | error object
   */
  static verifyUserAccount = async (mail) => {
    const isRegistered = await this.isRegistered(mail);

    if (!isRegistered) {
      return false;
    }

    const user = await models.User.findOne({ email: mail, isActive: false });

    if (!user) {
      throw new Error('user account already verified');
    }

    const { email } = user;
    const option = { new: true };
    const verifiedUser = await models.User.findOneAndUpdate({ email }, { isActive: true }, option);

    return verifiedUser;
  }

  /**
   * @description method to check if user account is verified
   *
   * @param email
   *
   * @return { boolean } true | false
   */
  static isUserAccountVerified = async (email) => {
    const isVerified = await models.User.findOne({ email, isActive: true });

    if (isVerified) {
      return true;
    }

    return false;
  }
}
