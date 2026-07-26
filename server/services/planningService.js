import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function planningService(topic, slideCount) {
  try {
    const prompt = `
You are a world-class presentation strategist and planner.

Your ONLY responsibility is to PLAN the presentation.

Do NOT generate slide content.

Topic:
"${topic}"

Required Slides:
${slideCount}

Instructions:

1. Analyze the topic carefully.
2. Create the most logical presentation flow.
3. Divide the topic into exactly ${slideCount} slides.
4. Every slide must explain a different concept.
5. Avoid repeating ideas.
6. Generate an engaging presentation title.
7. Generate a unique title for every slide.
8.Generate a suitable, clean and concise purpose for every slide.
9. Choose the most suitable and unique layoutType for every slide.
10. Do NOT generate:
   - bullet points
   - paragraphs
   - subtitles
   - speaker notes
   - image queries
   - descriptions

Allowed layoutType values ONLY:

- cover
- content
- timeline
- process
- comparison
- table
- chart
- summary
- image-focus
- quote

Layout Selection Rules:

- First slide should almost always use "cover".
- Last slide should almost always use "summary".
- Use "timeline" only when explaining events over time.
- Use "process" only for workflows or step-by-step explanations.
- Use "comparison" only when comparing concepts.
- Use "table" only when structured tabular data is required.
- Use "chart" only when statistics or numerical trends are involved.
- Use "image-focus" only when a large visual is the primary element.
- Otherwise use "content".

Return ONLY valid JSON.

Expected JSON:

{
  "presentationTitle": "",
  "slides": [
    {
      "slideNumber": 1,
      "purpose": "",
      "title": "",
      "layoutType": ""
    }
  ]
}

Return RAW JSON only.

No markdown.
No code blocks.
No explanations.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Planning Service Error");
    console.error(error.response?.data || error.message);

    throw new Error("Failed to generate presentation plan.");
  }
}