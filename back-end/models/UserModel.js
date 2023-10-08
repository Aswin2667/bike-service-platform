const mongoose = require('mongoose')
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: Unique username for the user (3-20 characters).
 *         email:
 *           type: string
 *           description: Unique email address for the user (up to 50 characters).
 *         password:
 *           type: string
 *           description: User's password (5-10 characters).
 *         role:
 *           type: string
 *           enum: ['ADMIN', 'CLIENT']
 *           default: 'CLIENT'
 *           description: User's role, which can be 'ADMIN' or 'CLIENT'.
 *         isAvatarImageSet:
 *           type: boolean
 *           default: false
 *           description: Indicates whether the user has set an avatar image.
 *         avatarimage:
 *           type: string
 *           default: ''
 *           description: URL or path to the user's avatar image.
 *         bookings:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Booking'
 *           description: An array of booking IDs associated with the user.
 */
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
  },
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
    },
  ],
  phonenumber:{
    type:String,
    required:true 
  }
});
module.exports  = mongoose.model('User', userSchema);