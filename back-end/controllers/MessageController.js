const Message = require("../models/MessageModel");
module.exports.createMessage = async (req, res) => {
    try {
      const { sender, receiver, text } = req.body;
  
      if (!sender || !receiver || !text) {
        return res.status(400).json({ error: 'All fields are required.' });
      }
  
      const message = await Message.create({
        sender,
        receiver,
        text,
        timestamp: Date.now(), // Set the timestamp to the current date and time
      });
  
      return res.status(201).json(message);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  };



  module.exports.getMessages = async (req, res) => {
    try {
      const { sender, receiver } = req.query;
  
      if (!sender || !receiver) {
        return res.status(400).json({ error: 'Sender and receiver are required parameters.' });
      }
  
      const messages = await Message.find({
        $or: [
          { sender, receiver },
          { sender: receiver, receiver: sender },
        ],
      });
  
      return res.status(200).json(messages);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  };
  
  module.exports.getAllMessages = async (req,res)=>{
    try{
        const messages = await Message.find();
        res.json(messages);
    }catch(err){
        console.log(err)
    }
  }