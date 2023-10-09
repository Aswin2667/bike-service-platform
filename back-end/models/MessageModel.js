const mongoose = require("mongoose");
/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         sender:
 *           type: string
 *           description: The sender of the message.
 *           example: Aswin2667
 *         receiver:
 *           type: string
 *           description: The receiver of the message.
 *           example: Admin
 *         text:
 *           type: string
 *           description: The text content of the message.
 *           example: Hello, how are you?
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the message was sent.
 *           example: '2023-10-15T14:30:00Z'
 *       required:
 *         - sender
 *         - receiver
 *         - text
 *       example:
 *         sender: Admin
 *         receiver: Aswin2667
 *         text: Hello, how are you?
 *         timestamp: '2023-10-15T14:30:00Z'
 *       additionalProperties: false
 */

const MessageSchema = new mongoose.Schema({
  sender: {
    type: String, // You can change the type to match your user schema
    required: true,
  },
  receiver: {
    type: String, // You can change the type to match your user schema
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Messages", MessageSchema);