import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
 name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
             type:String,
             required:true,
             select:false
    },
    mobile:{
        type:String,
        required:true,
    },
    profileImageUrl:{
        type:String,
        default:"https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
    
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user",
    }
},{
    timestamps:true
})

const User = mongoose.model("User",userSchema);
export default User;