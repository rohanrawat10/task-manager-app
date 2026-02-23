import express from "express";
import isAuth, { adminOnly } from "../middlewares/isAuth.js";
import { createTask,getTasks,getTaskById,updateTask,deleteTask } from "../controllers/task.controller.js";
const taskRouter = express.Router()
 taskRouter.post("/create-task",isAuth,adminOnly,createTask)
 taskRouter.get("/get-tasks",isAuth,getTasks)
taskRouter.get("/get-task-by-id/:id",isAuth,getTaskById)
taskRouter.put("/update-task/:id",isAuth,updateTask)
taskRouter.delete("/delete-task/:id",isAuth,adminOnly,deleteTask)
 export default taskRouter;