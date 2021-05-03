import joi from 'joi';
import { makeResponse } from '../../../lib';

export const registerValidation = (req: any, res: any, next: any) => {
  const userSchema = joi.object({
    name: joi.string()
      .required(),
    email: joi.string()
      .required()
      .lowercase(),
    gender: joi.string()
      .allow('MALE', 'FEMALE')
      .required(),
    phone: joi.string(),
    password: joi.string()
      .required(),
    department: joi.string()
      .required()
      .allow('ios', 'android', 'backend', 'frontend-web', 'marketing', 'seo', 'hr'),
    role: joi.string()
      .allow('HR', 'ADMIN', 'USER', 'DEVELOPER')
      .required()
      .default('DEVELOPER'),
    picture: joi.string(),
    status: joi.string()
      .allow('ACTIVE', 'INACTIVE', 'DELETED')
      .required()
      .default('ACTIVE')
  });
  const {error} = userSchema.validate(req.body);
  if (error) {
    return makeResponse(res, 400, false, error.message);
  }
  next();
};

export const loginValidation = (req: any, res: any, next: any) => {
  const loginCredentials = joi.object({
    email: joi.string()
      .required()
      .lowercase(),
    password: joi.string()
      .required()
  });
  const {error} = loginCredentials.validate(req.body);
  if (error) {
    return makeResponse(res, 400, false, error.message);
  }
  next();
};

export const editUserValidation = (req: any, res: any, next: any) => {
  const editUser = joi.object({
    user_id: joi.string()
      .hex()
      .required(),
    name: joi.string(),
    email: joi.string()
      .lowercase(),
    gender: joi.string()
      .allow('MALE', 'FEMALE'),
    phone: joi.string(),
    department: joi.string()
      .allow('ios', 'android', 'backend', 'frontend-web', 'marketing', 'seo', 'hr'),
    role: joi.string()
      .allow('HR', 'ADMIN', 'USER', 'DEVELOPER'),
    picture: joi.string(),
    status: joi.string()
      .allow('ACTIVE', 'INACTIVE', 'DELETED')
  });
  const {error} = editUser.validate(req.body);
  if (error) {
    return makeResponse(res, 400, false, error.message);
  }
  next();
};
