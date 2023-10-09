import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../slices/CartSlice";
import axios from "axios"; // Import Axios
import BikeService from "../../services/BikeService/BikeService";
import { message } from "antd"; // Import Ant Design message component

const ProductCard = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    price: props.price,
    name: props.name,
    timeToComplete: props.timeToComplete,
    serviceimage: props.serviceimage,
    _id: props._id,
  });

  const handleAddToCart = () => {
    const service = {
      price: editedProduct.price,
      name: editedProduct.name,
      timeToComplete: editedProduct.timeToComplete,
      serviceimage: editedProduct.serviceimage,
      _id: editedProduct._id,
    };
    dispatch(addToCart(service));
  };

  const cartItems = useSelector((state) => state.cart.cartItems);
  const isItemInCart = cartItems.some((item) => item.name === props.name);

  const handleUpdate = () => {
    // Check if any required field is empty
 
    if (!editedProduct.name || !editedProduct.price || !editedProduct.timeToComplete) {
      message.error("Please fill in all required fields.");
      return;
    }
    if(editedProduct.price<=0){
      message.error("Please Enter valid price")
      return;
    }

    BikeService.updateService(props._id, editedProduct)
      .then((response) => {
        setIsEditing(false);
        message.success("Service updated Successfully")
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const handleDelete = () => {
    BikeService.deleteServiceById(props._id)
      .then((response) => {
        props.onDelete(props._id); // Trigger onDelete callback with the deleted service ID
        message.success("Service Deleted successfully ");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="p-5 mt-5 bg-gray-800 bg-opacity-70 rounded-lg flex border border-purple-900 w-max items-center justify-center rounded-xl">
      <div className="row">
        <div className="col-md-3">
          <div className="flex flex-col gap-5 items-center justify-center">
            <div className="w-44 h-full border rounded-lg border-purple-900">
              <img
                src={`data:image/jpeg;base64,${editedProduct.serviceimage}`}
                alt="Product"
                className="rounded-xl"
              />
            </div>
            <div className="felx items-center justify-center">
              {isEditing ? (
                <div className="text-center flex flex-col">
                  {/* Input fields for editing */}
                  <div className="mb-4 flex items-center justify-between gap-5">
                    <label className="text-white text-lg text-center w-full">Name:</label>
                    <input
                      type="text"
                      value={editedProduct.name}
                      className="w-max px-4 py-2 bg-transparent border-4 border-purple-600 rounded-md text-white text-lg focus:outline-none focus:border-purple-400 focus:border-3"
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-4 flex items-center justify-between gap-5">
                    <label className="text-white text-lg text-center w-full">Price:</label>
                    <input
                      type="number"
                      value={editedProduct.price}
                      className="w-max px-4 py-2 bg-transparent border-4 border-purple-600 rounded-md text-white text-lg focus:outline-none focus:border-purple-400 focus:border-3"
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          price: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-4 flex items-center justify-between gap-5">
                    <label className="text-white text-center w-full text-lg">Time to Complete:</label>
                    <input
                      type="text"
                      className="w-max px-4 py-2 bg-transparent border-4 border-purple-600 rounded-md text-white text-lg focus:outline-none focus:border-purple-400 focus:border-3"
                      value={editedProduct.timeToComplete}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          timeToComplete: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center p-4">
                  <span className="w-full bg-purple-600 text-white p-3 rounded-md text-lg font-bold uppercase duration-500 hover:bg-purple-700 focus:outline-none ">
                    {editedProduct.name}
                  </span>
                  <p className="text-white text-2xl mt-2">
                    ₹ {editedProduct.price}
                  </p>
                  <p className="text-white text-xl ">
                    Time to Complete: {editedProduct.timeToComplete} mins
                  </p>
                </div>
              )}
              {/* ... Rest of the code */}
              <div className="flex justify-center w-full  items-center">
                {user.username === "root" ? (
                  isEditing ? (
                    <div className="flex gap-5 w-full">
                      <button
                        className="w-full bg-green-700 text-white p-2 rounded-md text-lg font-bold uppercase duration-500 hover:bg-green-500 focus:outline-none "
                        onClick={handleUpdate}
                      >
                        Update
                      </button>
                      <button
                        className="w-full bg-orange-700 text-white p-2 rounded-md text-lg font-bold uppercase duration-500 hover:bg-orange-500 focus:outline-none "
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-5">
                      <button
                        className="w-full bg-blue-600 text-white pl-5 pr-5 pt-2 rounded-md text-lg font-bold uppercase duration-500 hover:bg-blue-500 focus:outline-none "
                        onClick={() => setIsEditing(true)}
                      >
                        Edit
                      </button>
                      <button
                        className="w-full bg-red-700 text-white pl-5 pr-5 pt-2 rounded-md text-lg font-bold uppercase duration-500 hover:bg-red-500 focus:outline-none "
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                    </div>
                  )
                ) : isItemInCart ? (
                  <button className="w-full bg-green-600 text-white p-2 rounded-md text-lg font-bold uppercase duration-500 border border-green-600 hover:cursor-default  focus:outline-none ">
                    Added to the cart
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-purple-600 border-purple-900 border hover:border-green-600 text-white p-2 rounded-md text-lg font-bold uppercase duration-500 hover:bg-purple-700 focus:outline-none "
                  >
                    <i className="flex justify-center gap-5 hover:text-white duration-500 items-center pt-2 h-full w-full">
                      Add to cart<ion-icon name="cart-outline"></ion-icon>
                    </i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
