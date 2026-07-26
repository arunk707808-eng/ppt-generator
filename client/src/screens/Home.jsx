import { useEffect, useState } from "react";
import { apiServer } from "../config/api.js";

const suggestions = [
  // "Quarterly Business Review",
  // "Market Entry Strategy",
  // "Product Launch",
];

function LeafMark() {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true">
      <path
        d="M14 23V5M14 17C8.7 17 5 13.8 5 8.5c5.3 0 9 3.2 9 8.5ZM14 14c4.8 0 8.4-3.2 8.4-8.4C17.6 5.6 14 9.1 14 14Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3v11m0 0 4-4m-4 4-4-4M5 17v3h14v-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const Home = () => {
  const [topic, setTopic] = useState("");
  const [slides, setSlides] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [generatedDeck, setGeneratedDeck] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!generatedDeck) return;

    document.getElementById("preview-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [generatedDeck]);

  const generatePresentation = async () => {
    const cleanTopic = topic.trim();

    if (!cleanTopic) {
      setError("Enter a presentation topic to generate your deck.");
      return;
    }

    setError("");
    setGeneratedDeck(null);
    setIsGenerating(true);

    try {
      const response = await fetch(`${apiServer}/api/ppt/preview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: cleanTopic,
          slides,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));

        throw new Error(
          data.message ||
            "Unable to generate the presentation. Please try again."
        );
      }

      const result = await response.json();
      console.log("Generated Presentation Preview:", result);

      if (!Array.isArray(result?.presentation?.slides) || !result.downloadUrl) {
        throw new Error(
          "The server returned an incomplete presentation preview."
        );
      }

      setGeneratedDeck({
        topic: cleanTopic,
        slides,
        presentation: result.presentation,
        downloadUrl: result.downloadUrl,
      });
    } catch (requestError) {
      setError(
        requestError.message ||
          "Unable to generate the presentation. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadPresentation = () => {
    if (!generatedDeck) return;

    window.location.assign(`${apiServer}${generatedDeck.downloadUrl}`);
  };

  const generateAndDownloadPresentation = async () => {
    const cleanTopic = topic.trim();

    if (!cleanTopic) {
      setError("Enter a presentation topic to download your deck.");
      return;
    }

    setError("");
    setIsDownloading(true);

    try {
      const response = await fetch(`${apiServer}/api/ppt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: cleanTopic, slides }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(
          data.message ||
            "Unable to generate the presentation. Please try again."
        );
      }

      const file = await response.blob();
      const contentDisposition =
        response.headers.get("content-disposition") || "";
      const fileName =
        contentDisposition.match(/filename="?([^";]+)"?/i)?.[1] ||
        "presentation.pptx";
      const downloadUrl = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(downloadUrl);
    } catch (requestError) {
      setError(
        requestError.message ||
          "Unable to generate the presentation. Please try again."
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <main>
      <section className="hero" id="generator">
        <div className="eyebrow">
          <span>✦</span> ENTERPRISE INTELLIGENCE V2.0
        </div>

        <h1>
          Generate Professional
          <br />
          Presentations in Seconds
        </h1>

        <p className="hero-copy">
          Transform your strategic ideas into high-impact slide decks instantly
          with our
          <br className="desktop-only" />
          neural design engine. Built for leaders who demand precision, speed,
          and
          <br className="desktop-only" />
          aesthetic excellence.
        </p>

        <div className="generator-card">
          <div className="fields">
            <label className="topic-field">
              PRESENTATION TOPIC
              <input
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                placeholder="e.g. 2025 Global Market Expansion Strategy"
                onKeyDown={(event) =>
                  event.key === "Enter" && generatePresentation()
                }
              />
            </label>

            <label className="select-field">
              SLIDES
              <select
                value={slides}
                onChange={(event) => setSlides(Number(event.target.value))}
              >
                {[3, 4, 5, 6, 7, 8, 9, 10, 12, 15].map((number) => (
                  <option key={number} value={number}>
                    {number} Slides
                  </option>
                ))}
              </select>
            </label>
          </div>
          {suggestions.length > 0 && (
            <div className="suggestions">
              <i>Try:</i>

              {suggestions?.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setTopic(item);
                    setError("");
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <div className="form-actions">
            <button
              className="generate-button"
              type="button"
              onClick={generatePresentation}
              disabled={isGenerating || isDownloading}
            >
              <LeafMark />
              {isGenerating
                ? "Generating presentation…"
                : "Generate Presentation"}
            </button>
            <button
              className="download-button active-download direct-download-button"
              type="button"
              onClick={generateAndDownloadPresentation}
              disabled={isGenerating || isDownloading}
            >
              <DownloadIcon />
              {isDownloading
                ? "Preparing download…"
                : "Generate & Download PPTX"}
            </button>
          </div>
        </div>
      </section>

      {generatedDeck && (
        <section
          className="preview-section"
          id="preview-section"
          aria-live="polite"
        >
          <div className="preview-heading">
            <div>
              <span className="eyebrow">PRESENTATION READY</span>
              <h2>{generatedDeck.topic}</h2>
            </div>

            <button
              className="download-button active-download"
              onClick={downloadPresentation}
            >
              <DownloadIcon />
              Download PPTX
            </button>
          </div>

          <p className="preview-copy">
            This preview uses the same titles, bullets, and images as the
            generated PowerPoint file.
          </p>

          <div className="preview-grid">
            {generatedDeck.presentation.slides.map((slide, index) => {
              const bullets = Array.isArray(slide.bullets) ? slide.bullets : [];

              return (
                <article
                  className="slide-preview"
                  key={`${slide.slideNumber ?? index}-${slide.title ?? "slide"}`}
                >
                  <h3>{slide.title || `Slide ${index + 1}`}</h3>

                  <div className="slide-body">
                    {bullets.length > 0 ? (
                      <ul>
                        {slide.bullets.map((bullet, bulletIndex) => (
                          <li key={bulletIndex}>{bullet}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>
                        {slide.subtitle ||
                          "Preview content is available in the downloaded deck."}
                      </p>
                    )}

                    {slide.imageQuery ? (
                      <img src={slide.imageQuery} alt="" />
                    ) : (
                      <div className="image-placeholder" />
                    )}
                  </div>

                  <em>{String(index + 1).padStart(2, "0")}</em>
                </article>
              );
            })}
          </div>
        </section>
      )}

      <section className="features" id="features">
        <article>
          <div className="feature-icon">▦</div>
          <h3>Executive Templates</h3>
          <p>
            Curated high-end designs tailored for high-stakes boardrooms and
            venture pitches.
          </p>
        </article>

        <article>
          <div className="feature-icon">ϟ</div>
          <h3>Neural PPT Generation</h3>
          <p>
            Go from strategic brief to investor-ready slide deck in under 60
            seconds.
          </p>
        </article>

        <article>
          <div className="feature-icon">⌄</div>
          <h3>Seamless Export</h3>
          <p>
            Download fully editable .pptx files with native asset compatibility.
          </p>
        </article>
      </section>
    </main>
  );
};

export default Home;
