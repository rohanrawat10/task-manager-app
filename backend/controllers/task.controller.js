import Task from "../models/task.model.js";
import { errorHandler } from "../utils/error.js";

export const createTask = async (req, res, next) => {
  try {
    const {
      title,
      description,
      priority,
      dueDate,
      status,
      assignedTo,
      attachments,
      todoCheckList,
    } = req.body;
    if (!Array.isArray(assignedTo)) {
      return next(
        errorHandler(400, "assigned to must be an array of user ID's"),
      );
    }
    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      status,
      assignedTo,
      attachments,
      todoCheckList,
      createdBy: req.user.id,
    });
    res.status(201).json({
      success: true,
      message: "Task Created",
      task,
    });
  } catch (err) {
    next(errorHandler(500, err.message));
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const { status } = req.query;
    let filter = {};
    if (status) {
      filter.status = status;
    }
    let tasks;
    if (req.user.role === "admin") {
      tasks = await Task.find(filter).populate(
        "assignedTo",
        "name email profileImageUrl",
      );
    } else {
      tasks = await Task.find({
        ...filter,
        assignedTo: req.user.id,
      }).populate("assignedTo", "name email profileImageUrl");
    }
    // tasks = await Promise.all(
    //   tasks.map(async (task) => {
    //     const completedCount = task.todoChecklist.filter(
    //       (item) => item.completed,
    //     ).length;
    //     return {...tasks._doc,
    //         completedCount
    //     }
    //   }),

    // );
    tasks = tasks.map((task) => {
  const checklist = Array.isArray(task.todoChecklist)
    ? task.todoCheckList
    : [];

  const completedCount = checklist.filter(
    (item) => item.completed === true
  ).length;

  return {
    ...task._doc,
    completedCount,
  };
});

    // status summary count
    const allTasks = await Task.countDocuments(
        req.user.role === "admin"?{}:{assignedTo:req.user.id}
    )
    const pendingTasks = await Task.countDocuments({
        ...filter,
        status:"Pending",
        ...(req.user.role !== "admin" && {assignedTo:req.user.id})
    })
    const inProgressTask= await Task.countDocuments({
        ...filter,
        status:"In Progress",
        // if logged in user is not admin then add assigned
        // if logged in user is the admin then nothing to do, just count
        ...(req.user.role !== "admin" && {assignedTo:req.user.id})
    })
    const completedTask = await Task.countDocuments({
        ...filter,
        status:"Completed",
        ...(req.user.role !== "admin" && {assignedTo:req.user.id})
    })
    res.status(200).json({
        tasks,
        statusSummary:{
            all:allTasks,
            pendingTasks,
            inProgressTask,
          completedTask
        }
    })
  } catch (err) {
    next(errorHandler(500, err.message));
  }
};

export const getTaskById = async(req,res,next)=>{
     try{
        console.log(req.params.id)
        // const taskId = req.params.id
        const task = await Task.findById(req.params.id).populate(
            "assignedTo",
            "name email profileImageUrl"
        )
        if(!task){
            return next(errorHandler(404,"No task Found!"))
        }
        res.status(200).json(task)
     }
    
    catch(err){
        next(errorHandler(500,err.message))
    }
}

export const updateTask = async(req,res,next)=>{
    try{
       const task = await Task.findById(req.params.id)
      if(!task){
        return next(errorHandler(400,"No Task found!"))
      }
      task.title = req.body.title || task.title
      task.description = req.body.description || task.description
      task.priority = req.body.priority || task.priority
      task.dueDate = req.body.dueDate || task.dueDate
      task.todoCheckList = req.body.todoCheckList || task.todoCheckList
    //   task.status = req.body.status || task.status
      task.attachments = req.body.attachments || task.attachements
       
      if(req.body.assignedTo){
        if(!Array.isArray(req.body.assignedTo)){
            return next(errorHandler(400,"assignedTo must be an array"))
        }
        task.assignedTo = req.body.assignedTo
      }
      const updatedTask = await task.save()
      return res.status(200).json({
        success:true,
        message:"Task Updated Successfully",
        updatedTask
      })
    }
    catch(err){
        next(errorHandler(500,err.message))
    }
}

export const deleteTask = async(req,res,next)=>{
    try{
     const task = await Task.findById(req.params.id)
     if(!task){
        return next(errorHandler(404,"Task not found"))
     }
     await task.deleteOne()
     res.status(200).json({message:"Task Deleted Successfully!"})
    }
    catch(err){
        next(errorHandler(500,err.message))
    }
}

export const updateTaskStatus = async(req,res,next)=>{
    try{
     const task = await Task.findById(req.params.id);
     if(!task){
        return next(errorHandler(400,"No task found!"))
        // task.status = req.body.status || task.status
     }
      const isAssigned = task.assignedTo.some((userId)=>userId.toString()===req.user.id)
     if(!isAssigned && req.user.role !="admin"){
        return next(errorHandler(403,"Unauthorized user"))
     }
     task.status = req.body.status || task.status
     if(task.status === "completed"){
       task.todoCheckList.forEach((item)=>(item.completed = true))
     }
     res.status(200).json({message:"Task status updated",task})
    }
    catch(err){
        next(errorHandler(500,err.message))
    }
}

export const updateTaskCheckList = async(req,res,next)=>{
    try{
    const {todoCheckList} = req.body
    const task = await Task.findById(req.params.id)
      if(!task){
        return next(errorHandler(400,"NO Task Found!"))
      }
      if(!task.assignedTo.includes(req.user.id) && req.user.role !== "admin"){
        return next(errorHandler(400,"Not authorized"))
      }
      task.todoCheckList  = todoCheckList
      const completedCount = task.todoCheckList.filter((item)=>item.completed).length
      const totalItems = task.todoCheckList.length
      task.progress = totalItems>0?Math.round((completedCount/totalItems)*100):0
    //  4 task, 4 complete comletedCount/totalItems = 1 * 100 = 100

    if(task.progress === 10){
        task.status = "Completed"
    }
    else if(task.progress > 0){
        task.status = "In Progress"
    }
    else{
        task.status = "Pending"
    }
    await task.save()
    const updateTask = await Task.findById(req.params.id).populate(
        "assignedTo",
        "name email profileImageUrl"
    )
    res.status(200).json({message:"Task checklist updated!",task:updateTask})
   
    }
    catch(err){
        next(errorHandler(500,err.message))
    }
}


export const getDashBoardData = async(req,res,next)=>{
    try{
        //fetch statisctics
        const  totalTasks = await  Task.countDocuments()
        const pendingTasks = await Task.countDocuments({status:"Pending"})
        const completedTasks = await Task.countDocuments({status:"Completed"})
        const overDueTasks = await Task.countDocuments({status:{$ne:"Completed"},
        dueDate:{$lt:new Date()}
    })
   const taskStatuses = ["Pending","Completed","In Progress"]


   const taskDistributionRaw = await Task.aggregate([
    {
        $group:{
            _id:"$status",
            count:{$sum:1}
        },
    }
   ])
    const taskDistribution = taskStatuses.reduce((acc,status)=>{
        const formattedKey = status.replace(/\s+/g,"")//remove spaces for response keys
       acc[formattedKey] = taskDistributionRaw.find((item)=>item._id === status)?.count || 0
         return acc
    
    },{})
    taskDistribution["All"] = totalTasks
    const taskPriorities = ["Low","Medium","High"]
    const taskPriorityLevelRaw = await Task.aggregate([
        {
            $group :{
                _id:'$priority',
                count:{$sum:1}
            },
        },
    ])
    const taskPriorityLevel = taskPriorities.reduce((acc,priority)=>{
        acc[priority]=taskPriorityLevelRaw.find((item)=>item._id === priority)?.count || 0
      return acc 
    },{})

    //  Fetc recent 10 tasks
  const  recentTasks = await Task.find()
  .sort({createdAt:-1})
  .limit(10).select("title status priority dueDate createdAt")

   res.status(200).json({
    statistics:{
        totalTasks,
        pendingTasks,
        completedTasks
    },
    charts:{
        taskDistribution,
        taskPriorityLevel
    },
    recentTasks,
   })
}
    catch(err){
        next(errorHandler(500,err.message))
    }
}