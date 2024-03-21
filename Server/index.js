const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req,res)=>{
    if(req.url === '/favicon.ico' || req.url === '/highLightTitle.png'){
        return res.end();
    }
    const log = `On ${Date.now()} : New Request Rec.... at ${req.url}\n`;

    const myurl = url.parse(req.url,true);
    console.log(myurl);

    fs.appendFile("Server/log.txt",log,(err,data)=>{
        switch(myurl.pathname){
            case "/":
                res.end("Home Page")
                break;
            case "/about":
                const username = myurl.query.myname;
                res.end(`Welcome , ${username}`);
                break;
            case "/search":
                const search = myurl.query.search_query;
                res.end(`Here are your result for ${search}`);
                break;
            default:
                res.end("Hello From Server");
        }
    })
})

server.listen(8000,()=>{
    console.log("Server Started....")
})
