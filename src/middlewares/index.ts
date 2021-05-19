import jwt from 'jsonwebtoken'
import { makeResponse } from '../lib'

const authenticateJWT = (req: any, res: any, next: any) => {
    try {
        const headerToken = req.headers.authorization.split(" ")[1]
        console.log(headerToken)
        var token = jwt.verify(headerToken, 'jwtPrivateKey')
        req.userData = token
        next();
    } catch (error) {
        return (makeResponse(res, 403, false, 'inavlid token', undefined));
    }
}
export default authenticateJWT;
