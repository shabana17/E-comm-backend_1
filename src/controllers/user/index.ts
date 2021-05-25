import { Router } from 'express';
import authenticateJWT from '../../middlewares';
import { makeResponse } from '../../lib';
import { getUser, updateUser } from '../../services/user';
import User from '../../models/user'
const router = Router();
router.use(authenticateJWT);
router.get('/my-profile', async (req: any, res: any) => {
    let userData = await User.find({ _id: req.user._id })
    console.log(userData)
    return (makeResponse(res, 200, true, 'User Dispalyed', userData));
});
router.put('/edit-profile', async (req: any, res: any) => {

    let users: any = await User.findByIdAndUpdate(req.user._id, {
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