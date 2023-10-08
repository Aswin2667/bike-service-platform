import React, { useState, useEffect } from "react";
import Navbar from "../../layout/navbar/Navbar";
import { DatePicker, message } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import CartProductcard from "../../components/cartproductcard/CartProductcard";
import BookingService from "../../services/bookingservice/BookingService";
const Bookings = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [totalprice, setTotalprice] = useState(0);
  const user = useSelector((state) => state.user.user);
  const [selectedDate, setSelectedDate] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.price;
    });
    setTotalprice(totalPrice);
  }, [cartItems]);

  const handleBooking = () => {
    if (!selectedDate || cartItems.length === 0) {
      message.error("Please choose a date and add services to the cart");
      return;
    }

    const bookingData = {
      customerId: user._id,
      serviceIds: cartItems.map((service) => service._id),
      date: selectedDate.toDate(),
    };
    try {
      BookingService.addBooking(bookingData).then((res) => {
        if (!res.data.status) {
          message.error(res.data.message);
          return;
        }
        message.success("Booking Confirmed");
      });
    } catch (err) {
      message.error("Error while Confirm Booking");
      console.log(err);
    }
  };

  return (
    <div className="flex gap-10 h-screen w-screen">
      <Navbar />
      <div className=" flex flex-col gap-4 mt-14 mx-auto">
        {cartItems.length === 0 ? (
          <>
          <p className="text-lg absolute top-1/2 lef-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold text-red-500">
            Cart is empty. Add services to the cart.
          </p>
       </>
        ) : (
          <>
            <div className=" min-w-1/2 flex gap-24 h-min overflow-auto flex-wrap justify-center">
              {cartItems.map((product, index) => (
                <CartProductcard
                  key={index}
                  _id={product._id}
                  name={product.name}
                  serviceimage={product.serviceimage}
                  timeToComplete={product.timeToComplete}
                  price={product.price}
                />
              ))}
            </div>
            <div className="text-center ">
              <p className="text-lg font-semibold text-white">
                Total Price: ₹ {totalprice}
              </p>
              <div className="flex justify-center items-center gap-5">
                <DatePicker
                  disabledDate={(current) => current.isBefore(moment())}
                  onChange={(date) => setSelectedDate(date)}
                />
                <button
                  onClick={handleBooking}
                  className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Bookings;
