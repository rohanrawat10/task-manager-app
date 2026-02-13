import mongoose from "mongoose";
const connectDB= async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
    }
    catch(err){
     console.error("Connect db error:",err)
    }
}

export default connectDB;