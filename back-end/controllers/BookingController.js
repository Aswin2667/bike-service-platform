const Booking = require("../models/BookingModel");
const User = require("../models/UserModel");

module.exports.addBooking = async (req, res, next) => {
    try {
        const { customerId, serviceIds, date, status = 'pending' } = req.body;
        console.log(req.body);
        if(!date){
          return res.json({status:false,message:"Date is Required"});
        }
        const customer = await User.findById(customerId);
    
        if (!customer) {
          return res.status(404).json({status:false, message: 'Customer not found.' });
        }
        const savedBooking = await Booking.create({
            customer: customer._id, 
          service: serviceIds,
          date,
          status,
        });
        customer.bookings.push(savedBooking._id);
        await customer.save();
        res.status(201).json({status:true,savedBooking}); 
      } catch (error) {
        next(error);
      }
}


module.exports.getAllBookingsWithCustomerDetails = async (req, res, next) => {
    try {
      const bookings = await Booking.find()
        .populate({
          path: 'customer',
          select: 'username email', 
          model: User,
        })
        .populate('service');
      res.json(bookings);
    } catch (error) {
      next(error);
    }
  };

  module.exports.updateBookingStatus = async (req, res, next) =>{
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