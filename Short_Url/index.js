const express = require('express');
const urlRoute = require('./Routes/url')  
const {connectToDb} = require('./connection');
const {URL} = require('./Models/url')

const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended:false}));
app.use(express.json());

connectToDb('mongodb://127.0.0.1:27017/Url-Shortner').then(()=>{
    console.log("Mongo Db Conneted....");
}).catch((err)=>{
    console.log("error",err);
});

app.use('/url',urlRoute);

app.get('/:shortId',async(req,res)=>{
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
    res.redirect(entry.redirectUrl)
})

app.listen(PORT,()=>{
    console.log(`Server Started at Port: ${PORT}....`);
})