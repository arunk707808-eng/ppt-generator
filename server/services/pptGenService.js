import path from "path";

import pptxgen from "pptxgenjs";
import { renderComparison } from "../pptLayouts/comparison.js";
import { renderContent } from "../pptLayouts/content.js";
import { renderCover } from "../pptLayouts/cover.js";
import { renderProcess } from "../pptLayouts/process.js";
import { renderSummary } from "../pptLayouts/summary.js";
import { renderTimeline } from "../pptLayouts/timeline.js";
import { renderTable } from "../pptLayouts/table.js";
import { renderChart } from "../pptLayouts/chart.js";
import { renderImageFocus } from "../pptLayouts/imageFocus.js";
import { renderQuote } from "../pptLayouts/quote.js";

export async function pptGenService(presentation) {
  const pptx = new pptxgen();

  pptx.layout = "LAYOUT_WIDE";

for (const slideData of presentation.slides) {
    const slide = pptx.addSlide();

    switch (slideData.layoutType) {
        case "cover":
            renderCover(slide, slideData);
            break;

        case "content":
            renderContent(slide, slideData);
            break;

        case "timeline":
            renderTimeline(slide, slideData);
            break;

        case "process":
            renderProcess(slide, slideData);
            break;

        case "comparison":
            renderComparison(slide, slideData);
            break;

        case "table":
            renderTable(slide, slideData);
            break;

        case "chart":
            renderChart(slide, slideData);
            break;

        case "summary":
            renderSummary(slide, slideData);
            break;

        case "image-focus":
            renderImageFocus(slide, slideData);
            break;

        case "quote":
            renderQuote(slide, slideData);
            break;

        default:
            renderContent(slide, slideData);
    }
}
 const fileName = `presentation-${Date.now()}.pptx`;

  await pptx.writeFile({
    fileName: path.join(process.cwd(), "downloads", fileName),
  });

  return fileName;
}