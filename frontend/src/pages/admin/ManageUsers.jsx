import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import axios from 'axios';
import { serverUrl } from '../../config';
import { FaFileExcel } from "react-icons/fa6";
import UserCard from '../../components/UserCard';
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
  const handleDownloadReport = async()=>{

  }
  useEffect(()=>{
    getAllUsers()
    return ()=>{}
  },[])
  return (
    <DashboardLayout activeMenu={"Team Members"}>
      <div className='mt-5 mb-10'>
        <div className='flex  items-center justify-between'>
          <h2 className='text-2xl font-medium'>Team Members</h2>
            <button
            type='button'
            className='flex items-center gap-1 px-4 py-2 bg-yellow-200 hover:bg-yellow-400 
             active:scale-90 rounded-xl transition-colors font-medium shadow-sm hover:shadow-sm duration-1000 '
            onClick={handleDownloadReport}
            >
             <FaFileExcel className='text-lg text-green-900'/> Download Report
              </button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 '>
              {
                allUsers.map((user)=>(
                  <UserCard key={user._id} userInfo={user}/>
                ))
              }
        </div>
        </div>
    </DashboardLayout>
  )
}

export default ManageUsers