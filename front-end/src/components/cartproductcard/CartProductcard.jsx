import React from 'react';
import { removeFromCart } from '../../slices/CartSlice';
import { useDispatch } from 'react-redux';

const CartProductcard = (props) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(props._id));
  };

  return (
    <div className="p-5 mt-5 bg-gray-800 bg-opacity-70 rounded-lg flex border border-purple-900 w-max items-center justify-center rounded-xl">
      <div className="row">
        <div className="col-md-3">
          <div className="flex flex-col gap-5 items-center justify-center">
            <div className="w-44 h-full border rounded-lg border-purple-900">
              <img
                src={`data:image/jpeg;base64,${props.serviceimage}`}
                alt="Product"
                className="rounded-xl"
              />
            </div>
            <div className="felx items-center justify-center">
              <div className="p-4 items-center justify-center flex w-full">
                <span className="w-full bg-purple-600 text-white p-3 rounded-md text-lg font-bold uppercase duration-500 hover:bg-purple-700 focus:outline-none">
                  {props.name}
                </span>
              </div>
              <div className="border-b-4 border-b-purple-400 text-white mb-3">
                <h3>Time To Complete {props.timeToComplete} mins</h3>
              </div>
              <div className="card-footer">
                <div className="flex justify-center">
                  <h3 className="text-2xl text-white">₹ {props.price}</h3>
                </div>
              </div>
              <div className="flex justify-end items-center">
                <button
                  onClick={handleRemove}
                  className="w-full bg-red-600 hover:bg-red-900 text-white p-2 rounded-md text-lg font-bold uppercase duration-500 focus:outline-none"
                >
                  <i className="flex justify-center gap-5 text-white duration-500 items-center pt-2 h-full w-full">
                    Remove From Cart
                  </i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProductcard;
