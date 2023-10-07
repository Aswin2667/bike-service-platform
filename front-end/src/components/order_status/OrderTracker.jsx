import React from "react";
import "./orderstatus.css";
const OrderTracker = () => {
  return (
    <>
        <div class="col-12 col-md-10 flex  bg-purple-900 opacity-80 rounded-2xl   hh-grayBox  pb20">
          <div class="flex justify-content-between w-full">
            <div class="order-tracking completed">
              <span class="is-complete "></span>
              <p>
                Booked<br></br>
              </p>
            </div>
            <div class="order-tracking  completed">
              <span class="is-complete"></span>
              <p>
                Pending<br></br>
              </p>
            </div>
            <div class="order-tracking ">
              <span class="is-complete"></span>
              <p>
                Ready For Delivery<br></br>
              </p>
            </div>
            <div class="order-tracking ">
              <span class="is-complete"></span>
              <p>
                Completed<br></br>
              </p>
            </div>
          </div>
        </div>
    </>
  );
};

export default OrderTracker;
