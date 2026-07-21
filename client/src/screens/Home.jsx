import { useState } from "react";
import { server } from "../main.jsx";

const suggestions = ["Quarterly Business Review", "Market Entry Strategy", "Product Launch"];

function LeafMark() {
  return <svg viewBox="0 0 28 28" aria-hidden="true"><path d="M14 23V5M14 17C8.7 17 5 13.8 5 8.5c5.3 0 9 3.2 9 8.5ZM14 14c4.8 0 8.4-3.2 8.4-8.4C17.6 5.6 14 9.1 14 14Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

function DownloadIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v11m0 0 4-4m-4 4-4-4M5 17v3h14v-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

const Home = () => {
  const [topic, setTopic] = useState("");
  const [slides, setSlides] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDeck, setGeneratedDeck] = useState(null);
  const [error, setError] = useState("");

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
      const response = await fetch(`${server}/api/ppt/preview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: cleanTopic, slides }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Unable to generate the presentation. Please try again.");
      }
      const result = await response.json();
      setGeneratedDeck({ topic: cleanTopic, slides, presentation: result.presentation, downloadUrl: result.downloadUrl });
    } catch (requestError) {
      setError(requestError.message || "Unable to generate the presentation. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadPresentation = () => {
    if (!generatedDeck) return;
    window.location.assign(`${server}${generatedDeck.downloadUrl}`);
  };

  return <main>
    <section className="hero" id="generator">
      <div className="eyebrow"><span>✦</span> ENTERPRISE INTELLIGENCE V2.0</div>
      <h1>Generate Professional<br/>Presentations in Seconds</h1>
      <p className="hero-copy">Transform your strategic ideas into high-impact slide decks instantly with our<br className="desktop-only"/> neural design engine. Built for leaders who demand precision, speed, and<br className="desktop-only"/> aesthetic excellence.</p>

      <div className="generator-card">
        <div className="fields">
          <label className="topic-field">PRESENTATION TOPIC
            <input value={topic} onChange={(event) => setTopic(event.target.value)} placeholder="e.g. 2025 Global Market Expansion Strategy" onKeyDown={(event) => event.key === "Enter" && generatePresentation()} />
          </label>
          <label className="select-field">SLIDES
            <select value={slides} onChange={(event) => setSlides(Number(event.target.value))}>
              {[5, 6, 7, 8, 9, 10, 12, 15].map((number) => <option key={number} value={number}>{number} Slides</option>)}
            </select>
          </label>
        </div>
        <div className="suggestions"><i>Try:</i>{suggestions.map((item) => <button key={item} onClick={() => { setTopic(item); setError(""); }} type="button">{item}</button>)}</div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="form-actions">
          <button className="generate-button" type="button" onClick={generatePresentation} disabled={isGenerating}>
            <LeafMark />{isGenerating ? "Generating presentation…" : "Generate Presentation"}
          </button>
          <button className="download-button" type="button" onClick={downloadPresentation} disabled={!generatedDeck || isGenerating}>
            <DownloadIcon /> Download PPT
          </button>
        </div>
      </div>
    </section>

    {generatedDeck && <section className="preview-section" aria-live="polite">
      <div className="preview-heading"><div><span className="eyebrow">PRESENTATION READY</span><h2>{generatedDeck.topic}</h2></div><button className="download-button active-download" onClick={downloadPresentation}><DownloadIcon /> Download PPTX</button></div>
      <p className="preview-copy">This preview uses the same titles, bullets, and images as the generated PowerPoint file.</p>
      <div className="preview-grid">
        {generatedDeck.presentation.slides.map((slide, index) => <article className="slide-preview" key={`${slide.title}-${index}`}>
          <h3>{slide.title}</h3><div className="slide-body"><ul>{slide.bullets.map((bullet, bulletIndex) => <li key={bulletIndex}>{bullet}</li>)}</ul>{slide.imageQuery ? <img src={slide.imageQuery} alt="" /> : <div className="image-placeholder" />}</div><em>{String(index + 1).padStart(2, "0")}</em>
        </article>)}
      </div>
    </section>}

    <section className="trust-section">
      <p>EMPOWERING TEAMS AT WORLD-CLASS ORGANIZATIONS</p>
      <div className="logos"><span>▦ Lumina</span><span>◈ Vertex</span><span>✣ Nexus</span><span>◉ Equinox</span><span>△ Aether</span></div>
    </section>
    <section className="features" id="features">
      <article><div className="feature-icon">▦</div><h3>Executive Templates</h3><p>Curated high-end designs tailored for high-stakes boardrooms and venture pitches.</p></article>
      <article><div className="feature-icon">ϟ</div><h3>Neural PPT Generation</h3><p>Go from strategic brief to investor-ready slide deck in under 60 seconds.</p></article>
      <article><div className="feature-icon">⌄</div><h3>Seamless Export</h3><p>Download fully editable .pptx files with native asset compatibility.</p></article>
    </section>
  </main>;
};

export default Home;
