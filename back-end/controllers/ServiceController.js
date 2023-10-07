const ServiceModel = require("../models/ServiceModel.js")
module.exports.addService = async (req, res) => {
  try {
    const { name, price, timeToComplete,serviceimage  } = req.body;
    const service = await ServiceModel.create({
      name,
      price,
      timeToComplete,
      serviceimage

    });
    res.json({ msg: "Service added", service });
  } catch (error) {
    console.error("Error adding service:", error);
    res.status(500).json({ msg: "Error adding service", error: error.message });
  }
};
module.exports.updateService = async (req, res) => {
    try {
      const { name } = req.params;
      const { price, timeToComplete } = req.body;
      const updatedService = await ServiceModel.findOneAndUpdate(
         name ,
        { price, timeToComplete },
        { new: true }
      );
      if (!updatedService) {
        return res.status(404).json({ msg: "Service not found" });
      }
      res.json({ msg: "Service updated", updatedService });
    } catch (error) {
      console.error("Error updating service:", error);
      res.status(500).json({ msg: "Error updating service", error: error.message });
    }
  };


module.exports.deleteServiceByName = async (req, res) => {
    try {
      const { name } = req.params;
      const deletedService = await ServiceModel.findOneAndDelete({ name });
      if (!deletedService) {
        return res.status(404).json({ msg: "Service not found" });
      }
      res.json({ msg: "Service deleted", deletedService });
    } catch (error) {
      console.error("Error deleting service:", error);
      res.status(500).json({ msg: "Error deleting service", error: error.message });
    }
  };
  module.exports.getAllService = async (req,res)=>{
    try {
        const service = await ServiceModel.find();

        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({msg:"Error retreiving Services"});
    }
  }
  