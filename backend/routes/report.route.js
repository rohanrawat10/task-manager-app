import express from "express";
import isAuth, { adminOnly } from "../middlewares/isAuth.js";
import { exportTaskReport, exportUserReport } from "../controllers/report.controller.js";
const reportRouter = express.Router();

reportRouter.get("/export/tasks",isAuth,adminOnly,exportTaskReport)
reportRouter.get("/export/users",isAuth,adminOnly,exportUserReport)
export default reportRouter;