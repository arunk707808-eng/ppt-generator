import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { aiService } from "../services/aiService.js";
import { pixelsApiService } from "../services/pixelsApiService.js";
import { pptGenService } from "../services/pptGenService.js";
import { planningService } from "../services/planningService.js";

const generatedPresentations = new Map();
const expiryMs = 30 * 60 * 1000;

async function createPresentation(topic, slides) {
  const plan = await planningService(topic, slides);
  
  const response = await aiService(topic,plan);
  console.log("response:->",response);
  process.exit(1)
  const presentation = JSON.parse(
    response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()
  );
  for (const slide of presentation.slides)
    slide.imageQuery = await pixelsApiService(slide.imageQuery);
  const fileName = await pptGenService(presentation);
  return {
    presentation,
    fileName,
    filePath: path.join(process.cwd(), "downloads", fileName),
  };
}

function removePresentation(id) {
  const item = generatedPresentations.get(id);
  if (!item) return;
  generatedPresentations.delete(id);
  fs.unlink(item.filePath, () => {});
}

// Existing direct-download API remains available for existing integrations.
export const pptGen = async (req, res) => {
  try {
    const generated = await createPresentation(req.body.topic, req.body.slides);
    res.download(generated.filePath, generated.fileName, () =>
      fs.unlink(generated.filePath, () => {})
    );
  } catch (requestError) {
    console.error(requestError.message);
    res.status(500).json({ message: requestError.message });
  }
};

export const createPreview = async (req, res) => {
  try {
    const { topic, slides } = req.body;
    if (!topic?.trim() || !Number.isInteger(Number(slides)))
      return res
        .status(400)
        .json({ message: "A topic and number of slides are required." });
    const generated = await createPresentation(topic.trim(), Number(slides));
    const id = randomUUID();
    generatedPresentations.set(id, generated);
    setTimeout(() => removePresentation(id), expiryMs).unref();
    return res
      .status(201)
      .json({
        id,
        presentation: generated.presentation,
        downloadUrl: `/api/ppt/${id}/download`,
      });
  } catch (requestError) {
    console.error(requestError.message);
    return res.status(500).json({ message: requestError.message });
  }
};

export const downloadPreview = (req, res) => {
  const generated = generatedPresentations.get(req.params.id);
  if (!generated)
    return res
      .status(404)
      .json({
        message: "This presentation has expired. Please generate it again.",
      });
  res.download(generated.filePath, generated.fileName, () =>
    removePresentation(req.params.id)
  );
};
