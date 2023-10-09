const express = require('express');
const router = express.Router();
const { register ,login, verifytoken,getUser,setAvatar ,addItemToCart,removeItemFromCart, getAllUser} = require('../controllers/UserController');



/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: User login
 *     description: Logs in a user with their username and password.
 *     tags:
 *       - User
 *     requestBody:
 *       description: User login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *                 example: Aswin2667
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: secret123
 *             required:
 *               - username
 *               - password
 *     responses:
 *       '200':
 *         description: Successfully logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                   description: Indicates the status of the request (true for success).
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                   description: A JSON Web Token (JWT) for authenticated user access.
 *       '401':
 *         description: Unauthorized. Incorrect username or password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Incorrect Username or Password
 *                   description: A message indicating the reason for unauthorized access.
 *                 status:
 *                   type: boolean
 *                   example: false
 *                   description: Indicates the status of the request (false for failure).
 *       '500':
 *         description: Internal server error.
 */

router.post('/login',login);
/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user on the website.
 *     tags:
 *       - User
 *     requestBody:
 *       description: User registration information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *                 minLength: 3
 *                 maxLength: 20
 *                 example: Aswin2667
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *                 format: email
 *                 maxLength: 50
 *                 example: aswin96777@gmail.com
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 minLength: 5
 *                 maxLength: 10
 *                 example: secret123
 *               phonenumber:
 *                 type: string
 *                 description: The phone number of the user.
 *                 example: 1234567891
 *             required:
 *               - username
 *               - email
 *               - password
 *               - phonenumber
 *     responses:
 *       '200':
 *         description: Successfully registered a new user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                   description: Indicates the status of the request (true for success).
 *                 user:
 *                   $ref: '#/components/schemas/User' # Reference to the User schema
 *       '400':
 *         description: Bad request. Username or email already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Username already exists
 *                   description: A message indicating the reason for the bad request.
 *                 status:
 *                   type: boolean
 *                   example: false
 *                   description: Indicates the status of the request (false for failure).
 *       '500':
 *         description: Internal server error.
 */

router.post('/register', register);




/**
 * @swagger
 * /user/auth:
 *   get:
 *     summary: Get authenticated user details
 *     description: Retrieve authenticated user details using a valid JWT token.
 *     tags:
 *       - Authentication
 *     security:
 *       - BearerAuth: [] # Use JWT token for authentication
 *     responses:
 *       '200':
 *         description: Successfully retrieved authenticated user details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User' # Reference to the User schema
 *       '401':
 *         description: Unauthorized. Invalid or expired JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token Expired
 *       '404':
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User Not Found
 *       '500':
 *         description: Internal server error.
 */
router.get("/auth",verifytoken,getUser);

/**
 * @swagger
 * /user/setAvatar/:id:
 *   put:
 *     summary: Set user avatar image
 *     description: Set the avatar image for a user.
 *     tags:
 *       - User
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *       - name: avatarimage
 *         in: body
 *         description: Avatar image data (base64 or URL)
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             avatarimage:
 *               type: string
 *               description: Avatar image data (base64 or URL)
 *     responses:
 *       '200':
 *         description: Avatar image set successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Profile Set Successfully
 *                 status:
 *                   type: boolean
 *                   example: true
 *       '404':
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User Not Found
 *       '500':
 *         description: Internal server error.
 */

router.post("/setAvatar/:id",setAvatar)
/**
 * @swagger
 * /user/all:
 *   get:
 *     summary: Get all client users
 *     description: Retrieve a list of all client users.
 *     tags:
 *       - User
 *     responses:
 *       '200':
 *         description: List of client users retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '500':
 *         description: Internal server error.
 */

router.get("/all",getAllUser);

module.exports = router 