
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashboardLayout from "../../components/DashboardLayout";
import axios from "axios";
import { serverUrl } from "../../config";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { IoIosCreate } from "react-icons/io";
import RecentTasks from "../../components/RecentTasks";
import CustomPieChart from "../../components/CustomPieChart";
import CustomBarChart from "../../components/CustomBarChart";

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56"];

function Dashboard() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [pieChartData, setPieChartData] = useState([]);
  const [dashboardData, setDashboardData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  const prepareChartData = (data) => {
    const taskDistribution = data?.taskDistribution || {};
    const taskPriorityLevels = data?.taskPriorityLevel || {};
    
    setPieChartData([
      { status: "Pending", count: taskDistribution?.Pending || 0 },
      { status: "In Progress", count: taskDistribution?.InProgress || 0 },
      { status: "Completed", count: taskDistribution?.Completed || 0 },
    ]);

    setBarChartData([
      { priority: "Low", count: taskPriorityLevels?.Low || 0 },
      { priority: "Medium", count: taskPriorityLevels?.Medium || 0 },
      { priority: "High", count: taskPriorityLevels?.High || 0 },
    ]);
  };

  const getDashboardData = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/tasks/dashboard-data`, {
        withCredentials: true,
      });
      if (result.data) {
        setDashboardData(result.data);
        prepareChartData(result.data?.charts || null);
      }
    } catch (err) {
      console.log("Error fetching dashboard data", err.message);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu={"Dashboard"}>
      {/* THE MOST RESPONSIVE CONTAINER */}
      <div className="w-full min-h-screen p-3 sm:p-4 md:p-6 lg:p-8 xl:px-12 2xl:px-16 space-y-4 sm:space-y-6 md:space-y-8">
        
        {/* HERO SECTION - PERFECT ON ALL DEVICES */}
        <section className="w-full bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl text-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4 md:gap-6">
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black leading-tight break-words">
                Welcome back, <span className="text-blue-100">{currentUser?.name}</span>!
              </h1>
              <p className="text-blue-100/90 text-xs sm:text-sm md:text-base mt-1 sm:mt-2 font-medium">
                {moment().format("dddd, MMMM Do YYYY")}
              </p>
            </div>
            <div className="flex-shrink-0">
              <button
                className="w-full sm:w-auto bg-white/95 backdrop-blur-sm text-blue-600 hover:bg-white hover:shadow-2xl px-4 sm:px-6 md:px-8 py-2.5 md:py-3 rounded-2xl font-bold text-sm sm:text-base md:text-lg shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 min-h-[44px] sm:min-h-[48px]"
                onClick={() => navigate("/admin/create-task")}
              >
                <IoIosCreate className="text-lg sm:text-xl" />
                Create Task
              </button>
            </div>
          </div>
        </section>

        {/* STATS GRID - MOBILE:1, TABLET:2, DESKTOP:4 */}
        {dashboardData && (
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 auto-rows-fr">
            <article className="group bg-white/80 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-3xl shadow-lg hover:shadow-2xl border border-gray-100/50 hover:border-gray-200/50 transition-all duration-300 border-l-4 border-l-blue-500 hover:-translate-y-1">
              <h3 className="text-gray-500 text-xs sm:text-sm font-semibold uppercase tracking-wider group-hover:text-gray-700">Total Tasks</h3>
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mt-1 sm:mt-2">
                {dashboardData?.charts?.taskDistribution.All || 0}
              </p>
            </article>
            
            <article className="group bg-white/80 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-3xl shadow-lg hover:shadow-2xl border border-gray-100/50 hover:border-gray-200/50 transition-all duration-300 border-l-4 border-l-yellow-500 hover:-translate-y-1">
              <h3 className="text-gray-500 text-xs sm:text-sm font-semibold uppercase tracking-wider group-hover:text-gray-700">Pending</h3>
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mt-1 sm:mt-2">
                {dashboardData?.charts?.taskDistribution.Pending || 0}
              </p>
            </article>
            
            <article className="group bg-white/80 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-3xl shadow-lg hover:shadow-2xl border border-gray-100/50 hover:border-gray-200/50 transition-all duration-300 border-l-4 border-l-emerald-500 hover:-translate-y-1">
              <h3 className="text-gray-500 text-xs sm:text-sm font-semibold uppercase tracking-wider group-hover:text-gray-700">In Progress</h3>
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mt-1 sm:mt-2">
                {dashboardData?.charts?.taskDistribution.InProgress || 0}
              </p>
            </article>
            
            <article className="group bg-white/80 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-3xl shadow-lg hover:shadow-2xl border border-gray-100/50 hover:border-gray-200/50 transition-all duration-300 border-l-4 border-l-red-500 hover:-translate-y-1">
              <h3 className="text-gray-500 text-xs sm:text-sm font-semibold uppercase tracking-wider group-hover:text-gray-700">Completed</h3>
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mt-1 sm:mt-2">
                {dashboardData?.charts?.taskDistribution.Completed || 0}
              </p>
            </article>
          </section>
        )}

        {/* CHARTS - FULL RESPONSIVE */}
        <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6 md:gap-8 auto-rows-fr">
          {/* PIE CHART */}
          <article className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 order-2 lg:order-1">
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-black text-gray-800 mb-4 sm:mb-6 tracking-tight">
              📊 Task Distribution
            </h3>
            <div className="w-full h-60 sm:h-72 md:h-80 lg:h-96 flex items-center justify-center">
              <CustomPieChart data={pieChartData} label="Status Breakdown" colors={COLORS} />
            </div>
          </article>

          {/* BAR CHART */}
          <article className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 order-1 lg:order-2">
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-black text-gray-800 mb-4 sm:mb-6 tracking-tight">
              📈 Priority Levels
            </h3>
            <div className="w-full h-60 sm:h-72 md:h-80 lg:h-96">
              <CustomBarChart data={barChartData} />
            </div>
          </article>
        </section>

        {/* RECENT TASKS */}
        <section className="w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-100/50">
          <RecentTasks tasks={dashboardData?.recentTasks} />
        </section>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
