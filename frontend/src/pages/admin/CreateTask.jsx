import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import DashboardLayout from "../../components/DashboardLayout"
import { MdAutoDelete } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import SelectedUsers from '../../components/SelectedUsers';
import TodoChecklistInput from '../../components/TodoChecklistInput';
import AddAttachmentsInput from '../../components/AddAttachmentsInput';

function CreateTask() {
  const location = useLocation();
  const {taskId} = location.state || {}
  // const taskId = 1
  const navigate = useNavigate()

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",     
    priority: "Low",
    dueDate: null,
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  })

  const [currentTask, setCurrentTask] = useState(null)
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false)
  const [error, setError] = useState("")

  const handleValueChange = (key, value) => {
    setTaskData((prevData) => ({
      ...prevData,
      [key]: value,
    }))
  }

  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "Low",   
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    })
  }

  const createTask = async () => {}
  const updateTask = async () => {}
  const handleSubmit = async (e) => {}
  const getDetailsById = async () => {}

 
  const deleteTask = async () => {}

  return (
    <DashboardLayout activeMenu={"Create Task"}>
      <div className='p-6'>
        <div className='bg-white rounded-lg shadow-md p-6'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-2xl font-bold text-gray-800'>
              {taskId ? "Update Task" : "Create New Task"}
            </h2>
            {taskId && (
              <button
                className='flex items-center gap-2 text-red-600 hover:text-red-800 cursor-pointer' 
                onClick={() => setOpenDeleteAlert(true)}
              >
                <MdAutoDelete className='text-lg' /> Delete Task
              </button>
            )}
          </div>

          {error && (
            <div className='mb-4 p-3 bg-red-100 text-red-700 rounded-md'>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Task Title<span className='text-red-700'>*</span>
                </label>
                <input
                  type='text'
                  placeholder='Enter Task Title'
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  value={taskData.title}
                  onChange={(e) => handleValueChange("title", e.target.value)}
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Description
                </label>
                <textarea
                  placeholder='Enter Task Description'
                  rows={4}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  value={taskData.description}  
                  onChange={(e) => handleValueChange("description", e.target.value)}
                />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Priority
                  </label>
                  <select
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    value={taskData.priority}
                    onChange={(e) => handleValueChange("priority", e.target.value)}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Due Date
                  </label>
                  <div className='relative'>
                    <DatePicker
                      selected={taskData.dueDate}
                      onChange={(date) => handleValueChange("dueDate", date)}
                      minDate={new Date()}
                      placeholderText='Select Due Date'
                      className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Assign To
                  </label>
                
                  <SelectedUsers
                    selectedUser={taskData.assignedTo}
                    setSelectedUsers={(value) => handleValueChange("assignedTo", value)}
                  />
                </div>
                <div className='mt-3'>
                      <lable className="block text-sm font-medium text-gray-700 mb-1">
                         TODO Checklist
                      </lable>
                      <TodoChecklistInput todoList={taskData?.todoChecklist} setTOdoList={(value)=>handleValueChange("todoCheckList",value)}/>
                </div>
                <div className='mt-3'>
                   <label className='block text-sm font-medium text-gray-700 mb-1'>Add Attachments</label>
                         <AddAttachmentsInput attachments={taskData?.attachments} setAttachments={(value)=>handleValueChange("attachments",value)}/>
                </div>
                {
                  error && (
                    <p className='text-red-500 text-sm mt-2k font-medium'>{error}</p>
                  )
                }
                <div className='flex justify-end mt-7'>
                       <button className='px-2 py-2 bg-green-500 border border-green-300
                       rounded-md text-white hover:bg-green-800 cursor-pointer w-full
                       ' onClick={handleSubmit}>
                         {taskId?"UPDATE TASK":"CREATE TASK"}
                       </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CreateTask