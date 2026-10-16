/**
 * Generate the PWA icons into public/icons.
 *
 * Run with: node scripts/make-icons.mjs
 *
 * Hand-rolled rather than pulled in as a dependency: the project ships with no
 * runtime dependencies and no image toolchain, and all the manifest needs is a
 * flat green mark with one white check. PNG is small enough to write directly
 * (zlib is in the Node standard library), so the icons are reproducible from
 * source instead of being opaque binaries nobody can regenerate.
 */
import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT_DIR = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "public",
  "icons",
);

const GREEN = [0x4d, 0x98, 0x38];
const GREEN_DEEP = [0x3d, 0x7c, 0x2c];
const WHITE = [0xff, 0xff, 0xff];

/* ------------------------------- PNG encoding ------------------------------ */

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i += 1)
    c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const body = Buffer.concat([Buffer.from(type, "latin1"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([length, body, crc]);
}

/** RGBA8, no interlacing, one filter byte per scanline. */
function encodePng(width, height, rgba) {
  const stride = width * 4 + 1;
  const raw = Buffer.alloc(stride * height);
  for (let y = 0; y < height; y += 1) {
    raw[y * stride] = 0;
    rgba.copy(raw, y * stride + 1, y * width * 4, (y + 1) * width * 4);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // colour type: truecolour + alpha
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/* -------------------------------- rasterising ------------------------------ */

/** Signed distance to a rounded rectangle centred on the origin. */
function sdRoundRect(px, py, halfW, halfH, radius) {
  const qx = Math.abs(px) - (halfW - radius);
  const qy = Math.abs(py) - (halfH - radius);
  return (
    Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) +
    Math.min(Math.max(qx, qy), 0) -
    radius
  );
}

/** Signed distance to a line segment, which is how the check mark is drawn. */
function sdSegment(px, py, ax, ay, bx, by) {
  const abx = bx - ax;
  const aby = by - ay;
  const apx = px - ax;
  const apy = py - ay;
  const len2 = abx * abx + aby * aby;
  const t =
    len2 === 0 ? 0 : Math.max(0, Math.min(1, (apx * abx + apy * aby) / len2));
  return Math.hypot(apx - abx * t, apy - aby * t);
}

/** 1 inside, 0 outside, anti-aliased across a one-pixel band. */
function coverage(distance) {
  return Math.max(0, Math.min(1, 0.5 - distance));
}

function blend(pixels, index, colour, alpha) {
  if (alpha <= 0) return;
  const a = Math.min(0.999, alpha);
  for (let c = 0; c < 3; c += 1) {
    pixels[index + c] = Math.round(pixels[index + c] * (1 - a) + colour[c] * a);
  }
  pixels[index + 3] = Math.round(pixels[index + 3] * (1 - a) + 255 * a);
}

/**
 * @param size        output edge length in pixels
 * @param maskable    full-bleed square (maskable icons are cropped to a circle)
 * @param radiusRatio corner radius as a fraction of the edge, for the `any` icon
 */
function drawIcon(size, { maskable = false, radiusRatio = 0.22 } = {}) {
  const pixels = Buffer.alloc(size * size * 4);
  const centre = size / 2;
  const radius = maskable ? 0 : size * radiusRatio;
  const half = size / 2;

  // A maskable icon is cropped to a circle of ~80% of its edge, so its glyph is
  // pulled in to stay inside that safe zone; the `any` icon can be bolder.
  const span = size * (maskable ? 0.26 : 0.32);
  const stroke = size * (maskable ? 0.085 : 0.1);

  // Sampled in centre-relative space (see `px`/`py` below), so the tick's two
  // strokes are centre-relative too.
  const strokeSd = (x, y) =>
    Math.min(
      sdSegment(x, y, -span * 0.78, span * 0.1, -span * 0.2, span * 0.68),
      sdSegment(x, y, -span * 0.2, span * 0.68, span * 0.78, -span * 0.66),
    ) -
    stroke / 2;

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const index = (y * size + x) * 4;
      const px = x + 0.5 - centre;
      const py = y + 0.5 - centre;

      // Background: a rounded square for the `any` icon, full bleed when the
      // launcher will do the rounding itself.
      const bg = coverage(sdRoundRect(px, py, half, half, radius));

      // A subtle top-to-bottom fade gives the flat green some depth without
      // introducing a second colour the brand has to carry.
      const shade = maskable ? 0.12 : (y / size) * 0.5;
      const tint = [
        Math.round(GREEN[0] + (GREEN_DEEP[0] - GREEN[0]) * shade),
        Math.round(GREEN[1] + (GREEN_DEEP[1] - GREEN[1]) * shade),
        Math.round(GREEN[2] + (GREEN_DEEP[2] - GREEN[2]) * shade),
      ];
      blend(pixels, index, tint, bg);

      // The check, only where the background is.
      blend(pixels, index, WHITE, coverage(strokeSd(px, py)) * bg);
    }
  }

  return encodePng(size, size, pixels);
}

/* ---------------------------------- output --------------------------------- */

mkdirSync(OUT_DIR, { recursive: true });

const TARGETS = [
  ["icon-192.png", drawIcon(192)],
  ["icon-512.png", drawIcon(512)],
  ["icon-maskable-512.png", drawIcon(512, { maskable: true })],
  ["apple-touch-icon.png", drawIcon(180, { maskable: true })],
];

for (const [name, data] of TARGETS) {
  writeFileSync(join(OUT_DIR, name), data);
  console.log(`wrote public/icons/${name} (${data.length} bytes)`);
}
