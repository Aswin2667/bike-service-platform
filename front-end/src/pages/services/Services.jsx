import React from "react";
import Navbar from "../../layout/navbar/Navbar";
import ProductCard from "../../components/servicecard/ProductCard";
const Services = () => {
  return (
    <div className="flex gap-40 w-screen  justify">
      <Navbar />
      <div className=" flex gap-40 h-screen w-screen flex-wrap overflow-hidden items-center">
        <div>
        <ProductCard price="₹ 2000" />
        </div>
        <div>
        <ProductCard price="₹ 2000" />
        </div><div>
        <ProductCard price="₹ 2000" />
        </div>
      </div>
    </div>
  );
};        


export default Services;
