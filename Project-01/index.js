const express = require("express");
const fs = require('fs');
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({extended:false}));

app.use((req,res,next)=>{
    fs.appendFile(
        "Project-01/log.txt",
        `${Date.now()} : ${req.method} : ${req.path}\n`,
        (err,data)=>{
            next();
        }
        )
})

app.get('/users',(req,res)=>{
    const html = `
    <ul>
        ${users.map((user)=> `<li> ${user.first_name} </li>`).join("")}
    </ul>
    `;
    res.send(html);
})

app.get("/api/users",(req,res)=>{
    return res.json(users);
})

app.route("/api/users/:id").get((req,res)=>{
    const id = Number(req.params.id);
    const user = users.find( (user) => user.id === id );
    if(!user){
        return res.status(404).json({error : "User Not Found"});
    }
    return res.json(user);
}).patch((req,res)=>{
    const id = Number(req.params.id);
    const body = req.body;
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
        users[index] = {...body , id:id};
    }
    fs.writeFile('Project-01/MOCK_DATA.json',JSON.stringify(users) ,(err,data)=>{
        return res.json({status:"Success" , _id:id});
    });
}).delete((req,res)=>{
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
        users.splice(index, 1);
    }
    fs.writeFile('Project-01/MOCK_DATA.json',JSON.stringify(users) ,(err,data)=>{
        return res.json({status:"Success" , _id:id});
    });
});

app.post("/api/users",(req,res)=>{
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({status : "All Field are required"});
    }
    users.push({...body , id:users.length+1});
    fs.writeFile('Project-01/MOCK_DATA.json',JSON.stringify(users) ,(err,data)=>{
        return res.status(201).json({status:"Success" , id:users.length});
    });
})

app.listen(PORT , ()=>{
    console.log(`Server Started at ${PORT}.....`)
})