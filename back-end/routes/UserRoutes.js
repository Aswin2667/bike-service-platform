const express = require('express');
const router = express.Router();
const { register ,login, verifytoken,getUser} = require('../controllers/UserController');
router.post('/login',login)
router.post('/register', register);
router.get("/auth",verifytoken,getUser);
module.exports = router 