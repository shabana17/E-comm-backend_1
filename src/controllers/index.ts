import { Router } from 'express';
import { userRouter } from './user';

const cRouter = Router();
cRouter.use('/user', userRouter);
cRouter.use('/auth', userRouter);

export { cRouter };
