import express from "express";
import dotenv from "dotenv"
dotenv.config()
const app = express();
const port = process.env.PORT || 8000
app.use(express.json())
app.get("/",(req,res)=>{
  res.send("hello server")
})

import pptRoutes from './routes/ppt.route.js'
app.use("/api",pptRoutes);


app.listen(port, ()=>{
  console.log(`app is running at port ${port}`)
})