import Response from '../helpers/Response';
import UserInputs from '../utility/UserInput';
import UserRepository from '../repository/UserRepository';

const { errorResponse } = Response;

/**
 *
 * @class Validation
 * @description class to handle request validations
 *
 * @method signupValidator
 * @method signinValidator
 */
export default class Validations {
  /**
   *
   * @description signupValidator

   * @param {object} request
   * @param {object} response
   * @param {function} next
   *
   * @returns {object} http response object
   */
  static signupValidator = (request, response, next) => {
    const { validateFields } = UserInputs;
    const { isValid, issues } = validateFields(request.body, [
      'email',
      'password',
      'firstName',
      'lastName',
    ]);
    if (!isValid) {
      return errorResponse(response, 400, 'invalid input', issues);
    }
    next();
  }

  /**
   *
   * @description signinValidator
   *
   * @param {object} request
   * @param {object} response
   * @param {function} next
   *
   * @returns {object} http response object | next
   */
  static signinValidator = (request, response, next) => {
    const { validateFields } = UserInputs;
    const { isValid, issues } = validateFields(request.body, [
      'email',
      'password',
    ]);

    if (!isValid) {
      return errorResponse(response, 400, 'invalid input', issues);
    }
    next();
  }

  /**
   *
   * @description method to check if user account is verified
   *
   * @param {object} request
   * @param {object} response
   *
   * @returns {object} http response object | next
   */
  static isAccountVerified = async (request, response, next) => {
    const { email } = request.decoded;
    const { isUserAccountVerified } = UserRepository;

    const isVerified = await isUserAccountVerified(email);

    if (!isVerified) {
      return errorResponse(response, 400, 'please verify your account to proceed');
    }
    next();
  }
}
