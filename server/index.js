import express from "express";
import cors from "cors"
import axios from "axios"
import dotenv from "dotenv"
dotenv.config()
const app = express();

const url = `https://ppt-generator-q6k3.onrender.com`;
const interval = 30000;

function reloadWebsite() {
  axios
    .get(url)
    .then((response) => {
      console.log("website reloded");
    })
    .catch((error) => {
      console.error(`Error : ${error.message}`);
    });
}

setInterval(reloadWebsite, interval);
const port = process.env.PORT || 8000
app.use(express.json())
app.use(cors());
app.get("/",(req,res)=>{
  res.send("hello")
})

import pptRoutes from './routes/ppt.route.js'
app.use("/api",pptRoutes);


app.listen(port, ()=>{
  console.log(`app is running at port ${port}`)
})