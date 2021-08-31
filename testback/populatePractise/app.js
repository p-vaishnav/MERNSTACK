require('dotenv').config;
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cokkieParser = require('cookie-parser');
const cors = require('cors');
const userRoute = require("./routes/User");
//initializing app
const app = express();
const port = process.env.PORT || 8000;

//middleware
app.use(bodyParser());
app.use(cokkieParser());
app.use(cors());

app.use("/api",userRoute)

//connecting to mogodb
mongoose.connect("mongodb://localhost:27017/populate",{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true
}).then(()=>{
    console.log("-----DB CONNECTED-------");
}).catch((err)=>{
    console.log("error occured : " + err);
});


app.listen(port,()=>{
    console.log(`Listening at , ${port}`);
})




