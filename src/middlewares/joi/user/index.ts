import joi, { allow } from 'joi';
import { makeResponse } from '../../../lib';

export const registerValidation = (req: any, res: any, next: any) => {
  console.log(req.body);
  
  const userSchema = joi.object({
    name: joi.string()
      .required(),
    email: joi.string()
      .required()
      .lowercase(),
    gender: joi.string()
      .allow('MALE', 'FEMALE')
      .required(),
    phone: joi.string()
    .allow(''),
    password: joi.string()
      .required(),
    department: joi.string()
      .required()
      .allow('IOS', 'ANDROID', 'BACKEND', 'FRONT-WEB', 'MARKETING', 'SEO', 'HR'),
    role: joi.string()
      .allow('HR', 'ADMIN', 'USER', 'DEVELOPER')
      .required()
      .default('DEVELOPER'),
    picture: joi.string()
    .allow(''),
    status: joi.string()
      .allow('ACTIVE', 'INACTIVE', 'DELETED')
      .required()
      .default('ACTIVE')
  });
  const { value, error } = userSchema.validate(req.body);
  if (error) {
    console.log(error);
    
    return makeResponse(res, 500, false, error.message);
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
  const { value, error } = loginCredentials.validate(req.body);
  if (error) {
    return makeResponse(res, 500, false, error.message);
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
  const { value, error } = editUser.validate(req.body);
  if (error) {
    return makeResponse(res, 500, false, error.message);
  }
  next();
};
