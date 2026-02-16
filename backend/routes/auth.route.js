import express from "express";
import isAuth from "../middelwares/isAuth.js";
import { signUp } from "../controllers/auth.controller.js";
const authRouter = express.Router();
authRouter.post("/sign-up",isAuth,signUp)
authRouter.post("sign-in",isAuth)
export default authRouter;