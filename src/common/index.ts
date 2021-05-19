import { sign } from 'jsonwebtoken';
const token = (payload: object, secretkey: string) => {
    return sign(payload, secretkey);
};
export { token };
