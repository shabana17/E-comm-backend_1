import Cart from '../../models/cart';
const setCart = async (pro = {}) => { Cart.create(pro); };
const getCart = async (cart = {}) => Cart.find({}).lean().exec();
const editCart = async (update = {}, pr = {}) => Cart.findByIdAndUpdate({ _id: update }, {
    $set: {
        image: pr,
        description: pr,
        price: pr,
        catagoryname: pr
    }
}, { new: true }).lean().exec();
const deleteCart = async (cr = {}) => Cart.findByIdAndDelete({ _id: cr }).lean().exec();
export { setCart, getCart, editCart, deleteCart };