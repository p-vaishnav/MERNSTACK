const express = require('express');
const app = express();

const port = 9000;
app.get("/login",(req,res)=>{
    return res.send("In login route");
});

app.get("/signin",(req,res)=>{
    return res.send("In signin route");
});

app.get("/signout",(req,res)=>{
    return res.send("In signout route");
});


app.listen(port,() =>{
    console.log(`Listening at port ${port}`);
});