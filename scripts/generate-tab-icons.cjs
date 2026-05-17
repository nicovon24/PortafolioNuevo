/**
 * Pads logo_black_circle on a light tile so it stays visible on dark browser chrome.
 * Run: node scripts/generate-tab-icons.cjs
 */
const path = require("path");
const sharp = require("sharp");

const root = path.join(__dirname, "..");
const input = path.join(root, "public/images/logo/logo_black_circle.png");
const outTab = path.join(root, "public/images/logo/logo_black_circle_tab.png");
const outApple = path.join(root, "public/images/logo/logo_black_circle_apple.png");

// Soft cool gray — reads as “icon tile”, not harsh white
const BG = { r: 232, g: 238, b: 245, alpha: 1 };

async function build(size, outputPath) {
  const margin = Math.max(4, Math.round(size * 0.1));
  const inner = size - margin * 2;
  const innerBuf = await sharp(input)
    .resize(inner, inner, { fit: "contain", background: BG })
    .flatten({ background: BG })
    .toBuffer();

  await sharp({
    create: { width: size, height: size, channels: 4, background: BG },
  })
    .composite([{ input: innerBuf, gravity: "center" }])
    .png()
    .toFile(outputPath);
}

(async () => {
  await build(48, outTab);
  await build(180, outApple);
  console.log("Wrote:", outTab, outApple);
})();
