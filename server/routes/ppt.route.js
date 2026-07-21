import express from "express";
import { createPreview, downloadPreview, pptGen } from "../controllers/ppt.controller.js";

const router = express.Router();
router.post("/ppt", pptGen);
router.post("/ppt/preview", createPreview);
router.get("/ppt/:id/download", downloadPreview);
export default router;
