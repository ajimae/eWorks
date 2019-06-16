import { Router } from 'express';
import { UserController } from '../controllers';

const router = Router();
const { registerUser } = UserController;

router.post('/users', registerUser);

export default router;
