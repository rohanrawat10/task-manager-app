import express from "express";
import isAuth from "../middelwares/isAuth.js";
import { userProfile } from "../controllers/user.controller.js";
const userRouter = express.Router();
userRouter.get("/user-profile",isAuth,userProfile)

export default userRouter;