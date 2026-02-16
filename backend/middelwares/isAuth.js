import jwt from "jsonwebtoken";
const isAuth = (req,res,next)=>{
    try{
        const token = req.cookies?.token
        if(!token){
           return res.status(401).json({message:"token not found"})
        }
        let decodeToken;
        console.log("cookies recieved:",req.cookies)
         try{
          decodeToken = jwt.verify(token,process.env.JWT_SECRET)
         }
         catch(err){
          return res.status(401).json({message:"token invalid"})  
         }
         req.userId = decodeToken.id || decodeToken._id || decodeToken.userId
         next()
    }
    catch(err){
        return res.status(500).json({message:"isAuth error:",err})
    }
}
export default isAuth;