const User = require('../models/user');

async function handelGetAllUsers (req,res){
    const allDbUSer = await User.find({});
    return res.json(allDbUSer);
}

async function handelGetUserById (req,res){
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({error:"User Not Found"})
    return res.json(user);
}

async function handelUpdateUserById (req,res){
    await User.findByIdAndUpdate(req.params.id,{lastname:"Changed"});
    return res.json({status : "Succes"})
}

async function handleDeleteUserById (req,res){
    await User.findByIdAndDelete(req.params.id);
    return res.json({status : "Succes"})
}

async function handelCreateNewUser(req,res){
    const body = req.body;
    if(
        !body ||
        !body.first_name ||
        !body.last_name || 
        !body.email ||
        !body.gender ||
        !body.job_title
    ){
        return res.status(400).json({msg:"All Fields Req"})
    }

    const result = await User.create({
        firstName : body.first_name,
        lastName : body.last_name,
        email : body.email,
        gender : body.gender,
        jobTitle : body.job_title
    })

    return res.status(201).json({msg:"Succes" , id:result._id});

}

module.exports = {
    handelGetAllUsers,
    handelGetUserById,
    handelUpdateUserById,
    handleDeleteUserById,
    handelCreateNewUser
};


