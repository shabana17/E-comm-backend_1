import { Router } from 'express';
import { userRouter } from './user';

const cRouter = Router();
cRouter.use('/', userRouter);

export { cRouter };
