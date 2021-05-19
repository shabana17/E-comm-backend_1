import User from '../../models/user';
const setUser = async (register = {}) => { User.create(register); };
const getUser = async (find = {}) => User.findOne(find).lean().exec();
export { setUser, getUser };