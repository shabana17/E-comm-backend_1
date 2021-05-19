import mongoose, { Schema } from 'mongoose';
const ProductSchema: Schema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  title: {
    type: String
  },
  image: {
    type: String,
    default: 'no photo'
  },
  description: {
    type: String
  },
  price: {
    type: Number
  },
  catagoryname: {
    type: String
  }

});
export default (mongoose.model('products', ProductSchema));
