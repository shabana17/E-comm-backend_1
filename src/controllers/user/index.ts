import { Router } from 'express';
import { assignToken, hashPassword, matchPassword } from '../../common';
import { makeResponse } from '../../lib';
import { loginValidation, registerValidation } from '../../middlewares';
import { checkExisting, saveUser } from '../../services';
const router = Router();

router.post('/user/create',
  registerValidation, async (req, res) => {
    try {
      const userAlreadyExists = await checkExisting({ email: req.body.email });
      if (userAlreadyExists) {
        return makeResponse(res, 500, false, 'This email already exists');
      }
      const hashedPassword = await hashPassword(req.body.password);
      req.body.password = hashedPassword;
      const savedUser = await saveUser(req.body);

      return makeResponse(res, 200, true, 'User created successfully', savedUser);
    } catch (error) {
      return makeResponse(res, 500, false, error.message);
    }
  });

router.post('/auth/login',
  loginValidation, async (req, res) => {
    try {
      const user: any = await checkExisting({ email: req.body.email });
      if (!user) {
        return makeResponse(res, 500, false, 'You are not registered');
      }
      const passwordCorrect = await matchPassword(req.body.password, user.password);
      if (!passwordCorrect) {
        return makeResponse(res, 500, false, 'Incorrect password');
      }
      const token = assignToken({ name: user.name, email: user.email }, 'secretKey');

      return makeResponse(res, 200, true, 'login successful', { name: user.name, token });
    } catch (error) {
      return makeResponse(res, 500, false, error.message);
    }
  });

export const userRouter = router;
