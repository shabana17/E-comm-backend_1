import { Router } from 'express';
import authenticateJWT from '../../middlewares';
import { makeResponse } from '../../lib';
import { getUser, updateUser } from '../../services/user';
import user from '../../models/user'
const router = Router();
router.get('/my-profile', authenticateJWT, async (req, res) => {
    let userData: any = await getUser({});
    console.log(userData)

    return (makeResponse(res, 200, true, 'User Dispalyed', userData));
});
router.put('/edit-profile/:id', async (req, res) => {

    let users: any = await user.findByIdAndUpdate({ _id: req.params.id }, {
        $set: {
            username: req.body.username,
            password: req.body.password,
            location: req.body.location,
            country: req.body.country
        }
    }, { new: true });
    return (makeResponse(res, 200, true, 'User Updated', { users }));
});

export const userController = router;
