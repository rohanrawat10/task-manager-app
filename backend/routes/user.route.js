import express from "express";
import isAuth from "../middelwares/isAuth.js";
import { upadteUserProfile, userProfile } from "../controllers/user.controller.js";
const userRouter = express.Router();
userRouter.get("/user-profile",isAuth,userProfile)
userRouter.put("/updated-profile",isAuth,upadteUserProfile)
export default userRouter;