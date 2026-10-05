import { useEffect, useMemo, useState } from "react";
import { site } from "./config";
import { templates, type Template } from "./templates";

const FILTERS = ["All", "Quiet luxury", "Bold", "Colour", "Warm", "Portfolio"] as const;

type PreviewTab = "live" | "shots";

function waLink(text: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

function shotSrc(path: string) {
  // Always resolve against Vite BASE_URL (e.g. /mr-bagowabair-Website/)
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const base = import.meta.env.BASE_URL || "/";
  const cleaned = path.replace(/^\/+/, "");
  return `${base}${cleaned}`.replace(/([^:]\/)\/+/g, "$1");
}

export default function App() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [active, setActive] = useState<Template | null>(null);
  const [tab, setTab] = useState<PreviewTab>("live");
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeFailed, setIframeFailed] = useState(false);

  const list = useMemo(() => {
    if (filter === "All") return templates;
    const key = filter.toLowerCase();
    return templates.filter((t) =>
      t.tags.some((tag) => tag.toLowerCase().includes(key) || key.includes(tag.toLowerCase()))
    );
  }, [filter]);

  const openPreview = (t: Template) => {
    setActive(t);
    setTab("live");
    setIframeLoaded(false);
    setIframeFailed(false);
  };

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.body.style.overflow = "hidden";
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  // If live iframe stalls, surface shots tab automatically
  useEffect(() => {
    if (!active || tab !== "live" || iframeLoaded || iframeFailed) return;
    const t = window.setTimeout(() => {
      if (!iframeLoaded) setIframeFailed(true);
    }, 8000);
    return () => window.clearTimeout(t);
  }, [active, tab, iframeLoaded, iframeFailed]);

  const desktopSrc = active ? shotSrc(active.desktop) : "";
  const mobileSrc = active ? shotSrc(active.mobile) : "";

  return (
    <>
      <header className="top">
        <a className="logo" href="#top" aria-label="mr.bagowabair home">
          <img className="logo-mark" src={shotSrc("logo.svg")} alt="" width={28} height={28} />
          <span className="logo-word">
            mr.<b>bagowabair</b>
          </span>
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
            Live designs for interior studios — preview here, open the real site, then message to build yours.
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
                  onClick={() => openPreview(t)}
                  aria-label={`Preview ${t.name}`}
                >
                  <div className="desk">
                    <img src={shotSrc(t.desktop)} alt="" loading="lazy" />
                  </div>
                  <div className="phone">
                    <img src={shotSrc(t.mobile)} alt="" loading="lazy" />
                  </div>
                </button>
                <div className="card-meta">
                  <div>
                    <h2>{t.name}</h2>
                    <p>{t.vibe.replace(/\s*[·•]\s*/g, " · ")}</p>
                  </div>
                  <div className="card-actions">
                    <button type="button" className="btn ghost" onClick={() => openPreview(t)}>
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
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-head">
              <div>
                <strong>{active.name}</strong>
                <span>{active.vibe}</span>
              </div>
              <div className="modal-head-actions">
                <a className="btn solid" href={active.url} target="_blank" rel="noreferrer">
                  Open live ↗
                </a>
                <button type="button" className="x" aria-label="Close" onClick={() => setActive(null)}>
                  ✕
                </button>
              </div>
            </div>

            <div className="tabs" role="tablist" aria-label="Preview mode">
              <button
                type="button"
                role="tab"
                aria-selected={tab === "live"}
                className={tab === "live" ? "tab on" : "tab"}
                onClick={() => setTab("live")}
              >
                Live site
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === "shots"}
                className={tab === "shots" ? "tab on" : "tab"}
                onClick={() => setTab("shots")}
              >
                Screenshots
              </button>
            </div>

            <div className="modal-body">
              {tab === "live" ? (
                <div className="live-wrap">
                  {!iframeLoaded && !iframeFailed && <div className="live-status">Loading live preview…</div>}
                  {iframeFailed && (
                    <div className="live-status warn">
                      Live embed is slow or blocked.{" "}
                      <button type="button" className="linkish" onClick={() => setTab("shots")}>
                        View screenshots
                      </button>{" "}
                      or{" "}
                      <a href={active.url} target="_blank" rel="noreferrer">
                        open live site ↗
                      </a>
                    </div>
                  )}
                  <iframe
                    key={active.id}
                    className="live-frame"
                    title={`${active.name} live preview`}
                    src={active.url}
                    loading="eager"
                    referrerPolicy="no-referrer-when-downgrade"
                    onLoad={() => {
                      setIframeLoaded(true);
                      setIframeFailed(false);
                    }}
                    onError={() => setIframeFailed(true)}
                  />
                </div>
              ) : (
                <>
                  <div className="shots">
                    <figure>
                      <figcaption>Desktop</figcaption>
                      <img
                        src={desktopSrc}
                        alt={`${active.name} desktop`}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).classList.add("broken");
                        }}
                      />
                    </figure>
                    <figure className="m">
                      <figcaption>Mobile</figcaption>
                      <img
                        src={mobileSrc}
                        alt={`${active.name} mobile`}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).classList.add("broken");
                        }}
                      />
                    </figure>
                  </div>
                  <a className="btn solid wide" href={active.url} target="_blank" rel="noreferrer">
                    Open live site ↗
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
