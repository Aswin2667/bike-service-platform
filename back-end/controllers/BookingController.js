const Booking = require("../models/BookingModel");
const User = require("../models/UserModel");
const {sendEmail} = require("../helpers/Mail")
const mongoose = require("mongoose")
module.exports.addBooking = async (req, res, next) => {
  try {
    const { customerId, serviceIds, date, status = 'pending' } = req.body;
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
    const emailSubject = 'Booking Confirmation';
    const emailText = `Dear Customer,\n\nYour bike service booking (Booking ID: ${savedBooking._id}) has been confirmed for the following details:\n\nDate and Time: ${new Date(date)}\n\nThank you for choosing our bike service.\n\nBest regards,\n[Bike Care pvt ]\n[bikecare.no.replay@gmail.com]`;
    const emailHtml = `<p>Dear Customer,</p><p>Your bike service booking (Booking ID: ${savedBooking._id}) has been confirmed for the following details:</p><p><strong>Date and Time:</strong> ${new Date(date).toString()}</p><p>Thank you for choosing our bike service.</p><p>Best regards,<br>[Bike Care pvt ]<br>[bikecare.no.replay@gmail.com]</p>`;
    sendEmail(customer.email , emailSubject, emailText, emailHtml, (error, response) => {
      if (error) {
        console.error('Error sending completion email:', error);
      } else {
        console.log('Completion email sent successfully:', response);
      }
    });
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

    if (status === 'completed') {
      const user = await User.findById(updatedBooking.customer);
      const customerName = user.username;
      const customerEmail = user.email;
      const bookingID = updatedBooking._id; 
      const dateAndTime = updatedBooking.date;  

      const emailSubject = 'Bike Service Booking Completed';
      const emailText = `Dear ${customerName},\n\nWe are pleased to inform you that your bike service booking (Booking ID: ${bookingID}) has been successfully completed. Our team has worked diligently to ensure that your bike is in top condition.\n\nBooking Details:\n- Booking ID: ${bookingID}\n- Date and Time: ${dateAndTime}\n\nIf you have any questions or need further assistance, please don't hesitate to contact us.\n\nThank you for choosing our bike service.\n\nBest regards,\n[Bike Care]\n[bikecare.no.replay.@gmail.com]`;
      const emailHtml = `<p>Dear ${customerName},</p><p>We are pleased to inform you that your bike service booking (Booking ID: ${bookingID}) has been successfully completed. Our team has worked diligently to ensure that your bike is in top condition.</p><p><strong>Booking Details:</strong></p><ul><li>Booking ID: ${bookingID}</li><li>Date and Time: ${dateAndTime}</li></ul><p>If you have any questions or need further assistance, please don't hesitate to contact us.</p><p>Thank you for choosing our bike service.</p><p>Best regards,<br>[Bike Care]<br>[bikecare.no.replay.@gmail.com]</p>`;

      sendEmail(customerEmail, emailSubject, emailText, emailHtml, (error, response) => {
        if (error) {
          console.error('Error sending completion email:', error);
        } else {
          console.log('Completion email sent successfully:', response);
        }
      });
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


module.exports.getBookingByUserId = async (req, res) => {
  const { userId } = req.query;
  try {
    if (!userId) {
      return res.status(400).json({ error: 'userId is required.' });
    }

    // Assuming you have a User model with a field 'userId'
    const bookings = await Booking.find({ customer: userId }).populate(
      {
        path: 'service',
        select: 'name',
        model: 'Service'
      }
    )

    // You can perform any additional processing or filtering here

    return res.status(200).json({ status: true, bookings });
  } catch (error) {
    console.error('Error fetching bookings by user ID:', error);
    return res.status(500).json({ error: 'Error fetching bookings.' });
  }
};



module.exports.deleteBookingById = async (req, res) => {
  const { bookingIds } = req.query; // Retrieve bookingIds from query parameters
  if (bookingIds === "") {
    return res.json({ status: false, message: "No booking found" });
  }
  try {
    // Delete the bookings by their IDs
    const objectIds = Array.isArray(bookingIds)
    ? bookingIds.map(id => new mongoose.Types.ObjectId(id))
    : [new mongoose.Types.ObjectId(bookingIds)];
    
    await User.updateMany(
      { bookings: { $in: objectIds } },
      { $pull: { bookings: { $in: objectIds } } }
    );
    await Booking.deleteMany({ _id: { $in: objectIds } });
    res.json({ status: true, message: 'Bookings deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }

};