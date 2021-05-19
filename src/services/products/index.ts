import Products from '../../models/products';
const setProduct = async (pro = {}) => { Products.create(pro); };
const getProduct = async (pr = {}) => Products.find({ catagoryname: pr }).lean().exec();
const editProduct = async (update = {}, pr = {}) => Products.findByIdAndUpdate({ _id: update }, {
    $set: {
        image: pr,
        description: pr,
        price: pr,
        catagoryname: pr
    }
}, { new: true }).lean().exec();
const deleteProduct = async (pr = {}) => Products.findByIdAndDelete({ _id: pr }).lean().exec();
export { setProduct, getProduct, editProduct, deleteProduct };