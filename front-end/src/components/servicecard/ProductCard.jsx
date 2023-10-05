import React from "react";
const ProductCard = (props) => {
  return (
    <div className="p-5 mt-5 bg-white flex  w-min items-center justify-center rounded-xl">
      <div className="row">
        <div className="col-md-3">
          <div className="flex flex-col gap-44 items-center justify-center">
            <div className="w-44 h-24">
              <img
                src="https://images.unsplash.com/photo-1534637950656-9e6753b6da6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80"
                alt="Product"
                className="rounded-xl"
              />
            </div>
            <div className="felx items-center justify-center">
              <div className="p-4 items-center justify-center flex">
                <span className="px-4 py-2 border-2 border-gray-700 bg-gray-900 text-white rounded-full shadow-lg">
                  Ethnic
                </span>
              </div>
              <div className="border-b-4 mb-3">
                <h3>My face not my heart</h3>
              </div>
              <div className="card-footer">
                <div className="flex justify-center">
                  <span className="price">{props.price}</span>
                </div>
              </div>
              <div className="flex justify-end items-center">
                  <button className="rounded-full  h-10 w-full hover:bg-yellow-600 duration-300">
                    <i className="flex justify-center gap-5 hover:text-white duration-500 items-center pt-2 h-full w-full">Add to cart<ion-icon name="cart-outline"></ion-icon></i>
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
