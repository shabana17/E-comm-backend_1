import { Types } from 'mongoose';
import { USER } from '../../models';

const checkExisting = async (search = {}) => new Promise((resolve, reject) => {
  USER.findOne(search)
    .then(resolve)
    .catch(reject);
});

const saveUser = async (userDetails = {}) => new Promise((resolve, reject) => {
  const newUser = new USER(userDetails);
  newUser.save()
    .then(resolve)
    .catch(reject);
});

const editUser = async (search = {}, update = {}, options = {}) => new Promise((resolve, reject) => {
  USER.findOneAndUpdate(search, update, options)
    .then(resolve)
    .catch(reject);
});

const deleteUser = async (id: Types.ObjectId) => new Promise((resolve, reject) => {
  USER.findByIdAndDelete(id)
    .then(resolve)
    .catch(reject);
});

export { checkExisting, saveUser, editUser, deleteUser };
