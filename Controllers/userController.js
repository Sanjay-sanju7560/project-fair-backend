const users = require('../Models/userModel')
const jwt = require('jsonwebtoken')

exports.register = async (req,res)=>{
    const {username,email,password} = req.body
    console.log("Inside register request");
 try{
     // CHECK EMMAIL ALREADY EXISTS
   const existingUser = await users.findOne({email})
   console.log(existingUser);
   if(existingUser){
    res.status(406).json("User Already Exists!! Please Login...")
   } else{
    // add user to db
    const newUser = users({
        username,email,password,profile:"",github:"",linkedin:""
    })
    await newUser.save()
    res.status(200).json(newUser)
}
 }catch(err){
        res.status(401).json(err)
    }
}


exports.login = async (req,res)=>{
    const {username,email,password} = req.body
    console.log("Inside login request");
 try{
     // CHECK EMMAIL PASSWORD ALREADY EXISTS
   const existingUser = await users.findOne({email,password})
   console.log(existingUser);
   if(existingUser){
    //generate token using jwt - 
    const token = jwt.sign({userId:existingUser._id},process.env.jwt_secret)
    res.status(200).json({existingUser,token})
   } else{
    res.status(406).json("Invalid Email / Password")
    }
}
 catch(err){
        res.status(401).json(err)
    }
}

exports.editUser = async (req,res)=>{
    const userId = req.payload
    const {username,password,email,github,linkedIn,profileImage} = req.body
    const profile = req.file?req.file.filename:profileImage
 try{
    const updateUser = await users.findByIdAndUpdate({_id:userId},{
        username,email,password,profile,github,linkedIn
    },{new:true})
    await updateUser.save()
    res.status(200).json(updateUser)
 }
 catch(err){
        res.status(401).json(err)
    }
}