import { Router } from 'express';
import { Types } from 'mongoose';
import Stripe from 'stripe'
import { makeResponse } from '../../lib';
const router = Router();
const stripe = new Stripe('sk_test_51Ig2N0SGrPnX6m5Q42nzPR1cQcqeGKEo6qkARCRXw0tm2w0cChfClLgQFYEc3e1qJg8sM1UqNAA3hm4A8KdoT7YA00YEsAEi9j', {
  apiVersion: '2020-08-27',
});
router.post('/', (req, res) => {
  const { product, token } = req.body;
  console.log(product)
  return stripe.customers.create({
    email: token.email,
    source: token._id
  }).then(customer => {
    stripe.charges.create({
      amount: product.price*100,
      currency: 'usd',
      customer: customer.id,
      receipt_email: token.email,
      description: product.name  
    })
  }).then(result => {
    return (makeResponse(res, 200, true, "Successful Payment", result))
  }).catch(error => {
    return (makeResponse(res, 400, false, 'Something went wrong', error))
  })
})
export const paymentController = router

