import models from '../models';
import bcrypt from 'bcryptjs';

/**
 * @description user repository class
 * 
 * @method registerUser
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
    const isEmailRegistered = models.User;

    const user = await isEmailRegistered.findOne({ email });

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
  static registerUser = async ({ firstName, lastName, email, phone, password }) => {
    const userModel = new models.User({
      firstName,
      lastName,
      email,
      phone,
      password
    });

    const user = await userModel.save();

    if (user) {
      return user;
    }
    
    throw new Error('there was error registering user');
  }

  /**
   * @description method to handle user login
   * 
   * @parameter req.body
   * 
   * @return user details { res.body }
   */
  static loginUser = async ({ email, password }) => {
    const isUser = await this.isRegistered(email);

    if (!isUser) {
      throw new Error('user with specified email does not found');
    }

    const userObject = models.User;
    const user = await userObject.findOne({ email });
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (isValidPassword) {
      return user;
    }

    throw new Error('incorrect email or password');
  }
}
