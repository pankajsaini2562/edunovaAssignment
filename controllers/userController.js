import { User } from "../models/userModel.js";

//Get list of all user
export const getAllUser =async (req,res)=>{
try{
  const users =await User.find({})
  res.status(201).json({success:true ,users})
}
catch(error){
  res.status(501).json({msg:error.message})
}
}


//create a new user
export const addNewUser =async (req,res)=>{
  const {name,email,phone} =  req.body
  try{
    const users =new User({name,email,phone})
    const savedUsers =await users.save()
    res.status(201).json({success:true ,savedUsers})
  }
  catch(error){
    res.status(501).json({msg:error.message})
  }
  }
