import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String
    }
});
export default mongoose.model('User', UserSchema);
