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