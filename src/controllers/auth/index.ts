import { Router } from 'express';
import { Types } from 'mongoose';
import { makeResponse } from '../../lib';
import { token } from '../../common'
import { getUser, setUser } from '../../services/auth';
const router = Router();
router.post('/signup', async (req, res) => {
    const users: any = await getUser({ email: req.body.email });
    if (users) {
        return makeResponse(res, 400, false, 'Already Registered email');
    }
    let signupData: any = await setUser({
        _id: new Types.ObjectId(),
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        location: req.body.location
    });
    // const signup={signupData}
    console.log('sifbbbbb',signupData)
    return ( makeResponse(res, 200, true, 'User Created',  signupData ));
});
router.post('/login', async (req, res) => {
    const users: any = await getUser({ email: req.body.email, password: req.body.password })
    if (!users) {
        return makeResponse(res, 400, false, "Invalid email or password ")
    } else {
        const userToken = token({ _id: users._id, username: users.username, email: users.email, location: users.location, password: users.password }, 'jwtPrivateKey')
        return (makeResponse(res, 200, true, "Succesfully Logged in", { userToken }))
    }
})
export const authController = router
