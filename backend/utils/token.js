import jwt from "jsonwebtoken";
export const genToken = (userId) =>{
    try{
        const token = jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:"7d"});
        return token;
    }
    catch(err){
        console.log("Tokengen error:",err)
    }
}