import mongoose, { Schema } from 'mongoose';

const ShippingSchema: Schema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    address1: {
        type: String,
    },
    address2: {
        type: String,
    },
    city: {
        type: String,
    },
    zip: {
        type: Number,
    },
    country: {
        type: String,
    }
});
export default mongoose.model('Shipping-Address', ShippingSchema);
