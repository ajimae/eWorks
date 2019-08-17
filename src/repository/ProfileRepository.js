/* eslint-disable no-dupe-keys */
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
   * @description method to update profile information
   *
   * @param profileObject
   *
   * @returns { object } userProfile | error
   */
  static updateUserProfile = async (userProfileObject) => {
    const {
      email, contact, address, details,
    } = userProfileObject;

    const { skills } = details;
    const userProfile = {
      ...userProfileObject,
      $push: { contact },
      $push: { address },
      $push: { ...details, skills },
    };

    const condition = email ? { email } : { email: { $exists: false } };
    const update = { $set: userProfile };
    const updatedProfile = await models.Profile.findOneAndUpdate(condition, update, { new: true });

    if (!userProfile) {
      return false;
    }

    return updatedProfile;
  }

  /**
   * @description method to delete a specific user profile
   *
   * @param _id
   *
   * @return { object | String }
   */
  static getUserProfile = async (_id) => {
    const userProfileObject = models.Profile;
    const userProfile = await userProfileObject.findById({ _id });

    if (!userProfile) {
      return null;
    }

    return userProfile;
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
