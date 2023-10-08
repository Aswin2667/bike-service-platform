const express = require('express');
const router = express.Router();
const {createMessage,getMessages,getAllMessages} = require("../controllers/MessageController");



router.post("/add",createMessage);

router.get("/",getMessages);

router.get("/all",getAllMessages);
module.exports = router