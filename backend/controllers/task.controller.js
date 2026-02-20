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
    if(!Array.isArray(assignedTo)){
        return next(errorHandler(400,"assigned to must be an array of user ID's"))
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
      createdBy: req.user.id
    })
    res.status(201).json({
        success:true,
        message:"Task Created",
        task
    })
  } catch (err) {
    next(errorHandler(500, err.message));
  }
};
