import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
const isAuth = (req,res,next)=>{
    try{
        const token = req.cookies?.token
        if(!token){
        //    return res.status(401).json({message:"token not found"})
           return next(errorHandler(401,"token not found"))
        }
        let decodeToken;
        console.log("cookies recieved:",req.cookies)
         try{
          decodeToken = jwt.verify(token,process.env.JWT_SECRET)
         }
         catch(err){
         return next(errorHandler(401,"token Invalid"))
            // return res.status(401).json({message:"token invalid"})  
         }
         req.userId = decodeToken.id || decodeToken._id || decodeToken.userId
         next()
    }
    catch(err){
        // return res.status(500).json({message:"isAuth error:",err})
         next(errorHandler(500,err.message))
    }
}
export default isAuth;

export const adminOnly = (req,res,next)=>{
    if(req.user && req.role === "admin"){
        next()
    }
    else{
        return next(errorHandler(403,"Access Denied, admin only"))
    }
}