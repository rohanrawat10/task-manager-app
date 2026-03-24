import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../../config";
import TaskStatusTabs from "../../components/TaskStatusTabs";
import { FaFileExcel } from "react-icons/fa";
function ManageTasks() {
  const navigate = useNavigate();
  const [allTasks, setAllTasks] = useState([]);
  const [tabs, setTabs] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  console.log("tasks", tabs);

  const getAllTasks = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/tasks/get-tasks`, {
        params: { status: filterStatus === "All" ? "" : filterStatus },
        withCredentials: true,
      });
      if (result?.data) {
        setAllTasks(result.data?.tasks?.length > 0 ? result.data.tasks : []);
      }
      const statusSummary = result.data?.statusSummary || {};
      const StatusArray = [
        { label: "All", count: statusSummary.all || 0 },
        { label: "Pending", count: statusSummary.pendingTasks || 0 },
        { label: "In Progress", count: statusSummary.inProgressTasks || 0 },
        { label: "Completed", count: statusSummary.completed || 0 },
      ];
      setTabs(StatusArray);
    } catch (err) {
      console.error("Error fetch tasks:", err);
    }
  };
  const handleClick = (taskData) => {
    navigate("/admin/create-task", { state: { taskId: taskData._id } });
  };
  const handleDownloadReport = async () => {};
  useEffect(() => {
    getAllTasks(filterStatus);
    return () => {};
  }, [filterStatus]);

  return (
    <DashboardLayout activeMenu={"Manage Task"}>
      <div className="my-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
          <div className="flex items-center justify-between gap-4 w-full md:w-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              My Tasks
            </h2>
            <button className="md:hidden px-4 py-2 bg-blue-500 hover:bg-blue-600
               text-white rounded-lg transition-colors duration-200 font-medium shadow-sm
                hover:shadow-md"
               onClick={handleDownloadReport}
               type="button"
               >
              Download
              </button>
          </div>
          {
            allTasks?.length > 0 &&(
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full
              md:w-auto">
                <TaskStatusTabs
                 tabs={tabs}
                activeTab={filterStatus}
                setActiveTab={setFilterStatus}/>
                <button 
                title="Download Report"
                className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600
                text-white rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md active:scale-95"
                onClick={handleDownloadReport}>
                  <FaFileExcel className="text-lg"/>
                  <span>Download</span>
                </button>
                </div>
            )
          }
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ManageTasks;
