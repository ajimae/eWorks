import Response from '../helpers/Response';
import { ProfileRepository } from '../repository';

const { successResponse, errorResponse } = Response;

/**
 * @description UserController
 *
 * @method registerUser
 */
export default class ProfileController {
  /**
   * @description register new user
   *
   * @param request
   * @param respose
   *
   * @return { json } user | error object
   */
  static updateUserProfile = async (request, respose) => {
    const { body } = request;
    const { email } = request.decoded;

    try {
      const userProfile = await ProfileRepository.updateUserProfile({ email, ...body });

      if (!userProfile) {
        return errorResponse(respose, 404, 'update failed, user could not be found');
      }

      return successResponse(respose, 200, 'successfully updated profile', userProfile);
    } catch (error) {
      return errorResponse(respose, 500, 'internal server error', error.message);
    }
  }

  /**
   * @description fetch user profile
   *
   * @param request
   * @param respose
   *
   * @return { json } user | error object
   */
  static getUserProfile = async (request, response) => {
    const { id } = request.params;

    try {
      const userProfile = await ProfileRepository.getUserProfile(id);

      if (userProfile) {
        return successResponse(response, 200, 'successful', userProfile);
      }

      return errorResponse(response, 404, 'the user was not found on this server');
    } catch (error) {
      errorResponse(response, 500, 'internal server error', error.message);
    }
  }
}
