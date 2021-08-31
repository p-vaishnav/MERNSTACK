require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cokkieParser = require('cookie-parser');
const cors = require('cors');

//My routes
const authRoutes = require('./routes/auth.js');
const userRoutes = require("./routes/user.js");
const categoryRoutes = require("./routes/category.js");
const productRoutes = require("./routes/product.js");
const orderRoutes = require("./routes/order.js");
const app = express();


const port = process.env.PORT || 8080;

//using middleware
//if bodyParser is commented then req ke object me body attach nahi hoti hai
app.use(bodyParser.json());//TODO: what it does
app.use(cokkieParser());//TODO: what it does
app.use(cors());//TODO: what it does


//router
app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',orderRoutes);

//connecting to mogodb
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true
}).then(()=>{
    console.log("-----DB CONNECTED-------");
}).catch((err)=>{
    console.log("error occured : " + err);
})


app.listen(port,() =>{
    console.log(`Listening at port : ${port}`);
})