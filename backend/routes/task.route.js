import express from "express";
import isAuth, { adminOnly } from "../middlewares/isAuth.js";
import { createTask } from "../controllers/task.controller.js";
const taskRouter = express.Router()
 taskRouter.post("/create-task",isAuth,adminOnly,createTask)

 export default taskRouter;