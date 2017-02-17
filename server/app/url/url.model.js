import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const urlSchema = new Schema ({
  userId: String,
  created:{
       type: Date,
       default: Date.now
   },
  url: String,
  gender: String,
  notatype: String,
  notification: {
    type: String,
    default: null
  },
  acquired: Date,
  geoinfo: String,
  vendorId: String,
  productId: String,
})
export const Url = mongoose.model('Url', urlSchema);
