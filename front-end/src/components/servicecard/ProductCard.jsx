import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {addToCart} from "../../slices/CartSlice"
const ProductCard = (props) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const service = { price: props.price, name: props.name, timeToComplete: props.timeToComplete, serviceimage:props.serviceimage, _id:props._id };
    dispatch(addToCart(service));
  };
  const cartItems = useSelector((state) => state.cart.cartItems); 
  const isItemInCart = cartItems.some(
    (item) => item.name === props.name 
  );
  return (
    <div className="p-5 mt-5 bg-white flex  w-max items-center justify-center rounded-xl">
      <div className="row">
        <div className="col-md-3">
          <div className="flex flex-col gap-44 items-center justify-center">
            <div className="w-44 h-24">
              <img
                src={`data:image/jpeg;base64,${props.serviceimage}`}
                alt="Product"
                className="rounded-xl"
              />
            </div>
            <div className="felx items-center justify-center">
              <div className="p-4 items-center justify-center flex w-full ">
                <span className="px-4 py-2 border-2 border-gray-700 bg-gray-900 text-white rounded-full shadow-lg">
                  {props.name}
                </span>
              </div>
              <div className="border-b-4 mb-3">
                <h3>Time To Complete {props.timeToComplete} mins</h3>
              </div>
              <div className="card-footer">
                <div className="flex justify-center">
                  <span className="price">₹ {props.price}</span>
                </div>
              </div>
              <div className="flex justify-end items-center">
              {isItemInCart ? (
                <button
                className="rounded-full h-10 w-full bg-green-600 hover:cursor-text duration-300"
              >
                <i className="flex justify-center gap-5 text-white duration-500 items-center pt-2 h-full w-full">
                  Added to the cart
                </i>
              </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className="rounded-full  h-10 w-full hover:bg-yellow-600 duration-300"
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
