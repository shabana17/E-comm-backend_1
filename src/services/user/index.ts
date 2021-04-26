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

export { checkExisting, saveUser };
