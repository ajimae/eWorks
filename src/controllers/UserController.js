import { UserRepository } from '../repository';
import Authentication from '../middleware/Authentication';

/**
 * @description UserController
 * 
 * @method registerUser
 */
export default class UserController {

  /**
   * @description register new user
   * 
   * @param req
   * @param res
   * 
   * @return { json } user object
   */
  static registerUser = async (req, res) => {
    const { email } = req.body;
    const isUser = await UserRepository.isRegistered(email);
    try {
      if (!isUser) {
        const userObject = await UserRepository.registerUser(req.body);
        const user = userObject.toObject();
        const token = Authentication.authenticate(user);

        delete user.password;
        res.header('Authorization', `Bearer ${token}`).status(201).json({
          status: 'success',
          data: {
            user,
            token
          }
        });
      } else {
        return res.status(409).json({
          status: 'error',
          message: `user with the email ${email} already exists`
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  /**
   * @description user login
   * 
   * @param req
   * @param res
   * 
   * @return { json } user object
   */
  static loginUser = async (req, res) => {
    try {
      const isUser = await UserRepository.loginUser(req.body);
      if (isUser) {
        const user = isUser.toObject();
        const token = Authentication.authenticate(user);
        
        delete user.password;
        return res.status(200).json({
          status: 'success',
          data: {
            user,
            token
          }
        });
      }
      return res.status(404).json({
        status: 'success',
        data: {
          isUser
        }
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      })
    }
  }
}
