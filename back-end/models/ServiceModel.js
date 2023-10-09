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
 *           example: Full Bike Service
 *         price:
 *           type: number
 *           format: double
 *           description: The price of the service.
 *           example: 50.00
 *         timeToComplete:
 *           type: number
 *           description: The estimated time (in minutes) to complete the service.
 *           example: 120
 *         serviceimage:
 *           type: string
 *           description: base64 URL or path to an image representing the service (optional).
 *           example: sdwer3c13c5ferfweff....
 *       required:
 *         - name
 *         - price
 *         - timeToComplete
 *       example:
 *         name: Full Bike Service
 *         price: 50.00
 *         timeToComplete: 120
 *         serviceimage: /images/full_bike_service.jpg
 *       additionalProperties: false
 */

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  timeToComplete: {
    type: Number,
    required: true,
  },
  serviceimage:{
    type:String,
    default:"",
  }
});

module.exports = mongoose.model('Service', serviceSchema);
