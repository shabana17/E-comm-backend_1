import jwt from 'jsonwebtoken'
import { makeResponse } from '../lib'
import User from '../models/user';

const authenticateJWT: any = (req: any, res: any, next: any) => {
    const bearerToken = req.headers['authorization'];
    console.log(bearerToken)
    jwt.verify(bearerToken, 'jwtPrivateKey', (err: any, token: any) => {
        if (err) {
            return res.sendStatus(403);
        }
        const _id = token._id;
        User.findById(_id).then((user: any) => {
            req.user = user;
            next();
        })
    })
}
export default authenticateJWT;