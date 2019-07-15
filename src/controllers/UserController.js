import { UserRepository } from '../repository';
import Authentication from '../middleware/Authentication';
import Response from '../helpers/Response';

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
        res.header('Authorization', `Bearer ${token}`);
        return Response.successResponse(res, 201, 'user created successfully', { user, token });
      }

      return Response.errorResponse(res, 409, `user with the email ${email} already exists`);
    } catch (error) {
      return Response.errorResponse(res, 500, error.message);
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
        res.header('Authorization', `Bearer ${token}`);
        return Response.successResponse(res, 200, 'login successful', { isUser, token });
      }
      return Response.errorResponse(res, 404, 'email or password incorrect', isUser);
    } catch (error) {
      let status = 500;
      if (error.message === 'user with specified email is not found') {
        status = 404;
      }
      return Response.errorResponse(res, status, error.message);
    }
  }
}
