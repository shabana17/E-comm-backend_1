import { Router } from 'express';
import { authController, leadController, userController } from '../controllers';

const router = Router();

router.use('/auth', authController);
router.use('/user', userController);
router.use('/lead', leadController);

export { router };
