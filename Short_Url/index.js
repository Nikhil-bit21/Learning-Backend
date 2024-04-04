const express = require('express');
const path = require('path');
const {connectToDb} = require('./connection');
const {URL} = require('./Models/url')

const urlRoute = require('./Routes/url') 
const staticRouter = require('./Routes/static');
const userRouter = require('./Routes/user');

const app = express();
const PORT = 3000;

app.set("view engine","ejs");
app.set("views",path.resolve("./Short_Url/Views"));

app.use(express.urlencoded({extended:false}));
app.use(express.json());

connectToDb('mongodb://127.0.0.1:27017/Url-Shortner').then(()=>{
    console.log("Mongo Db Conneted....");
}).catch((err)=>{
    console.log("error",err);
});

app.use('/url',urlRoute);
app.use('/',staticRouter)
app.use('/user',userRouter)

app.get('/url/:shortId',async(req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId,
    },
    {
        $push : {
            visitedHistory:{
                timestamp : Date.now(),
            },
        },
    },);
    res.redirect(entry.redirectUrl);
})

app.listen(PORT,()=>{
    console.log(`Server Started at Port: ${PORT}....`);
})