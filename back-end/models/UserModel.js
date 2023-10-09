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
 *           description: The username of the user.
 *           minLength: 3
 *           maxLength: 20
 *           example: Aswin2667
 *         email:
 *           type: string
 *           description: The email address of the user.
 *           format: email
 *           maxLength: 50
 *           example: aswin96777@gmail.com
 *         password:
 *           type: string
 *           description: The password of the user.
 *           minLength: 5
 *           maxLength: 10
 *           example: secret123
 *         role:
 *           type: string
 *           description: The role of the user.
 *           enum:
 *             - ADMIN
 *             - CLIENT
 *           default: CLIENT
 *           example: CLIENT
 *         isAvatarImageSet:
 *           type: boolean
 *           description: Indicates if an avatar image is set for the user.
 *           default: false
 *           example: false
 *         avatarImage:
 *           type: string
 *           description: The URL or path to the user's avatar image (base64 images only).
 *           example: werqc3rwxr3x135c.......
 *         bookings:
 *           type: array
 *           description: An array of booking IDs associated with the user.
 *           items:
 *             $ref: '#/components/schemas/Booking' # Reference to the Booking schema
 *         phonenumber:
 *           type: string
 *           description: The phone number of the user.
 *           example: 1234567891
 *       example:
 *         username: Aswin2667
 *         email: aswin96777@gmail.com
 *         password: secret123
 *         role: CLIENT
 *         isAvatarImageSet: false
 *         avatarImage: werqc3rwxr3x135c.......
 *         bookings:
 *           - 5f87c83e9f81052f441097cd
 *           - 5f87c8419f81052f441097ce
 *         phonenumber: 1234567891
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