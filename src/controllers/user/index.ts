import { Router } from 'express';
import {
  assignToken, hashPassword,
  matchPassword
} from '../../common';
import { makeResponse } from '../../lib';
import {
  editUserValidation, loginValidation,
  registerValidation
} from '../../middlewares';
import {
  checkExisting, deleteUser,
  editUser, saveUser
} from '../../services';
const router = Router();

router.post('/create',
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

router.post('/login',
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

      return makeResponse(res, 200, true, 'Login successful',
        { email: user.email, password: req.body.password, token });
    } catch (error) {
      return makeResponse(res, 500, false, error.message);
    }
  });

router.put('/edit',
  editUserValidation, async (req, res) => {
    try {
      const editedUser = await editUser({ _id: req.body.user_id }, req.body, { new: true });

      return makeResponse(res, 200, true, 'Edit successful', editedUser);
    } catch (error) {
      return makeResponse(res, 500, false, error.message);
    }
  });

router.delete('/delete', async (req, res) => {
  if (req.body.user_id) {
    try {
      const deleted = await deleteUser(req.body.user_id);

      return makeResponse(res, 200, true, 'User deleted', deleted);
    } catch (error) {
      return makeResponse(res, 500, false, error.message);
    }
  } else {
    return makeResponse(res, 500, false, 'User id is required');
  }
});

export const userRouter = router;
