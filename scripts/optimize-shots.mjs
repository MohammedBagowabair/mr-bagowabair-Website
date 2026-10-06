// Converts source PNG screenshots (shots-src/) into lightweight WebP files:
//   public/shots/thumb/*.webp  -> card thumbnails (desktop 720w, mobile 240w)
//   public/shots/full/*.webp   -> preview modal (desktop 1440w, mobile 390w)
// Run: node scripts/optimize-shots.mjs
import sharp from "sharp";
import { mkdirSync, readdirSync, statSync } from "node:fs";
import { join, basename } from "node:path";

const SRC = "shots-src";
const OUT = "public/shots";
mkdirSync(join(OUT, "thumb"), { recursive: true });
mkdirSync(join(OUT, "full"), { recursive: true });

const kb = (p) => Math.round(statSync(p).size / 1024);
let before = 0, after = 0;

for (const file of readdirSync(SRC).filter((f) => f.endsWith(".png"))) {
  const name = basename(file, ".png");
  const src = join(SRC, file);
  const isMobile = name.endsWith("-mobile");
  before += kb(src);

  const thumb = join(OUT, "thumb", `${name}.webp`);
  const full = join(OUT, "full", `${name}.webp`);

  if (isMobile) {
    // card phone frame is ~110px wide -> 240w covers 2x DPR
    await sharp(src).resize({ width: 240, height: 480, fit: "cover", position: "top" }).webp({ quality: 72, effort: 6 }).toFile(thumb);
    await sharp(src).resize({ width: 390, withoutEnlargement: true }).webp({ quality: 78, effort: 6 }).toFile(full);
  } else {
    // card desktop frame is ~360-520px wide -> 720w covers 2x on phones
    await sharp(src).resize({ width: 720, height: 450, fit: "cover", position: "top" }).webp({ quality: 70, effort: 6 }).toFile(thumb);
    await sharp(src).resize({ width: 1440, withoutEnlargement: true }).webp({ quality: 76, effort: 6 }).toFile(full);
  }
  after += kb(thumb) + kb(full);
  console.log(`${name}: ${kb(src)}KB png -> thumb ${kb(thumb)}KB, full ${kb(full)}KB`);
}
console.log(`TOTAL png ${before}KB -> webp ${after}KB`);
