import mongoose, { Schema } from 'mongoose';
import products from './products';
import user from './user';
const CartSchema: Schema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: products,
    },
    quant: {
      type: Number,
      required: true,
      min: [1, 'Quantity can not be less then 1.']
    },
    size: {
      Type: String
    },
    total: {
      Type: String
    }
  }],
  subTotal: {
    default: 0,
    type: Number
  }
});
export default (mongoose.model("cart", CartSchema));
