import { useEffect, useMemo, useState } from "react";
import { site } from "./config";
import { templates, type Template } from "./templates";

const FILTERS = ["All", "Quiet luxury", "Bold", "Colour", "Warm", "Portfolio"] as const;

function waLink(text: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export default function App() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [active, setActive] = useState<Template | null>(null);

  const list = useMemo(() => {
    if (filter === "All") return templates;
    const key = filter.toLowerCase();
    return templates.filter((t) =>
      t.tags.some((tag) => tag.toLowerCase().includes(key) || key.includes(tag.toLowerCase()))
    );
  }, [filter]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <>
      <header className="top">
        <a className="logo" href="#top" aria-label="mr.bagowabair home">
          <img className="logo-mark" src={`${import.meta.env.BASE_URL}logo.svg`} alt="" width={28} height={28} />
          <span className="logo-word">mr.<b>bagowabair</b></span>
        </a>
        <a className="top-wa" href={waLink("Hi — I want a website like one of your templates.")}>
          WhatsApp
        </a>
      </header>

      <main id="top">
        <section className="hero">
          <p className="kicker">Interior website templates</p>
          <h1>Pick a look. We brand it for your studio.</h1>
          <p className="lead">
            Live designs for interior studios — preview screenshots, open the real site, then message to build yours.
          </p>
        </section>

        <section className="library" aria-label="Templates">
          <div className="chips" role="tablist" aria-label="Filter">
            {FILTERS.map((f) => (
              <button
                key={f}
                role="tab"
                type="button"
                aria-selected={filter === f}
                className={filter === f ? "chip on" : "chip"}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid">
            {list.map((t) => (
              <article key={t.id} className="card">
                <button
                  type="button"
                  className="card-shot"
                  onClick={() => setActive(t)}
                  aria-label={`Preview ${t.name}`}
                >
                  <div className="desk">
                    <img src={t.desktop} alt="" loading="lazy" />
                  </div>
                  <div className="phone">
                    <img src={t.mobile} alt="" loading="lazy" />
                  </div>
                </button>
                <div className="card-meta">
                  <div>
                    <h2>{t.name}</h2>
                    <p>{t.vibe.replace(/\s*[·•]\s*/g, " · ")}</p>
                  </div>
                  <div className="card-actions">
                    <button type="button" className="btn ghost" onClick={() => setActive(t)}>
                      Preview
                    </button>
                    <a className="btn solid" href={t.url} target="_blank" rel="noreferrer">
                      Open live
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className="foot">
          <span>{site.name}</span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </main>

      <a
        className="sticky-wa"
        href={waLink("Hi — I’d like to commission a site from mr.bagowabair.")}
      >
        WhatsApp to build yours
      </a>

      {active && (
        <div
          className="backdrop"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActive(null);
          }}
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${active.name} preview`}
          >
            <div className="modal-head">
              <div>
                <strong>{active.name}</strong>
                <span>{active.vibe}</span>
              </div>
              <div className="modal-head-actions">
                <a className="btn solid" href={active.url} target="_blank" rel="noreferrer">
                  Open live site ↗
                </a>
                <button type="button" className="x" aria-label="Close" onClick={() => setActive(null)}>
                  ✕
                </button>
              </div>
            </div>

            <div className="modal-body">
              <p className="note">
                Desktop & mobile screenshots. Use <b>Open live site</b> to browse the real page in a new tab.
              </p>
              <div className="shots">
                <figure>
                  <figcaption>Desktop</figcaption>
                  <img src={active.desktop} alt={`${active.name} desktop`} />
                </figure>
                <figure className="m">
                  <figcaption>Mobile</figcaption>
                  <img src={active.mobile} alt={`${active.name} mobile`} />
                </figure>
              </div>
              <a className="btn solid wide" href={active.url} target="_blank" rel="noreferrer">
                Open live site ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
