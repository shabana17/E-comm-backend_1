import mongoose, { Schema ,Document} from 'mongoose';
// function toLower(v: any){
//     return v.toLowerCase()
// }
// function hide(cc: any){
//     return '****'+cc.slice(cc.length-4, cc.length)
// }

// interface IUser extends Document{
//     email: string;
//     username:string,
//     password: string;
//     location: string;
//   }
const UserSchema= new Schema({
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
        unique: true,
        // set:toLower,
        // get:hide
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
// UserSchema.methods.findByUsername=function findByUsername(cb){
//     return this.model('User').find({username:this.username},cb)
// }
// UserSchema.statics.findByLocation=function findByLocation(location,cb){
//     return this.where('location', new RegExp(location, 'i').exec(cb))
// }
// UserSchema.post('save', function(doc, next) {
//     console.log('post');
//     next();
//   });
//   UserSchema.pre('save', function() {
//     console.log('pre');
    
//   });
export default mongoose.model('User', UserSchema);
