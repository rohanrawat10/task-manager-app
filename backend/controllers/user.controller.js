import bcrypt from "bcrypt"
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js"


export const userProfile = async(req,res,next)=>{
    try{
     const userId = req.userId
     if(!userId){
        return next(errorHandler(400,"userId is not found"))
     }
     const user = await User.findById(userId);
     if(!user){
      return next(errorHandler(400,"no user found"))
     }
     return res.status(200).json(user)
    }
    catch(err){
        next(errorHandler(500,err.message))
    }
}

// export const upadtedUserProfile = async(req,res,next)=>{
//     try{
//         const userId = req.userId
//        const user = await User.findById(userId)
//        if(!user){
//         return next(errorHandler(400,"user not found"))
//        }
//        user.name = req.body.name || user.name
//        user.email = req.body.email || user.email
//         user.password = await bcrypt.hash(req.body.password,10)
       
//     //    const updatedData = {name,email,mobile,password,profileImageUrl,adminJoinCode}
//     const updatedData = user   
//     user = await User.findByIdAndUpdate(userId,updatedData,{new:true})
//       return res.status(201).json(user)
//     }
//     catch(err){
//         next(errorHandler(500,err.message))
//     }
// }


export const upadteUserProfile = async(req,res,next)=>{
    try{
     const userId = req.userId;
     const user = await User.findById(userId);
     if(!user){
        return next(errorHandler(400,"User not found"))
     }
     const {name,email,mobile,password,profileImageUrl,adminJoinCode} = req.body
     let updatedFields = {
        name,
        email,
        mobile,
        profileImageUrl,
        adminJoinCode
     }
     //only hash if password is provided
     if(password){
        updatedFields.password = await bcrypt.hash(password,10)
     }
     const updatedUser = await User.findByIdAndUpdate(
        userId,
        updatedFields,
     {new:true}
    )
     return res.status(200).json(updatedUser)
    }
    catch(err){
        next(errorHandler(400,err.message))
    }
}