// third-party libraries
import { Router } from 'express';

// project files
import { UserController } from '../controllers';
import Validations from '../middleware/Validations';

const { signupValidator, signinValidator } = Validations;

const router = Router();
const { registerUser, loginUser } = UserController;

router.post('/users', signupValidator, registerUser);
router.get('/users', signinValidator, loginUser);

export default router;
