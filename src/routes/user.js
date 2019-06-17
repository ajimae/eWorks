import { Router } from 'express';
import { UserController } from '../controllers';

const router = Router();
const { registerUser, loginUser } = UserController;

router.post('/users', registerUser);
router.get('/users', loginUser);

export default router;
