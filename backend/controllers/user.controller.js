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