export function renderTimeline(slide, data) {
  // Background
  slide.background = { color: "FFFFFF" };

  // Title
  slide.addText(data.title, {
    x: 0.5,
    y: 0.25,
    w: 12.3,
    h: 0.4,
    fontSize: 24,
    bold: true,
    color: "1F2937",
    align: "center",
  });

  // Subtitle
  slide.addText(data.subtitle, {
    x: 0.8,
    y: 0.7,
    w: 11.7,
    h: 0.3,
    fontSize: 13,
    color: "6B7280",
    align: "center",
  });

  const startX = 1;
  const endX = 12.3;
  const lineY = 3.8;

  // Main timeline
  slide.addShape("line", {
    x: startX,
    y: lineY,
    w: endX - startX,
    h: 0,
    line: {
      color: "2563EB",
      pt: 2,
    },
  });

  const total = data.events.length;
  const gap = (endX - startX) / (total - 1);

  data.events.forEach((event, index) => {
    const x = startX + gap * index;

    // Circle
    slide.addShape("ellipse", {
      x: x - 0.08,
      y: lineY - 0.08,
      w: 0.16,
      h: 0.16,
      fill: { color: "2563EB" },
      line: { color: "2563EB" },
    });

    const top = index % 2 === 0;

    const boxY = top ? 1.4 : 4.1;
    const connectorY = top ? boxY + 1.1 : lineY;

    // Connector
    slide.addShape("line", {
      x,
      y: top ? connectorY : lineY,
      w: 0,
      h: top ? lineY - connectorY : boxY - lineY,
      line: {
        color: "94A3B8",
        pt: 1,
      },
    });

    // Card
    slide.addShape("roundRect", {
      x: x - 0.7,
      y: boxY,
      w: 1.4,
      h: 1.1,
      radius: 0.05,
      fill: {
        color: "F8FAFC",
      },
      line: {
        color: "CBD5E1",
        pt: 1,
      },
    });

    // Year
    slide.addText(event.yearRange, {
      x: x - 0.65,
      y: boxY + 0.05,
      w: 1.3,
      h: 0.22,
      fontSize: 8,
      bold: true,
      color: "2563EB",
      align: "center",
      fit: "shrink",
    });

    // Description
    slide.addText(event.description, {
      x: x - 0.62,
      y: boxY + 0.28,
      w: 1.24,
      h: 0.72,
      fontSize: 7,
      color: "374151",
      fit: "shrink",
      valign: "mid",
      margin: 0.03,
      breakLine: true,
    });
  });
}