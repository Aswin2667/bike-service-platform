import React, { useState, useEffect } from "react";
import "./orderstatus.css";

const OrderTracker = ({ status }) => {
  const [bookedCompleted, setBookedCompleted] = useState(false);
  const [pendingCompleted, setPendingCompleted] = useState(false);
  const [readyfordeliver,setReadyforDeliveryf] = useState(false)
  useEffect(() => {
    // Update the completed states based on the status prop
    if (status === "completed") {
      setBookedCompleted(true); // Mark "Booked" as completed
      setPendingCompleted(true); // Mark "Pending" as completed
      setReadyforDeliveryf(true);
    } else if (status === "ready for delivery") {
      setPendingCompleted(true); // Mark "Pending" as completed
    }
  }, [status]);

  return (
    <>
      <div className="bg-purple opacity-80 w-max rounded-2xl">
        <div className="flex items-center w-full">
          <div className={`order-tracking completed`}>
            <span className="is-complete"></span>
            <p className="p-0">Booked</p>
          </div>
          <div className={`order-tracking ${pendingCompleted ? "completed" : ""}`}>
            <span className="is-complete"></span>
            <p className="p-0">Pending</p>
          </div>
          <div className={`order-tracking ${status==="completed" || status === "ready for delivery" ? "completed" : ""}`}>
            <span className="is-complete"></span>
            <p className="p-0">Ready For Delivery</p>
          </div>
          <div className={`order-tracking ${status === "completed" ? "completed" : ""}`}>
            <span className="is-complete"></span>
            <p className="p-0">Completed</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderTracker;
