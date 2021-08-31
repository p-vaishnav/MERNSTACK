const express = require("express");
const app = express();
const port = 9000;

const isLoggedIn = (req,res,next)=>{
    console.log("User logged in");
    next();
}

const isAdmin = (req,res,next)=> {
    console.log("Admin logged in");
    next();
}

const sendAdminDashboard = (req,res) => {
    return res.send("In admin dashboard");
}

app.get("/admin",isLoggedIn,isAdmin,sendAdminDashboard);

app.listen(port,()=>{
    console.log(`App running at : ${port}`)
})
