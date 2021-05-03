import { Router } from 'express';
import { hashPassword } from '../../common';
import { makeResponse } from '../../lib';
import { editUserValidation, registerValidation } from '../../middlewares';
import { deleteUser, editUser, getUser, saveUser } from '../../services';

const router = Router();

router.post('/create',
  registerValidation, async (req, res) => {
    try {
      const userAlreadyExists = await getUser({email: req.body.email});
      if (userAlreadyExists) {
        return makeResponse(res, 400, false, 'This email already exists');
      }
      await saveUser({
        ...req.body,
        password: await hashPassword(req.body.password)
      });

      return makeResponse(res, 200, true, 'User created successfully', undefined);
    } catch (error) {
      return makeResponse(res, 400, false, error.message, undefined);
    }
  });

router.put('/edit',
  editUserValidation, async (req, res) => {
    try {
      const editedUser = await editUser({_id: req.body.user_id}, req.body, {new: true});

      return makeResponse(res, 200, true, 'Edit successful', {
        ...editedUser,
        password: undefined
      });
    } catch (error) {
      return makeResponse(res, 400, false, error.message, undefined);
    }
  });

router.delete('/delete', async (req, res) => {
  if (req.body.user_id) {
    try {
      const deleted = await deleteUser(req.body.user_id);

      return makeResponse(res, 200, true, 'User deleted', deleted);
    } catch (error) {
      return makeResponse(res, 400, false, error.message);
    }
  } else {
    return makeResponse(res, 400, false, 'User id is required');
  }
});

export const userController = router;
