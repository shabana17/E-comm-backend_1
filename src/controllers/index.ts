import { Router } from 'express';
import { leadRouter } from './lead';
import { userRouter } from './user';

const cRouter = Router();
cRouter.use('/user', userRouter);
cRouter.use('/auth', userRouter);
cRouter.use('/lead', leadRouter);

export { cRouter };
