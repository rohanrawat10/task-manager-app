import axios from "axios"
import { serverUrl } from "../config"

const uploadImage = async(imageFile)=>{
    const formData = new FormData()
    formData.append("image",imageFile)
  
    try{
     const result = await axios.post(`${serverUrl}/api/auth/upload-image`,formData,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
     })
     console.log(result.data)
       return  result.data
    }
    catch(err){
        console.log("Upload image Error:",err.message)
    }

}

export default uploadImage;