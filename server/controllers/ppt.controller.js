import fs from "fs";
import path from "path";
import { aiService } from "../services/aiService.js"
import { pixelsApiService } from "../services/pixelsApiService.js";
import { pptGenService } from "../services/pptGenService.js";
import { STATUS_CODES } from "http";
import { error } from "console";

export const pptGen = async(req, res)=>{
  try {
    const {topic, slides} = req.body
    const aiResponse = await aiService(topic, slides)
    const cleanJson = aiResponse
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();
    const presentation = JSON.parse(cleanJson);

    for (const item of presentation.slides) {
  const image = await pixelsApiService(item.imageQuery);
  item.imageQuery = image
}
   const fileName =  await pptGenService(presentation);
 const filePath = path.join(
    process.cwd(),
    "downloads",
    fileName
  );

  res.download(filePath, fileName, (err) => {
    if (err) {
      console.error("Download error:", err);
      return;
    }

    fs.unlink(filePath, (unlinkErr) => {
      if (unlinkErr) {
        console.error("Delete error:", unlinkErr);
      } else {
        console.log(`${fileName} deleted`);
      }
    });
  });
  } catch (error) {
    console.error(error.message)
   return res.status(500).json({
      message: error.message,
    })
  }
}