import React, { useEffect, useState } from 'react'
import DashboardLayout from "../../components/DashboardLayout"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../../config'
function ManageTasks() {
  const navigate= useNavigate()
  const [allTasks,setAllTasks] = useState([])
  const [tabs,setTabs] = useState("All")
  const [filterStatus,setFilterStatus] = useState("All")
     
        console.log("tasks",tabs)

  const getAllTasks = async()=>{
    try{
        let result = await axios.get(`${serverUrl}/api/tasks/get-tasks`,{
          params:{status:filterStatus === "All"?"":filterStatus},
          withCredentials:true
        })
       if(result?.data){
        setAllTasks(result.data?.tasks?.length>0?result.data.tasks:[])
       }
       const statusSummary = result.data?.statusSummary || {}
       const StatusArray = [
        {label:"All",count:statusSummary.all || 0},
         {label:"Pending",count:statusSummary.pendingTasks|| 0},
          {label:"In Progress",count:statusSummary.inProgressTasks || 0},
           {label:"Completed",count:statusSummary.completed || 0}
       ]
       setTabs(StatusArray)
    }
    catch(err){
      console.error("Error fetch tasks:",err)
    }
  }
  const handleClick = (taskData)=>{
    navigate("/admin/create-task",{state:{taskId:taskData._id}})
  }
  const handleDownloadReport = async()=>{

  }
  useEffect(()=>{
    getAllTasks(filterStatus)
    return ()=>{}
  },[filterStatus])

  return (
    <DashboardLayout activeMenu={"Manage Task"}>
      <div className='my-5'> </div>
    </DashboardLayout>
  )
}

export default ManageTasks