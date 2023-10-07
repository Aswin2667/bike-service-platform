import React from 'react'
import { removeFromCart } from '../../slices/CartSlice'
import { useDispatch } from 'react-redux'

const CartProductcard = (props) => {
const dispatch = useDispatch();
const handleremove = ()=>{
  dispatch(removeFromCart(props._id))
}
  return (
    <div className="p-5 mt-5 bg-white flex  w-max items-center justify-center rounded-xl">
      <div className="row">
        <div className="col-md-3">
          <div className="flex flex-col gap-44 items-center justify-center">
            <div className="w-44 h-24">
              <img
                src={`data:image/jpeg;base64,${props.serviceimage}`}
                alt="Product"
                className="rounded-xl w-full"
              />
            </div>
            <div className="felx items-center justify-center">
              <div className="p-4 items-center justify-center flex w-full ">
                <span className="px-4 py-2 border-2 border-gray-700 bg-gray-900 text-white rounded-full shadow-lg">
                  {props.name}
                </span>
              </div>
              <div className="border-b-4 mb-3">
                <h3> Time To Complete {props.timeToComplete}mins</h3>
              </div>
              <div className="card-footer">
                <div className="flex justify-center">
                  <span className="price">₹ {props.price}</span>
                </div>
              </div>
              <div className="flex justify-end items-center">
                <button onClick={handleremove}
                className="rounded-full h-10 w-full bg-red-600 hover:cursor-pointer hover:bg-red-900 duration-300"
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
  )
}

export default CartProductcard