import Wishlist from '../../models/wishlist';
const setWishlist = async (pro = {}) => Wishlist.create(pro);
const getWishlist = async (cart = {}) => Wishlist.find({}).lean().exec();
const editWishlist = async (update = {}, pr = {}) => Wishlist.findByIdAndUpdate({ _id: update }, {
    $set: {
        image: pr,
        description: pr,
        price: pr,
        catagoryname: pr
    }
}, { new: true }).lean().exec();
const deleteWishlist = async (cr = {}) => Wishlist.findByIdAndDelete({ _id: cr }).lean().exec();
export { setWishlist, getWishlist, editWishlist, deleteWishlist };