import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv"
dotenv.config()

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function aiService(topic, slides) {
try{
  const prompt = `
Create a professional PowerPoint presentation on "${topic}".

Requirements:
- Total slides: ${slides}
- First slide should be introduction.
- Last slide should be conclusion.
- Each slide should contain 3-5 bullet points.
- For each slide provide an image search keyword.

Return ONLY valid JSON.

{
  "slides": [
    {
      "title": "",
      "bullets": [],
      "imageQuery": ""
    }
  ]
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
  } catch (error) {
    console.error(error)
  }
}