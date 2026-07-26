export function renderContent(slide, data) {

  // Title
  slide.addText(data.title, {
    x: 0.5,
    y: 0.3,
    w: 12.3,
    h: 0.4,
    fontSize: 24,
    bold: true,
    color: "1F2937"
  });

  // Subtitle
  slide.addText(data.subtitle, {
    x: 0.5,
    y: 0.75,
    w: 12,
    h: 0.4,
    fontSize: 14,
    color: "666666"
  });

  // Bullets
  slide.addText(
    data.bullets.map(item => ({
      text: item,
      options: { bullet: { indent: 18 } }
    })),
    {
      x: 0.6,
      y: 1.4,
      w: 6,
      h: 5.5,
      fontSize: 18,
      color: "333333",
      breakLine: true,
      margin: 0.08,
      valign: "top"
    }
  );

  // Image
  if (data.imagePath) {
    slide.addImage({
      path: data.imagePath,
      x: 7,
      y: 1.4,
      w: 5.6,
      h: 4.8
    });
  }
}