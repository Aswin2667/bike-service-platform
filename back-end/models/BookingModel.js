const mongoose = require('mongoose');
/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       properties:
 *         customer:
 *           type: string
 *           description: The ID of the customer who made the booking.
 *         service:
 *           type: string
 *           description: The ID of the service being booked.
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date and time when the booking was made.
 *         status:
 *           type: string
 *           enum: ['pending', 'ready for delivery', 'completed']
 *           default: 'pending'
 *           description: The status of the booking, which can be 'pending', 'ready for delivery', or 'completed'.
 *         
 */
const bookingSchema = new mongoose.Schema({
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'ready for delivery', 'completed'],
      default: 'pending',
    },
    // Add more fields as needed (e.g., payment information, bike details)
  });
  module.exports = mongoose.model("Booking",bookingSchema)