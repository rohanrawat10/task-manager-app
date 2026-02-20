import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"

export const getUsers = async(req,res,next)=>{
try{
  const users = await User.find({role:"user"}).select("-password")
       const userWithTaskCounts = await Promise.all(
        users.map(async(user)=>{
            const pendingTasks = await Task.countDocuments({
                assignedTo:user._id,
                status:"Pending",
            })
            const inProgessTasks = await Task.countDocuments({
              assignedTo:user._id,
              status:"In Progess"
            })
            const completedTasks = await Task.countDocuments({
                assignedTo:user._id,
                status:"Completed"
            })
            return{
                ...user._doc,
                pendingTasks,
                inProgessTasks,
                completedTasks
            }
        })
       )
       res.status(200).json(userWithTaskCounts)
  
}
catch(err){
    next(errorHandler(500,err.message))
}
}

export const getUserById = async(req,res,next)=>{
try{
const userId = req.params.id
const user = await User.findById(userId).select("-password")
if(!user){
    return next(errorHandler(400,"user not found"))
}
res.status(200).json(user)
}
catch(err){
    next(errorHandler(500,err.message))
}
}