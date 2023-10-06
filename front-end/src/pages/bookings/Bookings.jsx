import React, { useState } from "react";
import Navbar from "../../layout/navbar/Navbar";
import { DatePicker } from "antd";
import moment from "moment";
const Bookings = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Medium Stuff Satchel",
      color: "Blue",
      price: "$32.00",
      quantity: 1,
      imageSrc:
      "https://images.unsplash.com/photo-1534637950656-9e6753b6da6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80",
      imageAlt:
        "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
    },
    {
      id: 2,
      name: "Medium Stuff Satchel",
      color: "Blue",
      price: "$32.00",
      quantity: 1,
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
      imageAlt:
        "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
    },{
      id: 3,
      name: "Medium Stuff Satchel",
      color: "Blue",
      price: "$32.00",
      quantity: 1,
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
      imageAlt:
        "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
    },{
      id: 4,
      name: "Medium Stuff Satchel",
      color: "Blue",
      price: "$32.00",
      quantity: 1,
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
      imageAlt:
        "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
    },

  ]);
  const getTotalPrice = () => {
    return cart.reduce(
      (total, product) =>
        total + parseFloat(product.price.replace("$", "")) * product.quantity,
      0
    );
  };
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
  };
  return (
    <div className="flex gap-10 h-screen w-screen">
      <Navbar />
        <div className=" flex flex-col gap-4 mt-14 mx-auto">
          <div className=" min-w-1/2 flex gap-24 h-min overflow-auto flex-wrap justify-center">
            {cart.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-lg shadow-lg flex flex-col hover:shadow-xl transition duration-300"
              >
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="w-32 h-32 object-cover mx-auto mb-4 rounded-lg"
                />
                <div className="text-center">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h2>
                  <p className="text-gray-500">{product.color}</p>
                  <p className="text-gray-700 mt-2">{product.price}</p>
                </div>
                <div className="mt-4 flex items-center justify-center">
                  <button
                    className="text-red-500 text-xl h-full w-full rounded-full duration-500 p-2  hover:text-white hover:bg-red-700"
                    onClick={() => removeFromCart(product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center ">
            <p className="text-lg font-semibold text-white">
              Total Price: ${getTotalPrice().toFixed(2)}
            </p>
            <div className="flex justify-center items-center gap-5">
            {/* <input type="date" /> */}
            <DatePicker disabledDate={(current) => current.isBefore(moment())}/>
            <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600">
              Complete Booking
            </button>
            </div>
          </div>
        </div>
      </div>
  );
};
export default Bookings;
