import React, { useEffect, useState } from "react";
import Navbar from "../../layout/navbar/Navbar";
import ProductCard from "../../components/servicecard/ProductCard";
import BikeService from "../../services/BikeService/BikeService";
const Services = () => {
  const [services,setServices] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await BikeService.getAllService();
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData(); 
  }, []);
  console.log(services)
  return (
    <div className="flex gap-40 h-screen w-screen">
      <Navbar />
      <div className="flex gap-40 w-full flex-wrap overflow-auto p-5 items-center">
      {  
      services &&
        services.map((service,key)=>{
          return <ProductCard key={key} price = {service.price} name={service.name} timeToComplete={service.timeToComplete} serviceimage={service.serviceimage} _id={service._id} />
        })
      }
      {!services && 
         <img className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 " src="src/assets/videos/loader.gif" alt="" />
      }
      </div>
    </div>
  );
};

export default Services;
