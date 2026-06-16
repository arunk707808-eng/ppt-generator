import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function aiService(topic, slides) {
  try {
    const prompt = `
You are a world-class presentation consultant and slide designer.

Create a highly professional PowerPoint presentation on "${topic}".

Requirements:

- Generate exactly ${slides} slides.
- Slide 1: Executive Introduction
- Last Slide: Conclusion & Key Takeaways
- Remaining slides should follow a logical and engaging flow.

For each slide:

1. Create a professional slide title.
2. Provide 4-6 concise, presentation-ready bullet points.
3. Bullet points must be specific, informative, and non-repetitive.
4. Generate a detailed imageQuery optimized for Pexels stock photos.
5. imageQuery should be 4-8 words and describe a realistic professional image.

Return ONLY valid JSON in this format:

{
  "slides": [
    {
      "title": "",
      "bullets": [],
      "imageQuery": ""
    }
  ]
}

IMPORTANT:
- Return raw JSON only.
- No markdown.
- No explanations.
- No code blocks.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("aiService Error: ")
    console.error(error.response?.data || error.message);
    throw new Error("failed to create data for your topic. Try Again After 5 Min !")
  }
}