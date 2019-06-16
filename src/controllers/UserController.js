import { UserRepository } from '../repository';

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
      const user = await UserRepository.registerUser(req.body)
      res.status(201).json({
        status: 'success',
        data: {
          user,
        }
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        data: {
          error
        }
      });
    }
  }
}
