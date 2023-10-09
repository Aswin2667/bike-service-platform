import React, { useState, useEffect } from "react";
import Navbar from "../../layout/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import BookingService from "../../services/bookingservice/BookingService";
import OrderTracker from "../../components/order_status/OrderTracker";

const MyBookings = () => {
  const user = useSelector((state) => state.user.user);
  const [bookings, setbookings] = useState([]); // State to store booking data
  const dispatch = useDispatch();

  const fetchBookings = () => {
    BookingService.getBookingByUserId(user._id)
      .then((data) => {
       if(data.data.status){
          setbookings(data.data.bookings);
        }
      })
      .catch((error) => {
        console.error("Error fetching booking data:", error);
      });
  };

  useEffect(() => {
    fetchBookings();
  }, [bookings]);

  return (
    <div className="flex w-screen h-screen">
      <Navbar />
      <div className="overflow-auto w-full">
        { (
          <div className=" m-5 overflow-y-auto shadow-md sm:rounded-lg">
            <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs w-fit text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 text-2xl py-3">
                    Booking_Id
                  </th>
                  <th scope="col" className="px-6 text-2xl  py-3">
                    Services
                  </th>
                  <th scope="col" className="px-6 text-2xl  py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 text-2xl text-center  py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((item) => (
                  <tr
                    key={item._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item._id}
                    </td>
                    <td className="px-6 py-4">
                      {item.service.map((service) => (
                        <div key={service._id}>{service.name}</div>
                      ))}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(item.date).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 ">
                      {/* <div
                        className={`flex items-center ${
                          item.status === "pending"
                            ? "text-red-500"
                            : item.status === "ready for delivery"
                            ? "text-yellow-500"
                            : "text-green-500"
                        }`}
                      >
                        <div
                          className={`h-2.5 w-2.5 rounded-full  ${
                            item.status === "pending"
                              ? "bg-red-500"
                              : item.status === "ready for delivery"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          } mr-2`}
                        ></div>
                        <h3 className="uppercase"> {item.status}</h3>
                      </div> */}
                      <OrderTracker status={item.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/*  */}
      </div>
    </div>
  );
};
export default MyBookings;
