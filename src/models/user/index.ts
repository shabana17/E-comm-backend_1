import { model, Schema } from 'mongoose';

const userSchema = new Schema({

  name: {
    type: String,
    required: true,
    lowercase: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  gender: {
    type: String,
    enum: ['MALE', 'FEMALE'],
    required: true
  },
  phone: String,
  password: {
   type: String,
   required: true
  },
  department: {
    type: String,
    required: true,
    enum: ['IOS', 'ANDROID', 'BACKEND', 'FRONTEND-WEB', 'MARKETING', 'SEO', 'HR']
  },
  role: {
    type: String,
    enum: ['HR', 'ADMIN', 'USER', 'DEVELOPER'],
    required: true,
    default: 'DEVELOPER'
  },
  picture: String,
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE', 'DELETED'],
    required: true,
    default: 'ACTIVE'
  }
}, { timestamps: true });

export const USER = model('users', userSchema, 'USERS');
