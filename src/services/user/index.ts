import User from '../../models/user';
const getUser = async (find = {}) => User.findOne(find).lean().exec();
const updateUser = async (find = {}) => User.findByIdAndUpdate({}).lean().exec();
export { getUser, updateUser };