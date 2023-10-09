const mongoose = require('mongoose');
/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       properties:
 *         customer:
 *           $ref: '#/components/schemas/User' # Reference to the User schema
 *           description: an id of The user who made the booking.
 *         services:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Service' # Reference to the Service schema
 *           description: An array of service IDs included in the booking.
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date and time of the booking.
 *           example: '2023-10-15T10:00:00Z'
 *         status:
 *           type: string
 *           description: The status of the booking.
 *           enum:
 *             - pending
 *             - ready for delivery
 *             - completed
 *           default: pending
 *           example: completed
 *       required:
 *         - customer
 *         - services
 *         - date
 *         - status
 *       example:
 *         customer:
 *           username: Aswin2667
 *           email: aswin96777@gmail.com
 *           role: CLIENT
 *         services:
 *           - 5f87c8419f81052f441097ce
 *           - 5f87c8439f81052f441097cf
 *         date: '2023-10-15T10:00:00Z'
 *         status: completed
 *       additionalProperties: false
 */


const bookingSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  service: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
  ],
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'ready for delivery', 'completed'],
    default: 'pending',
  },
});
module.exports = mongoose.model("Booking", bookingSchema)