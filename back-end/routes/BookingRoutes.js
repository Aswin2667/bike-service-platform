const express = require("express");
const router = express.Router();
const {addBooking,getAllBookingsWithCustomerDetails,updateBookingStatus,getBookingsByIds,getBookingByUserId , deleteBookingById} = require("../controllers/BookingController");

/**
 * @swagger
 * /booking/add:
 *   post:
 *     summary: Create a new bike service booking
 *     description: Creates a new bike service booking for a customer.
 *     tags:
 *       - Booking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: string
 *                 description: The ID of the customer making the booking.
 *                 $ref: '#/components/schemas/User' # Reference to the User schema
 *                 example: 5f87c83e9f81052f441097cd
 *               serviceIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: An array of service IDs to include in the booking.
 *                   $ref: '#/components/schemas/Service' # Reference to the Service schema
 *                 example:
 *                   - 5f87c8419f81052f441097ce
 *                   - 5f87c8439f81052f441097cf
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time of the booking.
 *                 example: '2023-10-15T10:00:00Z'
 *               status:
 *                 type: string
 *                 description: The status of the booking.
 *                 enum:
 *                   - pending
 *                   - ready for delivery
 *                   - completed
 *                 default: pending
 *                 example: completed
 *             required:
 *               - customerId
 *               - serviceIds
 *               - date
 *     responses:
 *       '201':
 *         description: Bike service booking created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 savedBooking:
 *                   $ref: '#/components/schemas/Booking' # Reference to the Booking schema
 *       '400':
 *         description: Bad request. The request body is missing required fields.
 *       '404':
 *         description: Customer not found.
 *       '500':
 *         description: Internal server error.
 */

router.post("/add",addBooking);

/**
 * @swagger
 * /booking/getall:
 *   get:
 *     summary: Get all bike service bookings with customer details
 *     description: Retrieves all bike service bookings along with customer details and associated service names.
 *     tags:
 *       - Booking
 *     responses:
 *       '200':
 *         description: Successfully retrieved bike service bookings with customer details.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking' # Reference to the BookingWithDetails schema
 *       '500':
 *         description: Internal server error.
 */

router.get("/getall",getAllBookingsWithCustomerDetails);


/**
 * @swagger
 * /booking/{bookingId}/status:
 *   put:
 *     summary: Update the status of a bike service booking
 *     description: Updates the status of a bike service booking identified by its ID.
 *     tags:
 *       - Booking
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the booking to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: The new status for the booking.
 *                 enum:
 *                   - pending
 *                   - ready for delivery
 *                   - completed
 *                 example: completed
 *             required:
 *               - status
 *     responses:
 *       '200':
 *         description: Successfully updated the booking status.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking' # Reference to the Booking schema
 *       '400':
 *         description: Bad request. The request body is missing required fields.
 *       '404':
 *         description: Booking not found.
 *       '500':
 *         description: Internal server error.
 */

router.put("/:bookingId/status" ,updateBookingStatus)

/**
 * @swagger
 * /booking/byIds:
 *   get:
 *     summary: Get bookings by their IDs
 *     description: Retrieves bike service bookings by their IDs, provided as a query parameter.
 *     tags:
 *       - Booking
 *     parameters:
 *       - in: query
 *         name: bookingIds
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of booking IDs to retrieve.
 *           example: ['5f87c83e9f81052f441097cd', '5f87c8419f81052f441097ce']
 *     responses:
 *       '200':
 *         description: Successfully retrieved bike service bookings by IDs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                   description: Indicates the status of the request.
 *                 bookings:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Booking' # Reference to the BookingWithDetails schema
 *                   description: An array of booking data.
 *       '404':
 *         description: Bookings not found.
 *       '500':
 *         description: Internal server error.
 */

router.get('/getbookingsbyids', getBookingsByIds )


/**
 * @swagger
 * /bookings/byUserId:
 *   get:
 *     summary: Get bookings by user ID
 *     description: Retrieves bike service bookings associated with a user by their user ID.
 *     tags:
 *       - Booking
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *           description: The ID of the user to retrieve bookings for.
 *           example: 5f87c83e9f81052f441097cd
 *         required: true
 *     responses:
 *       '200':
 *         description: Successfully retrieved bike service bookings for the specified user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                   description: Indicates the status of the request.
 *                 bookings:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Booking' # Reference to the BookingWithService schema
 *                   description: An array of booking data associated with the user.
 *       '400':
 *         description: Bad request. The 'userId' query parameter is required.
 *       '404':
 *         description: No bookings found for the specified user.
 *       '500':
 *         description: Internal server error.
 */

router.get('/getBookingByUserId', getBookingByUserId )

/**
 * @swagger
 * /bookings:
 *   delete:
 *     summary: Delete bookings by ID(s)
 *     description: Deletes bike service bookings by their ID(s).
 *     tags:
 *       - Booking
 *     parameters:
 *       - in: query
 *         name: bookingIds
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *             format: ObjectId
 *           description: An array of booking IDs to delete.
 *           example: ["5f87c83e9f81052f441097cd", "5f87c8419f81052f441097ce"]
 *         required: true
 *     responses:
 *       '200':
 *         description: Successfully deleted the specified bike service bookings.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                   description: Indicates the status of the request (true for success).
 *                 message:
 *                   type: string
 *                   example: Bookings deleted successfully
 *                   description: A message indicating the success of the deletion.
 *       '400':
 *         description: Bad request. The 'bookingIds' query parameter is required.
 *       '500':
 *         description: Internal server error.
 */

  router.delete("/remove/",deleteBookingById)


module.exports = router