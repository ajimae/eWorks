// third-party libraries
import { Router } from 'express';

// project files
import { ProfileController } from '../controllers';
import Validations from '../middleware/Validations';
import Authenication from '../middleware/Authentication';

const { verifyUserToken } = Authenication;
const { isAccountVerified } = Validations;
const { updateUserProfile, getUserProfile } = ProfileController;

const router = Router();

router.get('/users/:id/profile', getUserProfile);
router.patch('/users/profile', verifyUserToken, isAccountVerified, updateUserProfile);

export default router;
