import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DashboardLayout from '../../components/DashboardLayout'
import axios from 'axios'
import { serverUrl } from '../../config'
import moment from 'moment'

function Dashboard() {
 const { currentUser } = useSelector((state) => state.user);
 const[pieChartData,setPieChartData] = useState(null)
 const[dashboardData,setDashboardData] = useState(null)
 const[barChartData,setBarChartData] = useState(null)
    console.log("current user",currentUser)
 const getDashboardData = async()=>{
  try{
const result = await axios.get(`${serverUrl}/api/tasks/dashboard-data`,{withCredentials:true})
   if(result.data){
     setDashboardData(result.data)
   }
   

}
  catch(err){
    console.log("Error fetching dashboard data",err.message)
  }
 }
 useEffect(()=>{
  getDashboardData()
    return()=>{}
  
 },[])
  return (
    <DashboardLayout activeMenu={"Dashboard"}>
      <div className=''>
          <div className=''>
            <div className=''>
                 <h2 className=''>Welcome!{currentUser?.name}</h2>
                    <p className=''>{moment().format("dddd Do MMM YYYY")}</p>
            </div>
          </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard