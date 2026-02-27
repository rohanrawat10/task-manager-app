// import express from "express";
// import { signUp, signIn,userProfile,uploadImage, upadateUserProfile } from "../controllers/auth.controller.js";
// import isAuth from "../middlewares/isAuth.js";
// import { upload } from "../middlewares/multer.js";
// const authRouter = express.Router();
// authRouter.post("/sign-up",upload.single("image"),signUp)
// authRouter.post("/sign-in",signIn)
// authRouter.get("/user-profile",isAuth,upload.single('image'),userProfile)
// authRouter.put("/updated-profile",isAuth,upload.single("image"),upadateUserProfile)
// authRouter.post("/upload-image",upload.single("image"),uploadImage)
// // authRouter.get("/user-profile",isAuth,userProfile)
// export default authRouter;


import express from "express";
import { signUp, signIn,userProfile,uploadImage, upadateUserProfile } from "../controllers/auth.controller.js";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
const authRouter = express.Router();

authRouter.post("/sign-up", signUp)
authRouter.post("/sign-in", signIn)
authRouter.get("/user-profile", isAuth, userProfile)
authRouter.put("/updated-profile", isAuth, upload.single("image"), upadateUserProfile)
authRouter.post("/upload-image", upload.single("image"), uploadImage)

export default authRouter;
