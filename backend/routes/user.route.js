import express from "express";
import isAuth, { adminOnly } from "../middlewares/isAuth.js";
import {getUsers, getUserById } from "../controllers/user.controller.js";
const userRouter = express.Router();
userRouter.get("/get-users",isAuth,adminOnly,getUsers)
userRouter.get("/:id",isAuth,getUserById)

export default userRouter;