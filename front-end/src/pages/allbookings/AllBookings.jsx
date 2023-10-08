import React, { useState, useEffect } from "react";
import Navbar from "../../layout/navbar/Navbar";
import CustomDropdown from "../../components/dropdown/CustomDropdown";
import BookingService from "../../services/bookingservice/BookingService";

const AllBookings = () => {
  const [data, setData] = useState(undefined);
  useEffect(() => {
    BookingService.getAllBookings()
      .then((data) => {
        setData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching booking data:", error);
      });
  }, []);
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState("pending");
  const [searchText, setSearchText] = useState("");
  const handleCheckboxChange = (event, bookingId) => {
    if (event.target.checked) {
      setSelectedBookings([...selectedBookings, bookingId]);
    } else {
      setSelectedBookings(selectedBookings.filter((id) => id !== bookingId));
    }
  };

  const handleDropdownAction = () => {
    // Remove selected bookings from the data array
    const updatedData = data.filter(
      (booking) => !selectedBookings.includes(booking._id)
    );

    setData(updatedData);
    // Clear the selected bookings
    setSelectedBookings([]);
  };

  // Function to open the edit popup and set the editingBookingId and updatedStatus
  const handleEditBooking = (bookingId, currentStatus) => {
    setEditingBookingId(bookingId);
    setUpdatedStatus(currentStatus);
    setIsPopupOpen(true);
  };
  const updateBooking = (id) => {
    BookingService.updateBookingStatus(id, updatedStatus)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  const handleUpdateStatus = () => {
    const updatedData = data.map((booking) => {
      if (booking._id === editingBookingId) {
        updateBooking(booking._id);
        return { ...booking, status: updatedStatus };
      }
      return booking;
    });
    setData(updatedData);
    setEditingBookingId(null);
    setIsPopupOpen(false);
  };
  //   const [selectAll, setSelectAll] = useState(false); // Track if top checkbox is checked

  // ... other state variables ...

  // Function to handle top checkbox change
  const handleSelectAllChange = (event) => {
    setSelectAll(event.target.checked);

    // If checked, select all bookings; otherwise, clear selected bookings
    if (event.target.checked) {
      setSelectedBookings(data.map((booking) => booking._id));
    } else {
      setSelectedBookings([]);
    }
  };
  const filterDataByName = (searchText) => {
    if (!searchText) {
      // If the search text is empty, show all data
      return data;
    }

    // Convert the search text to lowercase for a case-insensitive search
    const lowercaseSearchText = searchText.toLowerCase();

    // Filter the data array to include only users whose names contain the search text
    const filteredData = data.filter((booking) =>
      booking.customer.username.toLowerCase().includes(lowercaseSearchText)
    );

    return filteredData;
  };

  return (
    <div className="flex w-screen">
      {
        <>
          <Navbar />
          <div className="h-screen overflow-y-auto w-full p-5 ">
          {data && (
            <div className="w-full m-0 overflow-x-auto shadow-md sm:rounded-lg">
              <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900">
                <div>
                  <button
                    id="dropdownActionButton"
                    onClick={handleDropdownAction}
                    className="inline-flex items-center text-red-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                  >
                    <span className="sr-only">Delete button</span>
                    Delete
                    <svg
                      className="w-2.5 h-2.5 ml-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="table-search"
                    className="block p-2 pl-10 text-sm text-gray-900 focus:outline-none border border-purple-900 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 "
                    placeholder="Search for users by name"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>
              </div>
              {/* Table */}
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded">
                {/* Table Headers */}
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4"></th>
                    <th scope="col" className="px-6 py-3">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Services
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {filterDataByName(searchText).map((booking) => (
                    <tr
                      key={booking._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-purple-900 border hover:border-purple-800"
                    >
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input
                            id={`checkbox-table-search-${booking._id}`}
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            onChange={(e) =>
                              handleCheckboxChange(e, booking._id)
                            }
                          />
                          <label
                            htmlFor={`checkbox-table-search-${booking._id}`}
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>
                      <td className="flex gap-2 items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        <img
                          className="h-14"
                          src={`data:image/svg+xml;base64,${booking.customer.avatarimage}`}
                          alt="Profile"
                        />
                        <div>
                          <div className=" text-2xl font-semibold">
                            {booking.customer.username}
                          </div>
                          <div className="font-normal text-gray-500">
                            {booking.customer.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {booking.service.map((service) => (
                          <div key={service._id}>{service.name}</div>
                        ))}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(booking.date).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className={`flex items-center ${
                            booking.status === "pending"
                              ? "text-red-500"
                              : booking.status === "ready for delivery"
                              ? "text-yellow-500"
                              : "text-green-500"
                          }`}
                        >
                          <div
                            className={`h-2.5 w-2.5 rounded-full ${
                              booking.status === "pending"
                                ? "bg-red-500"
                                : booking.status === "ready for delivery"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            } mr-2`}
                          ></div>
                          <h3 className="uppercase"> {booking.status}</h3>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() =>
                            handleEditBooking(booking._id, booking.status)
                          }
                        >
                          Edit booking
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {!data && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <img src="src/assets/videos/loader.gif" alt="" />
            </div>
          )}

          {isPopupOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-5 w-96 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold mb-3">
                    Update Booking Status
                  </h2>
                  <h2 className="text-lg font-semibold mb-3 hover:cursor-pointer" onClick={()=>{setIsPopupOpen(false)}}>X</h2>
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Status:
                  </label>
                  <CustomDropdown
                    options={[
                      { value: "pending", label: "Pending" },
                      {
                        value: "ready for delivery",
                        label: "Ready for Delivery",
                      },
                      { value: "completed", label: "Completed" },
                    ]}
                    value={updatedStatus}
                    onChange={(selectedOption) =>
                      setUpdatedStatus(selectedOption.value)
                    }
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    onClick={handleUpdateStatus}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          )}
          </div>
        </>
      }
      
    </div>
  );
};

export default AllBookings;
