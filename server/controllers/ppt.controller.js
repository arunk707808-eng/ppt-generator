import { aiService } from "../services/aiService.js"
import { pixelsApiService } from "../services/pixelsApiService.js";
import { pptGenService } from "../services/pptGenService.js";

export const pptGen = async(req, res)=>{
  try {
    const {topic, slides} = req.body
    const aiResponse = await aiService(topic, slides)
    const cleanJson = aiResponse
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();
    const presentation = JSON.parse(cleanJson);
    console.log(presentation)

    for (const item of presentation.slides) {
  const image = await pixelsApiService(item.imageQuery);
  item.imageQuery = image
}

    await pptGenService(presentation);
    res.json({
      presentation
    })
  } catch (error) {
    
  }
}