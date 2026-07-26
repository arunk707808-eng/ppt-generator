export function renderComparison(slide, data) {
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
  slide.addText(data.subtitle, {
    x: 0.7,
    y: 0.75,
    w: 12,
    h: 0.3,
    fontSize: 13,
    color: "6B7280",
    align: "center",
  });

  const tableRows = [
    data.comparisonData.headers,
    ...data.comparisonData.rows,
  ];

  slide.addTable(tableRows, {
    x: 0.4,
    y: 1.3,
    w: 12.4,
    h: 5.5,

    border: {
      type: "solid",
      pt: 1,
      color: "D1D5DB",
    },

    fill: "FFFFFF",

    color: "374151",

    fontSize: 11,

    bold: false,

    autoFit: true,

    margin: 0.08,

    rowH: 0.7,

    // Header styling
    fillHeader: "2563EB",
    colorHeader: "FFFFFF",
    boldHeader: true,
    align: "center",
    valign: "mid",
  });
}