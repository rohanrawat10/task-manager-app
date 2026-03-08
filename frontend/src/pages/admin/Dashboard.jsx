import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashboardLayout from "../../components/DashboardLayout";
import axios from "axios";
import { serverUrl } from "../../config";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { IoIosCreate } from "react-icons/io";
import RecentTasks from "../../components/RecentTasks";

function Dashboard() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [pieChartData, setPieChartData] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);
  console.log("current user", currentUser);
  const getDashboardData = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/tasks/dashboard-data`, {
        withCredentials: true,
      });

      if (result.data) {
        setDashboardData(result.data);
      }
      console.log(result.data)
    } catch (err) {
      console.log("Error fetching dashboard data", err.message);
    }
  };
  useEffect(() => {
    getDashboardData();
    return () => {};
  }, []);
  return (
    <DashboardLayout activeMenu={"Dashboard"}>
      <div className="p-6 space-y-6">
        <div className="bg-linear-to-r from-blue-500 to-indigo-600 rounded-xl p-6 shadow-lg text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Welcome! {currentUser?.name}
              </h2>
              <p className="text-blue-100 mt-1">
                {moment().format("dddd Do MMM YYYY")}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
             <button className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-lg font-medium
               font-medium transition-all duration-200 shadow-md 
              " onClick={()=>navigate("/admin/create-task")}>
                Create New Tasks
              </button> 
            </div>
          </div>
        </div>
        {dashboardData && (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              className="bg-white p-6 rounded-xl shadow-md border-l-4 border-l-4
               border-blue-500"
            >
              <h3 className="text-gray-500 text-sm font-medium">Total Tasks</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {dashboardData?.charts?.taskDistribution.All || 0 }
              </p>

            </div>
            <div
              className="bg-white p-6 rounded-xl shadow-md border-l-4 border-l-4
               border-yellow-500"
            >
              <h3 className="text-gray-500 text-sm font-medium">Pending Tasks</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {dashboardData?.charts?.taskDistribution.pending || 0 }
              </p>
              
            </div>
            <div
              className="bg-white p-6 rounded-xl shadow-md border-l-4 border-l-4
               border-green-500"
            >
              <h3 className="text-gray-500 text-sm font-medium">In Progress Tasks</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {dashboardData?.charts?.taskDistribution.inProgress || 0 }
              </p>
              
            </div>
            <div
              className="bg-white p-6 rounded-xl shadow-md border-l-4 border-l-4
               border-red-800"
            >
              <h3 className="text-gray-500 text-sm font-medium">Completed Tasks</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {dashboardData?.charts?.taskDistribution.completedTasks || 0 }
              </p>
              
            </div>
          </div>
        )}
        {/* Charts section */}

        {/* recent task section */}
        <RecentTasks tasks={dashboardData?.recentTasks}/>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
