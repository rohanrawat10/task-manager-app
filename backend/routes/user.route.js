import express from "express";
import isAuth from "../middelwares/isAuth.js";
import { upadteUserProfile, uploadImage, userProfile } from "../controllers/user.controller.js";
import { upload } from "../middelwares/multer.js";
const userRouter = express.Router();
userRouter.get("/user-profile",isAuth,upload.single('image'),userProfile)
userRouter.put("/updated-profile",isAuth,upload.single("image"),upadteUserProfile)
userRouter.post("/upload-image",upload.single("image"),uploadImage)
export default userRouter;