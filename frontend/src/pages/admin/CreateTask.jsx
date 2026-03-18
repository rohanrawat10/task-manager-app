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
  const { taskId } = location.state || {}
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
    setTaskData((prevData) => ({ ...prevData, [key]: value }))
  }

  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: null,
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    })
  }

  const createTask = async () => {}
  const updateTask = async () => {}
  const handleSubmit = async (e) => {
    setError("")
    if(!taskData.title.trim()){
      setError("Title is required!")
      return
    }
    if(!taskData.dueDate){
      setError("Due date is required!")
    }
    if(!taskData.todoChecklist?.length === 0){
          setError("Create task!")
    }
    if(!taskData.assignedTo?.length === 0){
      setError("Assing the task!")
    }
    if(taskId){
      updateTask()
      return
    }
    createTask()
  }
  const getDetailsById = async () => {}
  const deleteTask = async () => {}

  return (
    <DashboardLayout activeMenu={"Create Task"}>
      <div className='p-6'>
        <div className='bg-white rounded-lg shadow-md p-6'>

          {/* Header */}
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

              {/* Title */}
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

              {/* Description */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Description<span className='text-red-700'>*</span>
                </label>
                <textarea
                  placeholder='Enter Task Description'
                  rows={4}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  value={taskData.description}
                  onChange={(e) => handleValueChange("description", e.target.value)}
                />
              </div>

              {/* Priority + Due Date*/}
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
                    Due Date<span className='text-red-700'>*</span>
                  </label>
                  <DatePicker
                    selected={taskData.dueDate}
                    onChange={(date) => handleValueChange("dueDate", date)}
                    minDate={new Date()}
                    placeholderText='Select Due Date'
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              </div>

              {/* Assign To */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Assign To
                </label>
                <SelectedUsers
                  selectedUser={taskData.assignedTo}
                  setSelectedUsers={(value) => handleValueChange("assignedTo", value)}
                />
              </div>

              {/* TODO Checklist */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'> 
                  TODO Checklist
                </label>
                <TodoChecklistInput
                  todoList={taskData.todoChecklist}
                  setTodoList={(value) => handleValueChange("todoChecklist", value)} 
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Add Attachments
                </label>
                <AddAttachmentsInput
                  attachments={taskData.attachments}
                  setAttachments={(value) => handleValueChange("attachments", value)}
                />
              </div>

              
              <div className='flex justify-end'>
                <button
                   type='button'
                  className='px-6 py-2 bg-green-500 border border-green-300 rounded-md
                    text-white font-medium hover:bg-green-700 cursor-pointer w-full transition-colors'
               onClick={handleSubmit} >
                  {taskId ? "UPDATE TASK" : "CREATE TASK"}
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CreateTask