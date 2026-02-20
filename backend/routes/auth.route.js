import express from "express";
import { signUp, signIn,userProfile,updatedUserProfile,uploadImage } from "../controllers/auth.controller.js";
import isAuth from "../middelwares/isAuth.js";
import { upload } from "../middelwares/multer.js";
const authRouter = express.Router();
authRouter.post("/sign-up",upload.single("image"),signUp)
authRouter.post("/sign-in",signIn)
authRouter.get("/user-profile",isAuth,upload.single('image'),userProfile)
authRouter.put("/updated-profile",isAuth,upload.single("image"),upadteUserProfile)
authRouter.post("/upload-image",upload.single("image"),uploadImage)
// authRouter.get("/user-profile",isAuth,userProfile)
export default authRouter;