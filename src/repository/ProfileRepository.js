import models from '../models';

/**
 * @description profile repository class
 *
 * @method insertInitialDetails
 *
 */
export default class ProfileRepository {
  /**
   * @description method to check if profile details were inserted
   *
   * @param firstName
   * @param lastName
   *
   * @returns { boolean } profile | false
   */
  static insertInitialDetails = async ({ firstName, lastName, email }) => {
    const name = `${firstName} ${lastName}`;

    if (!email || !name) return false;
    const userProfile = new models.Profile({
      name,
      email,
    });

    const profile = await userProfile.save();

    if (profile) {
      return profile;
    }

    return false;
  }

  /**
   * @description method to delete a specific user profile
   *
   * @param profileId
   *
   * @return { object | String }
   */
  static deleteUserProfile = async (profileId) => {
    const userProfile = models.Profile.findByIdAndRemove(profileId, { useFindAndModify: false });
    const profile = await userProfile.exec();
    if (profile) {
      return {
        message: 'profile successfully removed',
        profile,
      };
    }

    return 'there was error removing profile';
  }
}
