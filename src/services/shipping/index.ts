import ShippingAddress from '../../models/shippinAddress';
const getShippingData = async (find = {}) => ShippingAddress.findOne(find).lean().exec();
const setShippingData = async (ship = {}) => { ShippingAddress.create(ship); };
const deleteShippingData = async (ships = {}) => ShippingAddress.findByIdAndDelete({ _id: ships }).lean().exec();
export { getShippingData, setShippingData, deleteShippingData };