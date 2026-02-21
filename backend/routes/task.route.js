import express from "express";
import isAuth, { adminOnly } from "../middlewares/isAuth.js";
import { createTask,getTasks,getTaskById,updateTask } from "../controllers/task.controller.js";
const taskRouter = express.Router()
 taskRouter.post("/create-task",isAuth,adminOnly,createTask)
 taskRouter.get("/",isAuth,getTasks)
taskRouter.get("/:id",isAuth,getTaskById)
taskRouter.put("/:id",isAuth,updateTask)
 export default taskRouter;