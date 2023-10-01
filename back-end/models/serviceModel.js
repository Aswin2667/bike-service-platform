const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the service.
 *         description:
 *           type: string
 *           description: Additional description of the service.
 *         price:
 *           type: number
 *           description: The price of the service.
 *         timeToComplete:
 *           type: number
 *           description: The estimated time (in minutes) to complete the service.
 */
const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  timeToComplete: {
    type: Number,
    required: true,
  },
  // Add more fields as needed
});

module.exports = mongoose.model('Service', serviceSchema);
