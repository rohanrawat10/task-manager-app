import express from "express";
import http from "http"
import dotenv from "dotenv";
dotenv.config();
const app = express()
const port  = process.env.PORT || 5000;
const server = http.createServer(app)



server.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})