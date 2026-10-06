export type Template = {
  id: string;
  name: string;
  short: string;
  blurb: string;
  url: string;
  tags: string[];
  palette: string[];
  vibe: string;
  /** Full-size WebP for the preview modal (relative to site base) */
  desktop: string;
  mobile: string;
  /** Small WebP thumbs for the cards */
  desktopThumb: string;
  mobileThumb: string;
};

/** Store paths WITHOUT base — App resolves with import.meta.env.BASE_URL */
const full = (name: string) => `shots/full/${name}.webp`;
const thumb = (name: string) => `shots/thumb/${name}.webp`;

export const templates: Template[] = [
  {
    id: "accurate",
    name: "Accurate Scene Render",
    short: "Accurate",
    blurb: "Cinematic 3D-render showcase for studios that sell the finish before the build.",
    url: "https://mohammedbagowabair.github.io/accurate-scene-render/",
    tags: ["Renders", "Portfolio", "Dark"],
    palette: ["#1a1a1a", "#c9a66b", "#f5f0e8"],
    vibe: "Cinematic · Render-first",
    desktop: full("accurate-desktop"),
    desktopThumb: thumb("accurate-desktop"),
    mobile: full("accurate-mobile"),
    mobileThumb: thumb("accurate-mobile"),
  },
  {
    id: "vista",
    name: "VISTA Studio",
    short: "VISTA",
    blurb: "High-contrast black / white / cobalt for studios that want a sharp graphic signature.",
    url: "https://mohammedbagowabair.github.io/VISTA-Studio-Website/",
    tags: ["Bold", "Architecture", "Cobalt"],
    palette: ["#0a0a0a", "#ffffff", "#2f5bff"],
    vibe: "Graphic · Point of view",
    desktop: full("vista-desktop"),
    desktopThumb: thumb("vista-desktop"),
    mobile: full("vista-mobile"),
    mobileThumb: thumb("vista-mobile"),
  },
  {
    id: "lumen",
    name: "LUMEN Atelier",
    short: "LUMEN",
    blurb: "Quiet-luxury charcoal, ivory and champagne — filtered work, materials, process.",
    url: "https://mohammedbagowabair.github.io/LUMEN-Atelier-Website/",
    tags: ["Quiet luxury", "Editorial", "Gold"],
    palette: ["#1c1b19", "#f4efe6", "#c4a574"],
    vibe: "Editorial · Soft gold",
    desktop: full("lumen-desktop"),
    desktopThumb: thumb("lumen-desktop"),
    mobile: full("lumen-mobile"),
    mobileThumb: thumb("lumen-mobile"),
  },
  {
    id: "kaleidos",
    name: "KALEIDOS",
    short: "KALEIDOS",
    blurb: "Plum, coral and acid lime — experimental colour for studios that refuse beige.",
    url: "https://mohammedbagowabair.github.io/KALEIDOS-Website/",
    tags: ["Colour", "Experimental", "Bold"],
    palette: ["#2a1840", "#ff6b4a", "#c8ff3d"],
    vibe: "Colour-led · Gallery",
    desktop: full("kaleidos-desktop"),
    desktopThumb: thumb("kaleidos-desktop"),
    mobile: full("kaleidos-mobile"),
    mobileThumb: thumb("kaleidos-mobile"),
  },
  {
    id: "clickdes",
    name: "ClickDes Portfolio",
    short: "ClickDes",
    blurb: "Clean designer portfolio layout — projects first, frictionless for independent studios.",
    url: "https://mohammedbagowabair.github.io/clickdes-website-design/portfolio/",
    tags: ["Portfolio", "Clean", "Designer"],
    palette: ["#111111", "#f7f7f5", "#888888"],
    vibe: "Portfolio · Minimal",
    desktop: full("clickdes-desktop"),
    desktopThumb: thumb("clickdes-desktop"),
    mobile: full("clickdes-mobile"),
    mobileThumb: thumb("clickdes-mobile"),
  },
  {
    id: "forma04",
    name: "FORMA/04",
    short: "FORMA/04",
    blurb: "Yellow / pink / blue studio system with strong type and a modular project grid.",
    url: "https://mohammedbagowabair.github.io/FORMA-04-Website/",
    tags: ["System", "Colour blocks", "Modern"],
    palette: ["#111111", "#f5e84a", "#ff6ad5"],
    vibe: "System · Pop accents",
    desktop: full("forma04-desktop"),
    desktopThumb: thumb("forma04-desktop"),
    mobile: full("forma04-mobile"),
    mobileThumb: thumb("forma04-mobile"),
  },
  {
    id: "atelier-forma",
    name: "Atelier Forma",
    short: "Atelier Forma",
    blurb: "Warm cream, ink and terracotta — a studio feel that reads handmade, not template.",
    url: "https://mohammedbagowabair.github.io/Atelier-Forma-Website/",
    tags: ["Warm", "Studio", "Terracotta"],
    palette: ["#2a211c", "#f3ebe0", "#c45c3e"],
    vibe: "Warm atelier · Craft",
    desktop: full("atelier-forma-desktop"),
    desktopThumb: thumb("atelier-forma-desktop"),
    mobile: full("atelier-forma-mobile"),
    mobileThumb: thumb("atelier-forma-mobile"),
  },
  {
    id: "maison-noor",
    name: "Maison Noor",
    short: "Maison Noor",
    blurb: "Espresso, limestone and brass with bilingual mark — built as a client-pitch studio site.",
    url: "https://mohammedbagowabair.github.io/Maison-Noor-Website/",
    tags: ["Bilingual", "Pitch", "Brass"],
    palette: ["#2c2118", "#f0e6d8", "#b8956c"],
    vibe: "Pitch-ready · نور",
    desktop: full("maison-noor-desktop"),
    desktopThumb: thumb("maison-noor-desktop"),
    mobile: full("maison-noor-mobile"),
    mobileThumb: thumb("maison-noor-mobile"),
  },
];
