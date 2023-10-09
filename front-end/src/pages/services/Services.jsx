import React, { useEffect, useState } from "react";
import Navbar from "../../layout/navbar/Navbar";
import ProductCard from "../../components/servicecard/ProductCard";
import BikeService from "../../services/BikeService/BikeService";

const Services = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await BikeService.getAllService();
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // Set loading state to false regardless of success or failure
      }
    };
    fetchData(); 
  }, []);
  const handleServiceDeleted = (deletedServiceId) => {
    // Filter out the deleted service from the services list
    setServices((prevServices) =>
      prevServices.filter((service) => service._id !== deletedServiceId)
    );
  };

  return (
    <div className="flex gap-40 h-screen w-screen">
      <Navbar />
      <div className="flex gap-40 w-full flex-wrap overflow-auto p-5 items-center">
        {services.length === 0&& !isLoading && (
          <div>
            <h1 className="text-2xl text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              No Service Found restart the backend to add default Services
            </h1>
          </div>
        )}

        {isLoading ? (
          <img
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
            src="src/assets/videos/loader.gif"
            alt=""
          />
        ) : (
          services.map((service, key) => (
            <ProductCard
              key={key}
              price={service.price}
              name={service.name}
              timeToComplete={service.timeToComplete}
              serviceimage={service.serviceimage}
              _id={service._id}
             onDelete = {()=>handleServiceDeleted(service._id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Services;
