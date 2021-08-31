const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

//routes
const userRoute = require("./routes/user");

//middleware
app.use(bodyParser());

//use-api
app.use("/api", userRoute);

//connecting db
mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch((err)=>{
    console.log("Error occures while connecting to db");
});

app.listen(9000, () => {
  console.log("Listening at port 9000");
});
