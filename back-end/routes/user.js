const express = require('express');
const router = express.Router();
const User = require('../models/User')
router.get('/login', async(req,res)=>{
    try {
        const user =  User.find();
        res.json(user)
    } catch (error) {
        res.send(error)
    }
})
router.post('/register', async (req,res)=>{
    const newuser = new User(
        {
            email:req.body.email,
            password:req.body.password,
            role:req.body.role
        }
    );
    console.log(newuser);
    try {
        const user = await newuser.save();
        res.json(user); 
    } catch (error) {
        res.send(error);
    }
})
module.exports = router