import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateContent(topic, plan) {
  try {
    const prompt = `
You are a world-class presentation content writer.

You are given:

Topic:
"${topic}"

Presentation Plan:
${JSON.stringify(plan, null, 2)}

Your task is to generate the slide content ONLY.

IMPORTANT RULES:

- Do NOT change the presentation title.
- Do NOT change slide order.
- Do NOT change slide titles.
- Do NOT change layoutType.
- Follow the presentation plan exactly.

For each slide:

1. Keep the provided title.
2. Generate a short subtitle (1 sentence).
3. Generate 4-6 concise presentation-ready bullet points.
4. Every bullet should be informative.
5. Avoid repeating information from other slides.
6. Generate an imageQuery suitable for Pexels.
7. imageQuery should contain 4-8 realistic keywords.

Return ONLY valid JSON.

Expected JSON:

{
  "presentationTitle": "",
  "slides": [
    {
      "slideNumber": 1,
      "layoutType": "cover",
      "title": "",
      "subtitle": "",
      "bullets": [],
      "imageQuery": ""
    }
  ]
}

Return RAW JSON only.
No markdown.
No explanations.
No code fences.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Content API Error");
    console.error(error.response?.data || error.message);

    throw new Error("Failed to generate slide content.");
  }
}