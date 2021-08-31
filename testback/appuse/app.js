const express = require('express');
const app = express();

let glob = 0;
const customMiddleWare = (req,res,next) => {
    console.log(`In custom Middle ware ${glob++}`);
    next();
}

app.use(customMiddleWare);

app.get('/',(req,res)=>{
    return res.send(`Value of glob : ${glob}`)
});

app.get('/login',(req,res)=>{
    return res.send(`Value of glob : ${glob}`)
});

app.get('/logout',(req,res)=>{
    return res.send(`Value of glob : ${glob}`)
});

app.listen(9000,()=>{
    console.log(`Listening to port ${9000}`);
})