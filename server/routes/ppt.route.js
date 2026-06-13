import express from "express";
import { pptGen } from "../controllers/ppt.controller.js";

const router = express.Router()

router.post("/ppt",pptGen);

export default router;