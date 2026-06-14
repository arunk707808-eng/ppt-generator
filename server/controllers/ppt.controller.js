import fs from "fs";
import path from "path";
import { aiService } from "../services/aiService.js"
import { pixelsApiService } from "../services/pixelsApiService.js";
import { pptGenService } from "../services/pptGenService.js";
import { STATUS_CODES } from "http";

export const pptGen = async(req, res)=>{
  try {
    const {topic, slides} = req.body
    const aiResponse = await aiService(topic, slides)
    const cleanJson = aiResponse
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();
    const presentation = JSON.parse(cleanJson);
    // console.log(presentation)

    for (const item of presentation.slides) {
  const image = await pixelsApiService(item.imageQuery);
  item.imageQuery = image
}

   const fileName =  await pptGenService(presentation);
 res.download(
  `./downloads/${fileName}`,
  fileName
);
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message:"server error",
    })
  }
}