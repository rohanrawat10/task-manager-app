import express from "express";
import { signUp, signIn } from "../controllers/auth.controller.js";
import isAuth from "../middelwares/isAuth.js";
const authRouter = express.Router();
authRouter.post("/sign-up",signUp)
authRouter.post("/sign-in",signIn)
// authRouter.get("/user-profile",isAuth,userProfile)
export default authRouter;