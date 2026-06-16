import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

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
3. Bullet points must be:
   - Specific and informative
   - Suitable for business, academic, and professional presentations
   - Free from repetition
   - Short enough to fit comfortably on a slide

4. Generate a highly detailed imageQuery for stock photo websites like Pexels.
   The imageQuery should:
   - Describe a realistic professional photo
   - Include relevant context
   - Be 4-8 words long
   - Avoid generic terms
   - Be optimized for finding high-quality images

Examples:

Topic: Artificial Intelligence

Bad imageQuery:
"AI"

Good imageQuery:
"artificial intelligence business analytics dashboard"

Bad imageQuery:
"technology"

Good imageQuery:
"modern data center servers technology"

Bad imageQuery:
"team"

Good imageQuery:
"corporate team meeting strategy discussion"

Presentation Style:

- Professional
- Modern
- Corporate quality
- Visually appealing
- Suitable for executives, students, educators, and business audiences

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

IMPORTANT:
- Return raw JSON only.
- No markdown.
- No explanations.
- No code blocks.
- Ensure valid parsable JSON.
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(
      error.response?.data || error.message
    );
    throw error;
  }
}