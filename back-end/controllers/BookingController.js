const Booking = require("../models/BookingModel");
const User = require("../models/UserModel");

module.exports.addBooking = async (req, res, next) => {
  try {
    const { customerId, serviceIds, date, status = 'pending' } = req.body;
    console.log(req.body);
    if (!date) {
      return res.json({ status: false, message: "Date is Required" });
    }
    const customer = await User.findById(customerId);

    if (!customer) {
      return res.status(404).json({ status: false, message: 'Customer not found.' });
    }
    const savedBooking = await Booking.create({
      customer: customer._id,
      service: serviceIds,
      date,
      status,
    });
    customer.bookings.push(savedBooking._id);
    await customer.save();
    console.log(savedBooking);
    res.status(201).json({ status: true, savedBooking });
  } catch (error) {
    next(error);
  }
}


module.exports.getAllBookingsWithCustomerDetails = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate({
        path: 'customer',
        select: 'username email avatarimage',
        model: User,
      })
      .populate({
        path: 'service',
        select: 'name'
      });
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

module.exports.updateBookingStatus = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );
    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }
    res.json(updatedBooking);
  } catch (error) {
    next(error);
  }
}

module.exports.getBookingsByIds = async (req, res) => {
  const { bookingIds } = req.query; // Retrieve bookingIds from query parameters 
  if (bookingIds === "") {
    return res.json({ status: false, message: "No booking found" });
  }
  try {
    // Split the query parameter into an array of booking IDs
    // const bookingIdsArray = bookingIds.split("&bookingIds=");
    const bookings = await Booking.find({ _id: { $in: bookingIds } })
      .populate({
        path: 'customer', // Assuming 'customer' is a reference to the User model
        select: 'username email',
        model: 'User', // Provide the string name of the User model
      })
      .populate({
        path: 'service', // Assuming 'service' is a reference to the Service model
        select: 'name',
        model: 'Service', // Provide the string name of the Service model
      });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ status: false, message: 'Bookings not found' });
    }
    // Return the array of booking data
    res.json({ status: true, bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
