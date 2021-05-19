import { Router } from 'express';
import { authController } from '../controllers/auth';
import { userController } from '../controllers/user';
import { productController } from '../controllers/products';
import { cartController } from '../controllers/cart';
import { wishlistController } from '../controllers/wishlist';
import { checkoutController } from '../controllers/checkout'
import { paymentController } from '../controllers/checkout/payment'
const router = Router();
router.use('/auth', authController);
router.use('/user', userController);
router.use('/product', productController);
router.use('/add-to-cart', cartController);
router.use('/wishlist', wishlistController);
router.use('/checkout/shipping-address', checkoutController)
router.use('/checkout/add-to-cart', checkoutController)
router.use('/checkout/payment', paymentController)
export { router };
