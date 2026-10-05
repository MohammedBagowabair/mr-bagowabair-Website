import { useEffect, useMemo, useState } from "react";
import { site } from "./config";
import { templates, type Template } from "./templates";

const FILTERS = [
  "All",
  "Quiet luxury",
  "Bold",
  "Colour",
  "Portfolio",
  "Warm",
  "Pitch",
] as const;

function waLink(text: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

function mailLink(subject: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
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

  const openPreview = (t: Template) => {
    setActive(t);
    setMenuOpen(false);
  };

  return (
    <>
      <header className="site-header">
        <div className="wrap inner">
          <a className="brand" href="#top" aria-label="mr.bagowabair home">
            mr.<span>bagowabair</span>
          </a>
          <nav className="nav" aria-label="Primary">
            <a href="#templates">Templates</a>
            <a href="#offer">What you get</a>
            <a href="#process">Process</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="header-cta" href={waLink("Hi — I want a website like one of the mr.bagowabair templates.")}>
            WhatsApp
          </a>
          <button
            className="menu-btn"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
          </button>
        </div>
        <div className={`wrap mobile-nav${menuOpen ? " open" : ""}`}>
          <a href="#templates" onClick={() => setMenuOpen(false)}>Templates</a>
          <a href="#offer" onClick={() => setMenuOpen(false)}>What you get</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>Process</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <a href={waLink("Hi — I want a website like one of the mr.bagowabair templates.")}>WhatsApp</a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <p className="eyebrow">Interior website templates · Riyadh & worldwide</p>
              <h1>
                Show studios the site — <em>before</em> they commission one.
              </h1>
              <p className="hero-lead">
                {site.name} is a live library of premium interior-design website templates.
                Pick a direction, preview desktop & mobile screenshots, then open the live site and commission a branded build.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#templates">
                  Browse templates
                </a>
                <a
                  className="btn btn-ghost"
                  href={waLink("Hi Mohammed — I’d like to commission a site from mr.bagowabair.")}
                >
                  Start a project
                </a>
              </div>
            </div>
            <div className="hero-stats" aria-label="Highlights">
              <div className="stat">
                <strong>{templates.length}</strong>
                <span>Live templates</span>
              </div>
              <div className="stat">
                <strong>Desktop + mobile</strong>
                <span>Real screenshots</span>
              </div>
              <div className="stat">
                <strong>1 click</strong>
                <span>Open live site</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="templates">
          <div className="wrap">
            <div className="section-head">
              <div>
                <p className="eyebrow">Template library</p>
                <h2>Choose a look. Tap for screenshots & the live link.</h2>
              </div>
              <p>
                Each card uses real desktop and mobile captures. Click any template to review the screenshots —
                then open the live site in a new tab.
              </p>
            </div>

            <div className="filters" role="tablist" aria-label="Filter templates">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  role="tab"
                  aria-selected={filter === f}
                  className={`filter-pill${filter === f ? " active" : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="template-grid">
              {list.map((t) => (
                <button
                  key={t.id}
                  className="template-card"
                  onClick={() => openPreview(t)}
                  aria-label={`Preview ${t.name}`}
                >
                  <div className="mockup-stage">
                    <div className="laptop">
                      <img src={t.desktop} alt={`${t.name} desktop screenshot`} loading="lazy" />
                    </div>
                    <div className="phone">
                      <img src={t.mobile} alt={`${t.name} mobile screenshot`} loading="lazy" />
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="card-top">
                      <h3>{t.name}</h3>
                      <span className="card-vibe">{t.vibe}</span>
                    </div>
                    <p>{t.blurb}</p>
                    <div className="palette" aria-hidden="true">
                      {t.palette.map((c) => (
                        <span key={c} className="swatch" style={{ background: c }} />
                      ))}
                    </div>
                    <div className="tags">
                      {t.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="card-cta">
                      View screenshots <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="offer">
          <div className="wrap">
            <div className="offer">
              <div>
                <p className="eyebrow">For interior studios</p>
                <h2>A website that feels like your studio — not a generic builder theme.</h2>
                <p>
                  You send this page to prospects who don’t have a site yet. They see finished directions,
                  understand the quality bar, and choose a template to customise.
                </p>
              </div>
              <ul className="offer-list">
                <li>
                  <span className="check">✓</span>
                  <span>
                    <b>Branded build</b> from a chosen template — colours, type, projects, Arabic/English if needed.
                  </span>
                </li>
                <li>
                  <span className="check">✓</span>
                  <span>
                    <b>Mobile-first craft</b> — sticky CTAs, filterable work, process, FAQ, WhatsApp-ready contact.
                  </span>
                </li>
                <li>
                  <span className="check">✓</span>
                  <span>
                    <b>Deployed & handed over</b> on GitHub Pages or your domain, with editable content.
                  </span>
                </li>
                <li>
                  <span className="check">✓</span>
                  <span>
                    <b>Pitch-ready copy</b> so the site sells the studio before the first meeting.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section" id="process">
          <div className="wrap">
            <div className="section-head">
              <div>
                <p className="eyebrow">How it works</p>
                <h2>From template pick to live studio site.</h2>
              </div>
            </div>
            <div className="process">
              {[
                ["01", "Pick a direction", "Client chooses a template from this library that matches their vibe."],
                ["02", "Brand & content", "We swap logo, palette, projects, copy — bilingual optional."],
                ["03", "Polish & review", "Mobile pass, forms/WhatsApp, SEO basics, one revision round."],
                ["04", "Launch", "Deploy live, hand over access, and share the URL with their clients."],
              ].map(([n, title, body]) => (
                <article key={n} className="step">
                  <div className="step-num">{n}</div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="wrap">
            <div className="cta-band">
              <p className="eyebrow">Commission a build</p>
              <h2>Ready to put your studio online?</h2>
              <p>
                Tell me which template you like — or ask for a custom direction. Placeholders below:
                update email & WhatsApp in <code>src/config.ts</code>.
              </p>
              <div className="cta-actions">
                <a className="btn btn-primary" href={waLink("Hi — I’d like to build a site with mr.bagowabair.")}>
                  WhatsApp {site.whatsappDisplay}
                </a>
                <a className="btn btn-ghost" href={mailLink("Website from mr.bagowabair")}>
                  Email {site.email}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap inner">
          <div>
            <strong>{site.name}</strong> — interior website templates & design systems
          </div>
          <div>© {new Date().getFullYear()} · Built for studios that want to win the room</div>
        </div>
      </footer>

      <div className="mobile-bar" aria-label="Quick contact">
        <a className="wa" href={waLink("Hi — I want a website like one of the mr.bagowabair templates.")}>
          WhatsApp
        </a>
        <a className="mail" href={mailLink("Website from mr.bagowabair")}>
          Email
        </a>
      </div>

      {active && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActive(null);
          }}
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${active.name} screenshot preview`}
          >
            <div className="modal-bar">
              <div className="modal-title">
                <strong>{active.name}</strong>
                <span>{active.vibe}</span>
              </div>
              <div className="modal-actions">
                <a className="modal-open" href={active.url} target="_blank" rel="noreferrer">
                  Open live site ↗
                </a>
                <button className="close" aria-label="Close preview" onClick={() => setActive(null)}>
                  ✕
                </button>
              </div>
            </div>

            <div className="shot-preview">
              <p className="shot-note">
                You’re viewing desktop & mobile screenshots of this template.
                Use <strong>Open live site</strong> to browse the real page in a new tab.
              </p>

              <div className="shot-layout">
                <figure className="shot-desktop">
                  <figcaption>Desktop</figcaption>
                  <div className="shot-frame laptop-frame">
                    <img src={active.desktop} alt={`${active.name} desktop screenshot`} />
                  </div>
                </figure>
                <figure className="shot-mobile">
                  <figcaption>Mobile</figcaption>
                  <div className="shot-frame phone-frame">
                    <img src={active.mobile} alt={`${active.name} mobile screenshot`} />
                  </div>
                </figure>
              </div>

              <div className="shot-footer">
                <div className="shot-meta">
                  <div className="palette" aria-hidden="true">
                    {active.palette.map((c) => (
                      <span key={c} className="swatch" style={{ background: c }} />
                    ))}
                  </div>
                  <p>{active.blurb}</p>
                </div>
                <a className="btn btn-primary" href={active.url} target="_blank" rel="noreferrer">
                  Open live site ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
