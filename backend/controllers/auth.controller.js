import bcrypt from "bcrypt";
import User from "../models/user.model.js";
export const signUp = async(req,res)=>{
    try{ 
    const {name,email,mobile,password,profileImageUrl,adminJoinCode}=req.body
     if(!name?.trim() || !email?.trim() || !password?.trim()){
        return res
        .status(400)
        .json({ message:"All feilds are required"})
     }
    // check if user already exists
    const isAlreadyExist = await User.findOne({email})
    if(isAlreadyExist){
        return res
        .status(400)
        .json({success:false, message:'User already Exists'})
    }
    //check user role
    let role = "user"
    if(adminJoinCode && adminJoinCode === process.env.ADMIN_JOIN_CODE){
        role = "admin"
    }

     const hashedPassword = await bcrypt.hash(password,10)

  const user = await User.create({
    name,
    email,
    mobile,
    role,
    profileImageUrl,
    password:hashedPassword
  })
  const token =genToken(user._id)
  res.cookie("token",token,{
    httpOnly:true,
    sameSite:"lax",
    secure:false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })

 return res.status(201).json({
   _id:user._id,
   fullName:user.fullName,
   email:user.email,
   role:user.role,
   profileImageUrl:user.profileImageUrl,
   
  })
}
catch(err){
    res.status(500).json({message:"Sign up error:",err})
}

}