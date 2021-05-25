import { Router } from 'express';
import { Types } from 'mongoose';
import { makeResponse } from '../../lib';
import { token } from '../../common'
import { getUser, setUser } from '../../services/auth';
import User from '../../models/user';
import jwt from 'jsonwebtoken' 
 import cookieParser from 'cookie-parser'
const router = Router();
router.use(cookieParser())
router.post('/signup', async (req, res) => {
    const users: any = await getUser({ email: req.body.email });
    if (users) {
        return makeResponse(res, 400, false, 'Already Registered email', undefined)
    }
    const userData = {
        _id: new Types.ObjectId(),
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        location: req.body.location
    }
    let data = new User(userData);
    let datas = await data.save();
    return (makeResponse(res, 200, true, 'User Created', datas));
    // let signupData: any = await setUser({
    //     _id: new Types.ObjectId(),
    //     username: req.body.username,
    //     email: req.body.email,
    //     password: req.body.password,
    //     location: req.body.location
    // });
    // return (makeResponse(res, 200, true, 'User Created', signupData));
});
router.post('/login', async (req, res) => {
    const users: any = await getUser({ email: req.body.email, password: req.body.password })
    if (!users) {
        return makeResponse(res, 400, false, "Invalid email or password", undefined)
    } else {
        const userToken = token({ _id: users._id, username: users.username, email: users.email, location: users.location, password: users.password }, 'jwtPrivateKey')
        // const us= await jwt.verify(userToken,'jwtPrivateKey')
        // console.log(us)
        return (makeResponse(res, 200, true, "Succesfully Logged in", { userToken }))
    }
})
router.post('/email', async (req, res) => {
    const email = new User({
        username: req.body.username
    })
    email.findByEmail((err: any, user: any) => {
        if (err) {
            res.send(err)
        }
        else {
            res.json(user)
        }
    })
})
// router.post('/location', async (req, res) => {
//       User.findByLocation(req.body.location,(err:any,user:any)=>{
//         if(err)
//         res.send(err)
//         else
//         res.json(user)
//     })
//     })
// router.get('/sign',(req,res)=>{
//     res.cookie('session_id','123456')
//     res.send(200).json({msg:"logged in"})
// })
export const authController = router
