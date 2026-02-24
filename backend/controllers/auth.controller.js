import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { genToken } from "../utils/token.js";
import { errorHandler } from "../utils/error.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const signUp = async(req,res,next)=>{
    try{ 
    const {name,email,mobile,password,profileImageUrl,adminJoinCode}=req.body
  //  let profileImageUrl ;
  //  if(req.file){
  //   const uploadedImage = await uploadOnCloudinary(req.file.path);
  //     profileImageUrl = uploadedImage?.secure_url
  // }
    if(!name?.trim() || !email?.trim() || !password?.trim()){
        return next(errorHandler(400,"All feilds are required"))
     }
    // check if user already exists
    const isAlreadyExist = await User.findOne({email})
    if(isAlreadyExist){
        return next(errorHandler(400,"user already exists"))
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
  const token = genToken(user._id)
  res.cookie("token",token,{
    httpOnly:true,
    sameSite:"lax",
    secure:false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })

 return res.status(201).json({
  message:"Signup successful",
   _id:user._id,
  name: user.name,
   email:user.email,
   role:user.role,
   profileImageUrl:user.profileImageUrl,
   
  })
}
catch(err){
next(errorHandler(500,err.message))
}

}

export const signIn = async (req,res,next)=>{
  try{
    const {email,password} = req.body
    if(!email || !password){
      return next(errorHandler(400,"Email & password required"))

    }
    const user = await User.findOne({email}).select("+password")
    if(!user || !user.password){
      return next(errorHandler(400,"Invalid credentials!"))
    }
   const isMatched = await bcrypt.compare(password,user.password)
  if(!isMatched){
        return next(errorHandler(400,"Incorrect credentials"))
  }
  const token = genToken(user._id)
  res.cookie("token",token,{
    httpOnly:true,
    sameSite:"lax",
    secure:false,
    maxAge:7*24*60*60*1000
  })
   return res.status(200).json({
    message:"Sign-in successfull",
    _id:user._id,
    name:user.name,
    email:user.email,
    role:user.role
   })
  }
  catch(err){
    next(errorHandler(500,err.message))
  }
}

// export const userProfile = async(req,res,next)=>{
//   try{
//   const user = await User.findById(req.user._id)
//   }
//   catch(err){
//        next(errorHandler(500,err.message      ))
//   }
// }

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


export const upadateUserProfile = async(req,res,next)=>{
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

export const uploadImage = async(req,res,next)=>{
    try{
    if(!req.file){
        return next(errorHandler(400,"No file uploaded"))
    }
    const uploadedImage = await uploadOnCloudinary(req.file.path)
    return res.status(200).json({
        success:true,
        imageUrl:uploadedImage?.secure_rul
    })
    }
    catch(err){
        next(errorHandler(500,err.message))
    }
}