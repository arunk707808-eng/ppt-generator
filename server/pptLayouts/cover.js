export function renderCover(slide, data) {
  // Background Image
  slide.addImage({
    path: data.imagePath,
    x: 0,
    y: 0,
    w: 13.333,
    h: 7.5,
  });

  // Dark overlay for better readability
  slide.addShape("rect", {
    x: 0,
    y: 0,
    w: 13.333,
    h: 7.5,
    fill: {
      color: "000000",
      transparency: 45,
    },
    line: {
      color: "000000",
      transparency: 100,
    },
  });

  // Border Box
  slide.addShape("rect", {
    x: 1.3,
    y: 2.6,
    w: 10.7,
    h: 2.1,
    fill: {
      color: "FFFFFF",
      transparency: 100,
    },
    line: {
      color: "FFFFFF",
      width: 2,
    },
  });

  // Presentation Title
  slide.addText(data.title, {
    x: 1.5,
    y: 3.1,
    w: 10.3,
    h: 0.6,
    align: "center",
    fontFace: "Aptos",
    fontSize: 28,
    bold: true,
    color: "FFFFFF",
    fit: "shrink",
  });
}