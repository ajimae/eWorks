import Encryption from '../helpers/Encryption';

import { UserRepository } from '../repository';
import Authentication from '../middleware/Authentication';
import Response from '../helpers/Response';
import SendMail from '../helpers/SendMail';
import accountVerification from '../templates/accountVerification';
import { redisClient } from '../db/redis-client';

const { decrypt } = Encryption;
const { successResponse, errorResponse } = Response;

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
   * @return { json } user | error object
   */
  static registerUser = async (req, res) => {
    const { email } = req.body;
    const isUser = await UserRepository.isRegistered(email);
    try {
      if (!isUser) {
        // construct account verification email
        const mail = {
          to: email,
          subject: 'Welcome to eWorks',
          html: accountVerification(req.body),
        };

        const mailResponse = await SendMail.sendMail(mail);
        if (!mailResponse.messageId) {
          return errorResponse(res, 500, 'unable to send email', mailResponse.message);
        }

        const userObject = await UserRepository.registerUser(req.body);
        const user = userObject.toObject();
        const token = Authentication.authenticate(user);

        delete user.password;
        res.header('Authorization', `Bearer ${token}`);
        return successResponse(res, 201, 'user created successfully', { user, token });
      }

      return errorResponse(res, 409, `user with the email ${email} already exists`);
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  /**
   *
   * @description user login
   *
   * @param req
   * @param res
   *
   * @return { json } user | error object
   */
  static loginUser = async (req, res) => {
    try {
      const isUser = await UserRepository.loginUser(req.body);
      if (isUser) {
        const user = isUser.toObject();
        const token = Authentication.authenticate(user);

        delete user.password;
        res.header('Authorization', `Bearer ${token}`);
        return successResponse(res, 200, 'login successful', { user, token });
      }
      return errorResponse(res, 404, 'email or password incorrect', isUser);
    } catch (error) {
      let status = 500;
      if (error.message === 'user with specified email is not found') {
        status = 404;
      }
      return errorResponse(res, status, error.message);
    }
  }

  /**
   *
   * @description account verification method
   *
   * @param req
   * @param res
   *
   * @returns { json } user | error object
   */
  static verifyAccount = async (req, res) => {
    const { id } = req.query;
    const mail = await decrypt(id);
    try {
      const isUser = await UserRepository.verifyUserAccount(mail);

      if (isUser) {
        return successResponse(res, 200, 'account verified successfully', isUser);
      }

      return errorResponse(res, 400, 'user with the specified email is not a registered member');
    } catch (error) {
      let status = 500;

      if (error.message === 'user account already verified') {
        status = 400;
      }

      return errorResponse(res, status, error.message);
    }
  }

  /**
   * @description logout user method
   *
   * @param req
   * @param res
   *
   * @return { json } success | error
   */
  static logoutUser = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
      redisClient.lPush('token', token);
      return successResponse(res, 200, 'you are logged out');
    } catch (error) {
      return errorResponse(res, 500, 'something went wrong', error.message);
    }
  }
}
