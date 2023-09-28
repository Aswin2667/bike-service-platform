const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 9090;
const userRouter = require('./routes/UserRoutes')
const url = "mongodb://localhost:27017/data_base";
const cors = require('cors')
mongoose.connect(url,{useNewUrlparser:true});
app.use(express.json())
const con = mongoose.connection;
app.use(cors());
con.on('open',()=>{
    console.log("DataBase connected.......");
})
app.use('/user',userRouter)
app.listen(PORT,()=>{
    console.log(`server started at ${PORT}` );
})