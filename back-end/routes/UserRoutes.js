const express = require('express');
const router = express.Router();
const { register ,login, verifytoken,getUser,setAvatar} = require('../controllers/UserController');

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: User login.
 *     tags:
 *       - User
 *     description: Authenticate a user with username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Indicates if the login was successful.
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated user.
 *       400:
 *         description: Bad request - Missing or invalid parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message.
 *                 status:
 *                   type: boolean
 *                   description: Indicates login failure.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Internal server error message.
 */
router.post('/login',login);

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user.
 *     tags:
 *       - User
 *     description: Create a new user account with a unique username and email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Unique username for the new user (3-20 characters).
 *               email:
 *                 type: string
 *                 description: Unique email address for the new user (up to 50 characters).
 *               password:
 *                 type: string
 *                 description: User's password (5-10 characters).
 *     responses:
 *       200:
 *         description: User successfully registered.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Indicates if the registration was successful.
 *                 
 *       400:
 *         description: Bad request - User already exists (username or email).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message.
 *                 status:
 *                   type: boolean
 *                   description: Indicates registration failure.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Internal server error message.
 */
router.post('/register', register);
/**
 * @swagger
 * /user/auth:
 *   get:
 *     summary: Get authenticated user details.
 *     tags:
 *       - User
 *     description: Retrieve details of the authenticated user using a valid JWT token.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request - Invalid or expired token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 */
router.get("/auth",verifytoken,getUser);

/**
 * @swagger
 * /user/setAvatar/{id}:
 *   put:
 *     summary: Set user profile avatar.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User's ID.
 *         schema:
 *           type: string
 *       - in: body
 *         name: avatarimage
 *         required: true
 *         description: Base64-encoded avatar image.
 *         schema:
 *           type: object
 *           properties:
 *             avatarimage:
 *               type: string
 *     responses:
 *       200:
 *         description: Profile set successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 status:
 *                   type: boolean
 *       500:
 *         description: Internal server error.
 */
router.post("/setAvatar/:id",setAvatar)
module.exports = router 