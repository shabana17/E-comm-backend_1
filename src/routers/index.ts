import { Router } from 'express';
import { cRouter } from '../controllers';

const router = Router();
router.use('/', cRouter);

export { router };
