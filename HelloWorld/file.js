const fs = require("fs");
const os = require("os");

// fs.writeFileSync("./test.txt","Hii My Name is Nikhil");

// fs.readFile("./test.txt","utf-8",(err,res)=>{
//     if(err){
//         console.log("error",err);
//     }else{
//         console.log(res);
//     }
// })

console.log(os.cpus().length);

// const res = fs.readFileSync("./test.txt","utf-8");

// console.log(res);

// fs.appendFileSync("./test.txt",new Date().getDate().toLocaleString());

// fs.mkdirSync("docs/faltu/hello");