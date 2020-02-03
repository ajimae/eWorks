import jwt from 'jsonwebtoken';
import models from '../models';
import Response from '../helpers/Response';
import { redisClient } from '../db/redis-client';

const { errorResponse } = Response;

/**
 * @description jwt base authentication class
 *
 * @method authenticate
 * @method verifyToken
 * @method verifyUserToken
 */
export default class {
  /**
   * @description authenicate user token
   *
   * @param user object { id, email, isActive, role }
   *
   * @returns jwt
   */
  static authenticate = ({
    _id, email, isActive, role,
  }) => jwt.sign({
    _id, email, isActive, role,
  }, process.env.SECRET_KEY, {
    expiresIn: '720h',
    audience: process.env.AUDIENCE,
    issuer: process.env.ISSUER,
  });

  /**
   * @description verify jwt token
   *
   * @param token
   *
   * @return return decoded payload
   */
  static verifyToken = (token) => {
    const decoded = {};

    try {
      decoded.payload = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      decoded.error = error.message;
    }

    return decoded;
  }

  /**
   * @description verify user token
   *
   * @param req
   * @param res
   * @parem next
   *
   * @return { user payload | error }
   */
  static verifyUserToken = async (req, res, next) => {
    if (!req.headers.authorization) {
      // return res.status(401).json({
      //   status: 'error',
      //   error: 'no token provided',
      // });
      return errorResponse(res, 401, 'no token provided');
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      const cacheResult = await redisClient.lRange('token', 0, 99999999);
      if (cacheResult.indexOf(token) > -1) {
        return errorResponse(res, 400, 'session expired, please login');
      }
    } catch (error) {
      errorResponse(res, 500, 'server error');
    }

    const decoded = this.verifyToken(token);

    if (decoded.error) {
      // res.status(500).json({
      //   status: 'error',
      //   message: 'failed to authenticate token',
      //   error: decoded.error,
      // });
      return errorResponse(res, 500, 'failed to authenticate token', decoded.error);
    }

    // if (!req.decoded.id) {
    //   return errorResponse(res, 400, 'invalid url parameter');
    // }

    const { _id } = decoded.payload;
    const user = models.User.findOne({ _id });
    if (user) {
      req.decoded = decoded.payload;
      next();
    } else {
      return errorResponse(res, 404, 'user not found');
    }
  }
}
