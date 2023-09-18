const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['ADMIN', 'CLIENT'],
    default: 'CLIENT',
  },
});
module.exports  = mongoose.model('User', userSchema);