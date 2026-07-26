export function renderProcess(slide, data) {

  slide.background = {
    color: "FFFFFF",
  };

  // Title
  slide.addText(data.title, {
    x: 0.5,
    y: 0.3,
    w: 12.3,
    h: 0.4,
    fontSize: 24,
    bold: true,
    color: "1F2937",
    align: "center",
  });

  // Subtitle
  slide.addText(data.subtitle || "", {
    x: 0.8,
    y: 0.75,
    w: 11.8,
    h: 0.3,
    fontSize: 13,
    color: "6B7280",
    align: "center",
  });

  const count = data.steps.length;

  const totalWidth = 11.5;
  const startX = 0.8;
  const boxWidth = 2;
  const gap = (totalWidth - (boxWidth * count)) / (count - 1);

  data.steps.forEach((step, index) => {

    const x = startX + index * (boxWidth + gap);
    const y = 2;

    // Card
    slide.addShape("roundRect", {
      x,
      y,
      w: boxWidth,
      h: 2.2,
      fill: {
        color: "EFF6FF"
      },
      line: {
        color: "2563EB",
        pt: 1.5
      }
    });

    // Number Circle
    slide.addShape("ellipse", {
      x: x + 0.72,
      y: y - 0.28,
      w: 0.55,
      h: 0.55,
      fill: {
        color: "2563EB"
      },
      line: {
        color: "2563EB"
      }
    });

    slide.addText(String(index + 1).padStart(2, "0"), {
      x: x + 0.74,
      y: y - 0.2,
      w: 0.5,
      h: 0.2,
      fontSize: 10,
      bold: true,
      color: "FFFFFF",
      align: "center",
    });

    // Step Title
    slide.addText(step.title, {
      x: x + 0.1,
      y: y + 0.4,
      w: 1.8,
      h: 0.3,
      fontSize: 15,
      bold: true,
      align: "center",
      color: "1F2937",
      fit: "shrink",
    });

    // Description
    slide.addText(step.description, {
      x: x + 0.12,
      y: y + 0.85,
      w: 1.76,
      h: 0.9,
      fontSize: 10,
      color: "4B5563",
      align: "center",
      valign: "mid",
      fit: "shrink",
    });

    // Arrow
    if (index < count - 1) {

      slide.addShape("chevron", {
        x: x + boxWidth + 0.05,
        y: y + 0.8,
        w: 0.45,
        h: 0.4,
        fill: {
          color: "2563EB"
        },
        line: {
          color: "2563EB"
        }
      });

    }

  });

  // Optional Image
  if (data.imagePath) {

    slide.addImage({
      path: data.imagePath,
      x: 4.8,
      y: 5.1,
      w: 3.5,
      h: 1.8
    });

  }

}