import { Router } from 'express';
import { Types } from 'mongoose'
import shippingAddress from '../../models/shippinAddress';
import { makeResponse } from '../../lib';
import { setShippingData, getShippingData, deleteShippingData } from '../../services/shipping';
import { getCart } from '../../services/cart'
const router = Router();
router.post('/create-shipping-data', async (req, res) => {
    let shippingData: any = await setShippingData({
        _id: new Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country
    });
    return (makeResponse(res, 200, true, 'Shipping Address Created', { shippingData }));
});
router.get('/list-shipping-data', async (req, res) => {
    let shipData: any = await getShippingData({});
    return (makeResponse(res, 200, true, 'Shipping Address Dispalyed', shipData));
});
router.put('/edit-shipping-data/:id', async (req, res) => {
    let ship: any = await shippingAddress.findByIdAndUpdate({ _id: req.params.id }, {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address1: req.body.address1,
            address2: req.body.address2,
            city: req.body.city,
            zip: req.body.zip,
            country: req.body.country
        }
    }, { new: true });
    return (makeResponse(res, 200, true, 'Shipping Address Updated', { ship }));
})
router.delete('/delete-shipping-data/:id', async (req, res) => {
    let sh: any = await deleteShippingData(req.params.id)
    return (makeResponse(res, 200, true, 'Shipping Address Deleted', { sh }));
});
router.get('/', async (req, res) => {
    let cart: any = await getCart({})
    return (makeResponse(res, 200, true, 'Cart Displayed', { cart }));
})
export const checkoutController = router;
