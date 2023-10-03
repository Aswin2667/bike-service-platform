const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         message:
 *           type: object
 *           properties:
 *             text:
 *               type: string
 *               description: The text of the message.
 *               example: Hello, how are you?
 *           required:
 *             - text
 *         users:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of user IDs associated with the message.
 *         sender:
 *           type: string
 *           format: uuid
 *           description: The user ID of the sender.
 *           example: 5f4d8c96c11d2922f8263e25
 *       required:
 *         - message
 *         - sender
 */
const MessageSchema = mongoose.Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", MessageSchema);