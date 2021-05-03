import { Router } from 'express';
import { assignToken, matchPassword } from '../../common';
import { makeResponse } from '../../lib';
import { loginValidation } from '../../middlewares';
import { getUser } from '../../services';

const router = Router();

router.post('/login',
  loginValidation, async (req, res) => {
    try {
      const user: any = await getUser({email: req.body.email});
      if (!user) {
        return makeResponse(res, 400, false, 'You are not registered');
      }
      const passwordCorrect = await matchPassword(req.body.password, user.password);
      if (!passwordCorrect) {
        return makeResponse(res, 400, false, 'Incorrect password');
      }
      const token = assignToken({name: user.name, email: user.email}, 'secretKey');

      return makeResponse(res, 200, true, 'Login successful',
        {token});
    } catch (error) {
      return makeResponse(res, 400, false, error.message);
    }
  });

export const authController = router;
