import React from "react";
import "./productcard.css"
const ProductCard = () => {
  return (
    <div className="p-5 mt-5 bg-white flex  w-min items-center justify-center rounded-xl">
      <div className="row">
        <div className="col-md-3">
          <div className="wsk-cp-product">
            <div className="w-44 h-44 ">
              <img
                src="https://images.unsplash.com/photo-1534637950656-9e6753b6da6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80"
                alt="Product"
                className="rounded-xl"
              />
            </div>
            <div className="wsk-cp-text">
              <div className="category">
              <span className="px-4 py-2 border-2 border-gray-700 bg-gray-900 text-white rounded-full shadow-lg">
      Ethnic
    </span>
              </div>
              <div className="title-product">
                <h3>My face not my heart</h3>
              </div>
              <div className="description-prod">
                <p>
                  Description Product tell me how to change playlist height size
                  like 600px in html5 player. player good work now check this
                  link
                </p>
              </div>
              <div className="card-footer">
                <div className="wcf-left">
                  <span className="price">Rp500.000</span>
                </div>
                <div className="wcf-right">
                  <a href="#" className="buy-btn">
                    <i className="zmdi zmdi-shopping-basket"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
