const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 9090;
const url = "mongodb://localhost:27017/data_base";

mongoose.connect(url,{useNewUrlparser:true});
app.use(express.json())
const con = mongoose.connection;

con.on('open',()=>{
    console.log("DataBase connected.......");
})
const userRouter = require('./routes/user')
app.use('/user',userRouter)
app.listen(9090,()=>{
    console.log(`server started at ${PORT}` );
})