const http = require("http");
const express = require("express");

const app = express();

app.get("/",(req,res)=>{
    return res.send("Hello from home page");
})

app.get("/about",(req,res)=>{
    return res.send("Hello from about page" + " Hii " + req.query.name );
})

app.listen(8000 , ()=>{
    console.log("Server started at 8000....");
});

// const server = http.createServer(app);

// server.listen(8000,()=>{
//     console.log("Server started at 8000....");
// })