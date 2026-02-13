import express from "express";
import cors from "cors";
import http from "http"
import dotenv from "dotenv";
dotenv.config();
const app = express()
const port  = process.env.PORT || 5000;
const server = http.createServer(app)
//Middleware to handle cors

app.use(cors({
    origin:process.env.FRONTEND_URL || "http://localhost:5173",
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"]
}))


server.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})