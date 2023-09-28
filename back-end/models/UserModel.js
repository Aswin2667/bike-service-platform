const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  username:{
    type:String,
    unique:true,
    required :true,
    min:3,
    max:20
  },
  email: {
    type: String,
    unique: true,
    required: true,
    max:50
  },
  password: {
    type: String,
    required: true,
    min:5,
    max:10,
  },
  role: {
    type: String,
    enum: ['ADMIN', 'CLIENT'],
    default: 'CLIENT',
  },
  isAvatarImageSet:{
    type:Boolean,
    default:false,
  },
  avatarimage:{
    type:String,
    default:"",
  }
});
module.exports  = mongoose.model('User', userSchema);