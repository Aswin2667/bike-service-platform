const express = require('express');
const router = express.Router();
const {createMessage,getMessages,getAllMessages} = require("../controllers/MessageController");


/**
 * @swagger
 * /chat/add:
 *   post:
 *     summary: Create a new message
 *     description: Create a new message with the given sender, receiver, and text.
 *     tags:
 *       - Messages
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sender:
 *                 type: string
 *               receiver:
 *                 type: string
 *               text:
 *                 type: string
 *             required:
 *               - sender
 *               - receiver
 *               - text
 *     responses:
 *       '201':
 *         description: Message created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       '400':
 *         description: Bad request, all fields are required.
 *       '500':
 *         description: Internal server error.
 */
router.post("/add",createMessage);


/**
 * @swagger
 * /messages/getMessages:
 *   get:
 *     summary: Get messages between two users
 *     description: Retrieve a list of messages between two users.
 *     tags:
 *       - Messages
 *     parameters:
 *       - name: sender
 *         in: query
 *         description: Sender's username.
 *         required: true
 *         schema:
 *           type: string
 *       - name: receiver
 *         in: query
 *         description: Receiver's username.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: List of messages retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       '400':
 *         description: Bad request, sender and receiver are required parameters.
 *       '500':
 *         description: Internal server error.
 */
router.get("/",getMessages);





/**
 * @swagger
 * /chat/:
 *   get:
 *     summary: Get all messages
 *     description: Retrieve a list of all messages.
 *     tags:
 *       - Messages
 *     responses:
 *       '200':
 *         description: List of messages retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       '500':
 *         description: Internal server error.
 */
router.get("/all",getAllMessages);
module.exports = router