import { Types } from 'mongoose';
import { USER } from '../../models';

const getUser = async (search = {}) =>
  USER.findOne(search)
    .lean()
    .exec();

const saveUser = async (userDetails = {}) => USER.create(userDetails);

const editUser = async (search = {}, update = {}, options = {}) =>
  USER.findOneAndUpdate(search, update, options)
    .lean()
    .exec();

const deleteUser = async (id: Types.ObjectId) =>
  USER.findByIdAndDelete(id)
    .lean()
    .exec();

export { getUser, saveUser, editUser, deleteUser };
