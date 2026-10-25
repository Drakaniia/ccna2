#!/usr/bin/env node
/**
 * Verify that the Modules 1-4 question data matches the raw ITExamAnswers dump in
 * public/reference/. Re-derives every question from the HTML (text, options,
 * correct answers, explanation topic) and compares it with
 * src/features/exams/data/modules-1-4, then checks the exhibit images on disk.
 *
 * Run with: node scripts/verify-m14.mjs
 */
import { readFileSync, existsSync, statSync } from "node:fs";
import { resolve } from "node:path";
import * as esbuild from "esbuild";

const ROOT = resolve(import.meta.dirname, "..");
const HTML_PATH = resolve(
  ROOT,
  "public/reference/CCNA 2 v7 Modules 1 - 4_ Switching Concepts, VLANs, and InterVLAN Routing Exam Answers.html"
);
const IMAGE_DIR = resolve(ROOT, "public/images/modules-1-4");

const issues = [];
const warnings = [];
const fail = (msg) => issues.push(msg);
const warn = (msg) => warnings.push(msg);

/* ------------------------------- normalization ------------------------------- */

const ENTITIES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ndash: "-",
  mdash: "-", hellip: "...", rsquo: "'", lsquo: "'", rdquo: '"', ldquo: '"',
  deg: "°", times: "x", minus: "-", middot: "·", bull: "•", rarr: "->",
};

function decodeEntities(s) {
  return s.replace(
    /&#x([0-9a-fA-F]+);|&#(\d+);|&([a-zA-Z]+);/g,
    (m, hex, dec, name) => {
      if (hex) return String.fromCodePoint(parseInt(hex, 16));
      if (dec) return String.fromCodePoint(parseInt(dec, 10));
      return ENTITIES[name] ?? m;
    }
  );
}

/** HTML -> single-line text (tags stripped, entities decoded). */
function text(html) {
  return decodeEntities(html.replace(/<[^>]*>/g, " "))
    .replace(/[\u200b\u00ad\u202f\u2009\u200a]/g, "")
    .replace(/[–—]/g, "-")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

/** Comparison key that ignores punctuation / spacing / emphasis differences. */
const key = (s) => text(s).toLowerCase().replace(/[^a-z0-9]+/g, "");

const words = (s) =>
  text(s)
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

/** Words present in `a` but missing (or fewer) in `b`. */
function missingWords(a, b) {
  const pool = new Map();
  for (const w of words(b)) pool.set(w, (pool.get(w) ?? 0) + 1);
  const missing = [];
  for (const w of words(a)) {
    const n = pool.get(w) ?? 0;
    if (n > 0) pool.set(w, n - 1);
    else missing.push(w);
  }
  return missing;
}

/* --------------------------------- HTML dump --------------------------------- */

const raw = readFileSync(HTML_PATH, "utf8");
const contentStart = raw.indexOf("<h3>Checkpoint Exam");
if (contentStart < 0) {
  console.error("could not locate the exam content in the dump");
  process.exit(2);
}
// Everything after the last explanation box is site chrome — stop before the post
// navigation (and the comments) so the final question is not polluted by it.
const boundaries = ["<!--.post-single-content-->", '<nav class="navigation']
  .map((m) => raw.indexOf(m, contentStart))
  .filter((i) => i > contentStart)
  .sort((a, b) => a - b);
const content = raw.slice(contentStart, boundaries.length > 0 ? boundaries[0] : undefined);

const markers = [...content.matchAll(/<strong>(\d{1,2})\.\s/g)];
if (markers.length === 0) {
  console.error("no question markers found in the dump");
  process.exit(2);
}

/** @type {Map<number, {text:string, options:string[], correct:string[], topic:string|null, explanation:string, images:number}>} */
const htmlQuestions = new Map();

markers.forEach((m, i) => {
  const from = m.index;
  const to = i + 1 < markers.length ? markers[i + 1].index : content.length;
  const block = content.slice(from, to);
  const number = Number(m[1]);

  // question text: the first <strong>N. ...</strong>, plus any further top-level
  // <strong> segment in the same item (Q77 splits one question over two of them).
  const strongEnd = block.indexOf("</strong>");
  const markerText = text(block.slice(m[0].length, strongEnd >= 0 ? strongEnd : block.length));

  // The explanation box carries a class/style attribute — slice past the opening
  // tag so neither leaks into the extracted text.
  const expIdx = block.indexOf('class="message_box success"');
  const questionPart = expIdx >= 0 ? block.slice(0, block.lastIndexOf("<", expIdx)) : block;
  const explanationPart = expIdx >= 0 ? block.slice(block.indexOf(">", expIdx) + 1) : "";

  const options = [];
  const correct = [];
  for (const li of questionPart.matchAll(/<li([^>]*)>([\s\S]*?)<\/li>/g)) {
    const val = text(li[2]);
    if (!val) continue;
    options.push(val);
    if (/correct_answer/.test(li[1])) correct.push(val);
  }

  const explanation = expIdx >= 0 ? text(explanationPart) : "";
  const topicMatch = /Explanation:\s*Topic\s*([\d.]+)/i.exec(explanation);
  const images = (questionPart.match(/<img/g) ?? []).length;

  // The marker itself is a top-level <strong>, so drop it (and any <strong> that is
  // just a bolded option) before looking for extra question sentences.
  const optionsKey = new Set(options.map(key));
  const extraStrong = [...questionPart.matchAll(/<strong>([\s\S]*?)<\/strong>/g)]
    .map((s) => text(s[1]))
    .filter(
      (s) =>
        s &&
        key(s.replace(/^\d+\.\s*/, "")) !== key(markerText) &&
        !optionsKey.has(key(s))
    );

  htmlQuestions.set(number, {
    text: markerText,
    extraStrong,
    wordPool: new Set(words(questionPart)),
    options,
    correct,
    topic: topicMatch ? topicMatch[1] : null,
    explanation,
    images,
  });
});

/* ---------------------------------- TS data ---------------------------------- */

const bundled = await esbuild.build({
  entryPoints: [resolve(ROOT, "src/features/exams/data/modules-1-4/index.ts")],
  bundle: true,
  format: "esm",
  write: false,
  target: "node22",
  logLevel: "silent",
});
const dataUrl =
  "data:text/javascript;base64," +
  Buffer.from(bundled.outputFiles[0].text, "utf8").toString("base64");
const { modules14 } = await import(dataUrl);
const questions = modules14.questions;

const choiceTypes = new Set(["single", "multi"]);

/* -------------------------------- data checks -------------------------------- */

if (questions.length !== htmlQuestions.size) {
  fail(`question count: TS has ${questions.length}, dump has ${htmlQuestions.size}`);
}

const seen = new Set();
let choiceCount = 0;
let pairCount = 0;
const exhibitFiles = new Set();

for (const q of questions) {
  const label = `Q${q.number}`;

  if (seen.has(q.number)) fail(`${label}: duplicate question number`);
  seen.add(q.number);

  const h = htmlQuestions.get(q.number);
  if (!h) {
    fail(`${label}: not present in the dump`);
    continue;
  }

  if (q.type !== "single" && q.type !== "multi" && q.type !== "pair") {
    fail(`${label}: unknown type ${JSON.stringify(q.type)}`);
    continue;
  }
  if (q.type === "pair") pairCount += 1;
  else choiceCount += 1;

  // --- question text ---
  const tsWords = words(q.text);
  const stray = [...new Set(tsWords.filter((w) => !h.wordPool.has(w)))];
  if (stray.length > 0) {
    fail(`${label}: TS question text contains wording absent from the dump: ${stray.join(", ")}`);
  }
  if (!key(q.text).startsWith(key(h.text))) {
    fail(`${label}: question text differs\n    TS : ${q.text}\n    DMP: ${h.text}`);
  }
  for (const seg of h.extraStrong) {
    if (!key(q.text).includes(key(seg))) {
      fail(`${label}: dump question sentence missing from the TS text: ${seg}`);
    }
  }
  if (/\(choose (two|three|four)/i.test(h.text) && q.type !== "multi") {
    fail(`${label}: dump says "(Choose ...)" but TS type is ${q.type}`);
  }

  // --- options / correct answers ---
  if (q.type !== "pair") {
    const tsOptions = q.options;
    const dumpOptions = h.options;
    if (tsOptions.length !== dumpOptions.length) {
      fail(`${label}: option count TS=${tsOptions.length} dump=${dumpOptions.length}`);
    }
    const tsKeys = tsOptions.map(key);
    const dumpKeys = dumpOptions.map(key);
    if (new Set(tsKeys).size !== tsKeys.length) fail(`${label}: duplicated TS options`);
    tsOptions.forEach((opt, i) => {
      if (i >= dumpOptions.length) return;
      if (tsKeys[i] !== dumpKeys[i]) {
        fail(`${label}: option ${i + 1} differs\n    TS : ${opt}\n    DMP: ${dumpOptions[i]}`);
      }
    });
    const missing = dumpKeys.filter((k) => !tsKeys.includes(k));
    if (missing.length > 0) {
      fail(`${label}: ${missing.length} dump option(s) missing from TS: ${missing.join(", ")}`);
    }

    const tsCorrect = q.correct.map((i) => key(tsOptions[i]));
    const dumpCorrect = h.correct.map(key);
    const tsSet = [...new Set(tsCorrect)].sort().join("|");
    const dumpSet = [...new Set(dumpCorrect)].sort().join("|");
    if (tsSet !== dumpSet) {
      fail(
        `${label}: correct answers differ\n    TS : ${tsCorrect.join(" | ")}\n    DMP: ${h.correct.join(" | ")}`
      );
    }
    if (new Set(q.correct).size !== q.correct.length) {
      fail(`${label}: duplicate entries in TS correct[]`);
    }
    for (const i of q.correct) {
      if (!Number.isInteger(i) || i < 0 || i >= q.options.length) {
        fail(`${label}: correct index ${i} out of range`);
      }
    }
    if (q.type === "multi" && (q.choose ?? 2) !== q.correct.length) {
      fail(`${label}: choose=${q.choose} but ${q.correct.length} correct options`);
    }
  } else {
    // --- pair question ---
    if (!Array.isArray(q.left) || q.left.length === 0) fail(`${label}: empty left column`);
    if (!Array.isArray(q.right) || q.right.length === 0) fail(`${label}: empty right column`);
    if (q.right.length < q.left.length) {
      fail(`${label}: only ${q.right.length} right items for ${q.left.length} left items`);
    }
    const expectedKeys = q.left.map((_, i) => i).join(",");
    const actualKeys = Object.keys(q.correctPairs ?? {}).map(Number).sort((a, b) => a - b).join(",");
    if (expectedKeys !== actualKeys) {
      fail(`${label}: correctPairs keys [${actualKeys}] do not cover every left item [${expectedKeys}]`);
    }
    const values = Object.values(q.correctPairs ?? {});
    if (!q.allowMultiMatch && new Set(values).size !== values.length) {
      fail(`${label}: right items reused but allowMultiMatch is not set`);
    }
    for (const [l, r] of Object.entries(q.correctPairs ?? {})) {
      if (r < 0 || r >= q.right.length) fail(`${label}: correctPairs[${l}] = ${r} out of range`);
    }
    // A few dumps print the pairings in the explanation; every item must appear there.
    const dumpWords = words(h.explanation).join(" ");
    if (h.options.length > 0) {
      for (const item of [...q.left, ...q.right]) {
        if (!dumpWords.includes(words(item).join(" "))) {
          warn(`${label}: pairing item not found verbatim in the dump explanation: ${item}`);
        }
      }
    }
    if (h.options.length === 0 && h.images === 0) {
      warn(`${label}: dump shows no exhibit and no option list — pairing came from external sources`);
    }
  }

  // --- explanation ---
  if (!q.explanation) {
    fail(`${label}: missing explanation`);
  } else {
    const m = /^Explanation:\s*Topic\s*([\d.]+)/.exec(q.explanation.trim());
    if (!m) fail(`${label}: explanation does not start with "Explanation: Topic ..."`);
    else if (h.topic && m[1] !== h.topic) {
      fail(`${label}: topic TS=${m[1]} dump=${h.topic}`);
    } else if (!h.topic) {
      warn(`${label}: dump explanation has no topic`);
    }
    // Some dump boxes carry the topic but no body text; there the TS text is
    // written from the curriculum and there is nothing to compare word by word.
    const dumpBody = h.explanation.replace(/^.*?Explanation:\s*(Topic\s*[\d.]+)?/i, "").trim();
    if (words(dumpBody).length === 0) {
      warn(`${label}: dump explanation has no body text — TS explanation written from the curriculum`);
    } else {
      const missing = missingWords(dumpBody, q.explanation);
      const limit = q.type === "pair" ? 25 : 0;
      if (missing.length > limit) {
        fail(
          `${label}: ${missing.length} explanation word(s) from the dump are absent from the TS text: ${missing
            .slice(0, 12)
            .join(", ")}${missing.length > 12 ? " ..." : ""}`
        );
      } else if (missing.length > 0) {
        warn(`${label}: ${missing.length} dump explanation word(s) rephrased in the TS text`);
      }
    }
  }

  // --- exhibit ---
  const exhibits = !q.exhibit ? [] : Array.isArray(q.exhibit) ? q.exhibit : [q.exhibit];
  if (h.images > 0 && exhibits.length === 0) {
    fail(`${label}: dump shows ${h.images} exhibit image(s) but TS has none`);
  }
  if (h.images === 0 && exhibits.length > 0) {
    warn(`${label}: TS declares an exhibit but the dump shows no image`);
  }
  for (const ex of exhibits) {
    if (!ex.alt) fail(`${label}: exhibit without alt text`);
    if (!ex.width || !ex.height) fail(`${label}: exhibit without width/height`);
    if (!ex.src.startsWith("/images/modules-1-4/")) {
      fail(`${label}: exhibit src outside the module folder: ${ex.src}`);
    }
    exhibitFiles.add(ex.src.replace("/images/modules-1-4/", ""));
  }
}

/* ------------------------------ image file checks ----------------------------- */

function pngSize(buf) {
  if (buf.length < 24) return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function jpegSize(buf) {
  let i = 2;
  while (i < buf.length - 9) {
    if (buf[i] !== 0xff) {
      i += 1;
      continue;
    }
    const marker = buf[i + 1];
    const len = buf.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }
    i += 2 + len;
  }
  return null;
}

const declared = new Map();
for (const q of questions) {
  const exhibits = !q.exhibit ? [] : Array.isArray(q.exhibit) ? q.exhibit : [q.exhibit];
  for (const ex of exhibits) declared.set(ex.src.replace("/images/modules-1-4/", ""), ex);
}

for (const [file, ex] of declared) {
  const path = resolve(IMAGE_DIR, file);
  if (!existsSync(path)) {
    fail(`image missing on disk: public/images/modules-1-4/${file}`);
    continue;
  }
  const size = statSync(path).size;
  if (size < 1024) fail(`image looks truncated (${size} bytes): ${file}`);
  const buf = readFileSync(path);
  const dims = file.endsWith(".png") ? pngSize(buf) : jpegSize(buf);
  if (!dims) {
    warn(`could not read dimensions of ${file}`);
  } else if (dims.width !== ex.width || dims.height !== ex.height) {
    fail(
      `${file}: declared ${ex.width}x${ex.height} but the file is ${dims.width}x${dims.height}`
    );
  }
}

console.log("=".repeat(72));
console.log("Modules 1 - 4 data verification");
console.log("=".repeat(72));
console.log(`dump questions      : ${htmlQuestions.size}`);
console.log(`TS questions        : ${questions.length} (${choiceCount} choice, ${pairCount} pair)`);
console.log(`exhibit images      : ${declared.size} declared, ${[...declared.keys()].filter((f) => existsSync(resolve(IMAGE_DIR, f))).length} on disk`);

if (warnings.length > 0) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`  ! ${w}`);
}

if (issues.length === 0) {
  console.log("\nAll checks passed — the module data matches the dump.");
} else {
  console.log(`\n${issues.length} issue(s):`);
  for (const i of issues) console.log(`  x ${i}`);
}
process.exit(issues.length === 0 ? 0 : 1);
