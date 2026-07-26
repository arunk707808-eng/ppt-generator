export function renderSummary(slide, data) {
  slide.background = {
    color: "FFFFFF",
  };

  // Title
  slide.addText(data.title, {
    x: 0.6,
    y: 0.35,
    w: 12,
    h: 0.4,
    fontSize: 24,
    bold: true,
    color: "1F2937",
    align: "center",
  });

  // Section Heading
  slide.addText("Key Takeaways", {
    x: 0.8,
    y: 1,
    w: 5,
    h: 0.3,
    fontSize: 18,
    bold: true,
    color: "2563EB",
  });

  // Bullets
  const bullets = data.keyTakeaways.map(item => ({
    text: item,
    options: {
      bullet: {
        indent: 18
      }
    }
  }));

  slide.addText(bullets, {
    x: 0.9,
    y: 1.4,
    w: 7,
    h: 4.8,
    fontSize: 16,
    color: "374151",
    breakLine: true,
    margin: 0.08,
    valign: "top",
  });

  // Image
  if (data.imagePath) {
    slide.addImage({
      path: data.imagePath,
      x: 8.4,
      y: 1.5,
      w: 4.2,
      h: 4.2,
    });
  }

  // Bottom Accent Line
  slide.addShape("line", {
    x: 0.6,
    y: 6.9,
    w: 12,
    h: 0,
    line: {
      color: "2563EB",
      pt: 2,
    },
  });
}