import { Router } from 'express';

import users from './user';
import profile from './profile';

const router = Router();

router.use(users);
router.use(profile);


export default router;
