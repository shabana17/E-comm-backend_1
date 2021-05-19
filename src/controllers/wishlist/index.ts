import { Router } from 'express';
import { Types } from 'mongoose';
import Wishlist from '../../models/wishlist';
import { makeResponse } from '../../lib';
import { setWishlist, getWishlist, editWishlist, deleteWishlist } from '../../services/wishlist'
import products from '../../models/products';
const router = Router();
router.post('/create-wishlist', async (req, res) => {
    const { productId } = req.body;
    const { userId } = req.body;
    const quantity = req.body.quantity;
    const size = req.body.size
    try {
        let users = await Wishlist.findOne({ userId })
        const productDetails = await products.findById(productId);
        if (users) {
            if (productId) {
                users.items[productId].quantity = users.items[productId].quantity + quantity;
                users.items[productId].size = users.items[productId].size
                users.items[productId].total = users.items[productId].quantity * productDetails.price;
                users.items[productId].price = productDetails.price
                users.subTotal = users.items.map((item: any) => item.total).reduce((acc: any, next: any) => acc + next);
            }
            else if (quantity > 0) {
                users.items.push({
                    productId: productId,
                    quantity: quantity,
                    size: size,
                    price: productDetails.price,
                    total: productDetails.price * quantity
                })
                users.subTotal = users.items.map((item: any) => item.total).reduce((acc: any, next: any) => acc + next);
            }
            else {
                return (makeResponse(res, 400, false, 'Something went wrong', undefined));
            }

            let data = await users.save();
            (makeResponse(res, 200, true, 'Item Created', data))
        }
        else {
            const cartData = {
                _id: new Types.ObjectId(),
                items: [{
                    userId: userId,
                    productId: productId,
                    quantity: quantity,
                    size: size,
                    price: productDetails.price,
                    total: (productDetails.price * quantity)
                }],
                subTotal: (productDetails.price * quantity)
            }
            let carts = new Wishlist(cartData);
            let datas = await carts.save();
            return (makeResponse(res, 200, true, 'Item Created', datas));
        }
    }
    catch (err) {
        return (makeResponse(res, 400, false, 'Something went wrong', undefined));
    }
});
router.get('/list-wishlist', async (req, res) => {
    let cart: any = await getWishlist({})
    return (makeResponse(res, 200, true, 'Wishlist Displayed', { cart }));
})
router.put('/edit-wishlist/:id', async (req, res) => {
    let pr: any = await Wishlist.findByIdAndUpdate({ _id: req.params.id }, {
        $set: {
            items: [{
                quantity: req.body.quantity,

            }]
        }
    }, { new: true });
    return (makeResponse(res, 200, true, 'item Updated', { pr }));
})
router.delete('/delete-wishlist/:id', async (req, res) => {
    let cr: any = await deleteWishlist(req.params.id)
    return (makeResponse(res, 200, true, 'Item Deleted', { cr }));
})
export const wishlistController = router;
