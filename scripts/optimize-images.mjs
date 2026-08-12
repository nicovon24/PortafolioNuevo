import sharp from "sharp";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = "public/images";

// Ancho maximo util segun donde se muestra cada familia de imagenes.
function targetWidth(file) {
  if (file.includes("/company/")) return 256;   // logos a 44px
  if (file.includes("/profile/")) return 900;   // foto del hero (LCP)
  return 1600;                                  // screenshots: lightbox a 100vw
}

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (/\.(png|jpe?g)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

const files = await walk(ROOT);
let before = 0;
let after = 0;
let changed = 0;

for (const file of files) {
  const rel = file.split(path.sep).join("/");
  // Leer a buffer: en Windows, sharp(path) deja el archivo bloqueado y no se puede sobrescribir.
  const source = await readFile(file);
  const original = source.length;
  before += original;

  const meta = await sharp(source).metadata();
  const max = targetWidth(rel);

  let pipeline = sharp(source);
  if (meta.width && meta.width > max) pipeline = pipeline.resize({ width: max, withoutEnlargement: true });

  const isPng = /\.png$/i.test(file);
  const buf = isPng
    ? await pipeline.png({ compressionLevel: 9, palette: true, quality: 82, effort: 9 }).toBuffer()
    : await pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer();

  if (buf.length < original * 0.95) {
    await writeFile(file, buf);
    after += buf.length;
    changed++;
    const pct = Math.round((1 - buf.length / original) * 100);
    if (original > 300_000) {
      console.log(`${rel}  ${(original / 1e6).toFixed(2)}MB -> ${(buf.length / 1e6).toFixed(2)}MB  (-${pct}%)`);
    }
  } else {
    after += original;
  }
}

console.log(`\n${changed}/${files.length} recomprimidas`);
console.log(`Total: ${(before / 1e6).toFixed(1)}MB -> ${(after / 1e6).toFixed(1)}MB  (-${Math.round((1 - after / before) * 100)}%)`);
