import pptxgen from "pptxgenjs";

export async function pptGenService(presentation) {
  const pptx = new pptxgen();

  pptx.layout = "LAYOUT_WIDE"; // 16:9

  presentation.slides.forEach((item) => {
    const slide = pptx.addSlide();

    // Title
    slide.addText(item.title, {
      x: 0.5,
      y: 0.3,
      w: 8.5,
      h: 0.5,
      fontSize: 22,
      bold: true,
      align: "center",
    });

    // Bullets (left side)
    slide.addText(
      item.bullets.map((b) => `• ${b}`).join("\n"),
      {
        x: 0.5,
        y: 1,
        w: 6,
        h: 4,
        fontSize: 16,
        breakLine: false,
      }
    );

    // Image (right side)
    slide.addImage({
      path: item.imageQuery, // apni image ka path
      x: 7,
      y: 1,
      w: 2.8,
      h: 2.8,
    });
  });

  await pptx.writeFile({
    fileName: "presentation.pptx",
  });

  console.log("PPT generated successfully");
}