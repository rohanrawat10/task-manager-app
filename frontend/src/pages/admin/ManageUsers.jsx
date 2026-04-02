import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import axios from 'axios';
import { serverUrl } from '../../config';

function ManageUsers() {
  const [allUsers,setAllUsers] = useState([]);
  const getAllUsers = async ()=>{
    try{
     const result = await axios.get(`${serverUrl}/api/users/get-users`,{withCredentials:true})
      if(result.data?.length>0){
        setAllUsers(result.data)
      }
      console.log(result.data)
    }
    catch(err){
        console.log("Get users error:",err.message)
    }
  }
  useEffect(()=>{
    getAllUsers()
    return ()=>{}
  },[])
  return (
    <DashboardLayout activeMenu={"Team Members"}>ManageUsers</DashboardLayout>
  )
}

export default ManageUsers