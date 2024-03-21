const express = require("express");
const {connectDb} = require("./connection");

const {logReqRes} = require("./middleware");

const userRouter = require("./routes/user")

const app = express();
const PORT = 8000;

//Connections
connectDb("mongodb://127.0.0.1:27017/learningNodeJs").then(()=>{
    console.log("MongoDb Connected....");
}).catch((err)=>{
    console.log("error",err);
})

//Middlewares - Plugin
app.use(express.urlencoded({extended:false}));
app.use(logReqRes("Project-02/log.txt"))

//Routes
app.use('/api/users',userRouter);

app.listen(PORT,()=>{
    console.log(`Server Started at ${PORT}....`)
})


