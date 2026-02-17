import express from "express";
import { signUp } from "../controllers/auth.controller.js";
const authRouter = express.Router();
authRouter.post("/sign-up",signUp)
// authRouter.post("sign-in")
export default authRouter;