const express = require("express");
const router = express.Router();
const {addBooking,getAllBookingsWithCustomerDetails,updateBookingStatus,getBookingsByIds,getBookingByUserId , deleteBookingById} = require("../controllers/BookingController");

/**
 * @swagger
 * /booking/add:
 *   post:
 *     summary: Create a new booking
 *     description: Create a new booking and link it to a customer.
 *     tags:
 *       - Bookings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'  # Reference the Booking schema
 *     responses:
 *       201:
 *         description: Successfully created a new booking.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'  # Reference the Booking schema for the response
 *       404:
 *         description: Customer not found.
 *         content:
 *           application/json:
 *             example:
 *               message: Customer not found.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error.
 */
router.post("/add",addBooking);
/**
 * @swagger
 * /booking/getall:
 *   get:
 *     summary: Get all bookings with customer details
 *     description: Retrieve a list of all bookings with customer and service details.
 *     tags:
 *       - Bookings
 *     responses:
 *       200:
 *         description: Successfully retrieved bookings with customer details.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'  # Reference the Booking schema for each item in the array
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error.
 */
router.get("/getall",getAllBookingsWithCustomerDetails);


/**
 * @swagger
 * /bookings/{bookingId}/status:
 *   put:
 *     summary: Update the status of a booking
 *     description: Update the status of a booking by specifying its booking ID.
 *     tags:
 *       - Bookings
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         description: The ID of the booking to update.
 *         schema:
 *           type: string
 *       - in: body
 *         name: status
 *         description: The new status for the booking.
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The updated status for the booking.
 *     responses:
 *       200:
 *         description: Successfully updated the booking status.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'  # Reference the Booking schema for the updated booking
 *       404:
 *         description: Booking not found.
 *         content:
 *           application/json:
 *             example:
 *               message: Booking not found.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error.
 */
router.put("/:bookingId/status" ,updateBookingStatus)


router.get('/getbookingsbyids', getBookingsByIds )



router.get('/getBookingByUserId', getBookingByUserId )

  router.delete("/remove/",deleteBookingById)


module.exports = router