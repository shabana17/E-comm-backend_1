import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

const hashPassword = async (rawPassword: string) => new Promise((resolve, reject) => {
  hash(rawPassword, 10)
    .then(resolve)
    .catch(reject);
});

const matchPassword = async (raw: string, encrypted: string) => new Promise((resolve, reject) => {
  compare(raw, encrypted)
    .then(resolve)
    .catch(reject);
});

const assignToken = (payload: object, secret: string): string => {
  return sign(payload, secret);
};

export { hashPassword, matchPassword, assignToken };
