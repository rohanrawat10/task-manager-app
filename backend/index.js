import express from "express";
import cors from "cors";
import http from "http"
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import taskRouter from "./routes/task.route.js";
dotenv.config();
const app = express()
const port  = process.env.PORT || 5000;
const server = http.createServer(app)
//Middleware to handle cors

app.use(cors({
    origin:process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"]
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/users",userRouter)
app.use("/api/tasks",taskRouter)


app.use((err, req, res, next) => {
  console.log("🔥 ERROR:", err);  

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});


server.listen(port,()=>{
    connectDB();
    console.log(`server is running on port ${port}`)
})