import sharp from "sharp";
import { readdirSync, mkdirSync, existsSync, statSync, readFileSync, writeFileSync } from "node:fs";
import { join, extname, basename } from "node:path";
import { createHash } from "node:crypto";

const SRC = "public/portfolio";
const OUT = "public/portfolio/thumb";
const WIDTH = 700;
const QUALITY = 78;

mkdirSync(OUT, { recursive: true });

const slug = (s) =>
  s.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9]+/g, "_").replace(/^_+|_+$/g, "");

const guessCategory = (name) => {
  const n = name.toLowerCase();
  if (/(eagle|bird|monkey|wildlife|tiger|lion|deer)/.test(n)) return "wildlife";
  if (/(mig|moto|race|car|bike|auto)/.test(n)) return "automotive";
  if (/(portrait|3308|3311|0746|20240116)/.test(n)) return "portrait";
  return "events";
};

const files = readdirSync(SRC)
  .filter((f) => [".jpg", ".jpeg", ".png"].includes(extname(f).toLowerCase()))
  .filter((f) => statSync(join(SRC, f)).isFile())
  .sort();

const seen = new Map();
const entries = [];

for (const f of files) {
  const inPath = join(SRC, f);
  const buf = readFileSync(inPath);
  const hash = createHash("md5").update(buf).digest("hex");
  if (seen.has(hash)) {
    console.log("dup skip", f, "→", seen.get(hash));
    continue;
  }
  const outName = slug(f) + ".webp";
  const outPath = join(OUT, outName);
  seen.set(hash, outName);
  if (!existsSync(outPath)) {
    try {
      await sharp(inPath, { failOn: "none" })
        .rotate()
        .resize({ width: WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outPath);
      console.log("ok", outName);
    } catch (e) {
      console.log("FAIL", f, e.message);
      continue;
    }
  } else {
    console.log("skip", outName);
  }
  entries.push({ file: outName, alt: basename(f, extname(f)), category: guessCategory(f) });
}

writeFileSync("scripts/thumbs-manifest.json", JSON.stringify(entries, null, 2));
console.log(`\n${entries.length} unique images.`);
