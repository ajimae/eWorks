import models from '../models';

/**
 * @description user repository class
 * 
 * @method registerUser
 * 
 */
export default class UserRepository {
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
    
    throw new Error('There was error registering user');
  }
}
