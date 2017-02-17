import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const UserSchema = new Schema ({
  mail: String,
  created:{
       type: Date,
       default: Date.now
   },
  password: String,
  token: String
})
export const User = mongoose.model('User', UserSchema);
