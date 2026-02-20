import express from "express";
import isAuth, { adminOnly } from "../middlewares/isAuth.js";
import { createTask,getTasks } from "../controllers/task.controller.js";
const taskRouter = express.Router()
 taskRouter.post("/create-task",isAuth,adminOnly,createTask)
 taskRouter.get("/",isAuth,getTasks)

 export default taskRouter;