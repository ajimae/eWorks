import { UserRepository } from '../repository';
import Authentication from '../middleware/Authentication';

/**
 * @description UserController
 * 
 * @function registerUser
 */
export default class UserController {

  /**
   * @description register new user
   * 
   * @param req
   * @param res
   * 
   * @return json
   */
  static registerUser = async (req, res) => {
    try {
      const userObject = await UserRepository.registerUser(req.body);
      const user = userObject.toObject();
      const token = Authentication.authenticate(user);

      delete user.password;
      res.status(201).json({
        status: 'success',
        data: {
          user,
          token
        }
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }
}
