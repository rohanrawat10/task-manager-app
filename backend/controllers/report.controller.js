import Task from "../models/task.model.js"
import { errorHandler } from "../utils/error.js"
import exceljs from "exceljs";
export const exportTaskReport = async(req,res,next)=>{
    try{
const tasks = await Task.find().populate("assignedTo","name email")
const workbook = new exceljs.workbook()
const worksheet = workbook.addWorksheet("Task Report")
worksheet.columns = [
    {header:"Task Id",key:"_id",width:25},
    {header:"Title",key:"title",width:30},
    {header:"Description",key:"description",width:50},
    {header:"Priority",key:"Priority",width:15},
    {header:"status",key:"status",width:20},
    {header:"Due Date",key:"dueDate",width:20},
    {header:"Assigned To",key:"assignedTo",width:30}
]
tasks.forEach((task)=>{
    const assignedTo = task.assignedTo.map(
        (user)=>`${user.name} (${user.email})`
    ).join(", ")
    worksheet.addRow({
        _id:task.id,
        title:task.title,
        description:task.description,
        priority:task.priority,
        status:task.status,
        dueDate :task.dueDate.toISOString().split("T")[0],
        assignedTo:assignedTo || "Unassigned"
    })
})
res.setHeader("Content-Type","attachment/vnd.opnexmlformats-officedocument.spreadsheetml.sheet")
res.setHeader("content-disposition","attachment;filename = 'tasks_report.xlsx'")
return workbook.xlsx.write(res).then(()=>{
    res.end()
})
} 
    catch(err){
        next(errorHandler(500,err.message))
    }
}

export const exportUserReport = async(req,res,next)=>{
    try{
        const users = await User.find().select("name email _id").lean()
        const userTasks = await Task.find().populate("assignedTo","name email _id")
         const userTaskMap = {}
         users.forEach((user)=>{
            userTaskMap[user._id] = {
                name:user.name,
                email:user.email,
                taskCount: 0,
                inProgressTask:0,
                completedTask:0
            }
         })
         userTasks.forEach((task)=>{
            if(task.assignedTo){
                task.assignedTo.forEach((assignedUser)=>{
                    if(userTaskMap[assignedUser._id]){
                        userTaskMap[assignedUser._id].taskCount +=1
                      if(task.status === "Pending"){
                        userTaskMap[assignedUser._id].pendingTask +=1
                      }
                       else if(task.status === "In Progress"){
                        userTaskMap[assignedUser._id].inProgressTask +=1
                      }
                      else if(task.status === "Completed"){
                          userTaskMap[assignedUser._id].completedTask += 1
                      }
                    }
                })
                     }
         })
                const workbook = new exceljs.Workbook()
                const worksheet = workbook.addWorksheet("User Task Report")
         worksheet.columns = [ 
            {header:"User Name",key:"name",width:30},
            {header:"email",key:"name",width:40},
             {header:"Total Assigned Tasks",key:"taskCount",width:20},
              {header:"Pending Tasks",key:"pedingTasks",width:20},
               {header:"In Progress Tasks",key:"inProgressTasks",width:30},
                {header:"Completed Tasks",key:"completedTask",width:20},
         ]
         Object.values(userTaskMap).forEach((user)=>{
            worksheet.addRow(user)
         })
         res.setHeader("Content-Type","attachment/vnd.opnexmlformats-officedocument.spreadsheetml.sheet")
res.setHeader("content-disposition","attachment;filename = 'users_report.xlsx'")
       return workbook.xlsx.write(res).then(()=>{
        res.end()
       })
    }
    catch(err){
         next(errorHandler(500,err.message))
    }
}