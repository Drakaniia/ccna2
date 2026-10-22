/**
 * One-off generator: CCNA 1 v7 Modules 4 - 7 (Ethernet Concepts) question data.
 * Parses public/reference/CCNA 1 v7 Modules 4 - 7_ Ethernet Concepts Exam
 * Answers.html into src/features/exams/data/itn-modules-4-7/.
 *
 * Run with: node scripts/gen-itn-4-7.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DUMP = join(
  ROOT,
  "public",
  "reference",
  "CCNA 1 v7 Modules 4 - 7_ Ethernet Concepts Exam Answers.html"
);
const OUT_DIR = join(ROOT, "src", "features", "exams", "data", "itn-modules-4-7");

const raw = readFileSync(DUMP, "utf8");
const body = raw.slice(raw.indexOf("<p><strong>1."));
const blocks = body.split(/(?=<p><(?:strong|b)>\d+\.)/);
const qmap = new Map();
for (const b of blocks) {
  const m = /^<p><(?:strong|b)>(\d+)\./.exec(b);
  if (m) qmap.set(Number(m[1]), b);
}

const NAMED = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  rsquo: "\u2019",
  lsquo: "\u2018",
  ldquo: "\u201c",
  rdquo: "\u201d",
  ndash: "\u2013",
  mdash: "\u2014",
  hellip: "\u2026",
  times: "\u00d7",
  minus: "\u2212",
  deg: "\u00b0",
};

function decode(t) {
  return t.replace(/&#x([0-9a-f]+);|&#(\d+);|&([a-z]+);/gi, (m, hex, dec, name) => {
    if (hex) return String.fromCodePoint(parseInt(hex, 16));
    if (dec) return String.fromCodePoint(parseInt(dec, 10));
    return NAMED[name?.toLowerCase()] ?? m;
  });
}

/** HTML → plain text, mirroring the existing module data's newline style. */
function clean(html) {
  let t = html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|h\d|li|tr|table|ul|ol|pre)>/gi, "\n")
    .replace(/<[^>]+>/g, "");
  t = decode(t).replace(/[\u200b\u00ad]/g, "").replace(/\u00a0/g, " ");
  t = t.replace(/[ \t]+/g, " ").replace(/ *\n */g, "\n").replace(/\n{2,}/g, "\n");
  return t.trim();
}

function heading(q) {
  const m = /^<p><(?:strong|b)>([\s\S]*?)<\/(?:strong|b)>/.exec(q);
  // Drop the dump's "N." prefix; the number lives in its own field.
  return m ? clean(m[1]).replace(/^\d+\.\s*/, "") : "";
}

/** The first `<ul>` before the explanation holds the multiple-choice options. */
function choiceOptions(q) {
  const mb = q.indexOf('<div class="message_box success"');
  const region = mb >= 0 ? q.slice(0, mb) : q;
  const m = /<ul[^>]*>([\s\S]*?)<\/ul>/.exec(region);
  if (!m) return null;
  const lis = m[1].match(/<li[^>]*>[\s\S]*?<\/li>/g) ?? [];
  const options = [];
  const correct = [];
  for (const li of lis) {
    const content = li.replace(/^<li[^>]*>/, "").replace(/<\/li>$/, "");
    options.push(clean(content));
    if (li.includes("correct_answer")) correct.push(options.length - 1);
  }
  return { options, correct, region };
}

/** Q46 keeps its four answer candidates as lines of a `<pre>` block. */
function preOptions(q) {
  const m = /<pre[^>]*>([\s\S]*?)<\/pre>/.exec(q);
  if (!m) return null;
  const lines = m[1].split(/\r?\n/).filter((line) => line.trim() !== "");
  const options = lines.map((line) => clean(line));
  const correct = lines
    .map((line, i) => (/color:\s*#ff0000|color:\s*red/i.test(line) ? i : -1))
    .filter((i) => i >= 0);
  return { options, correct };
}

/** Balanced extraction of the explanation message box. */
function explanationHtml(q) {
  const start = q.indexOf('<div class="message_box success"');
  if (start < 0) return null;
  const seg = q.slice(start);
  const gt = seg.indexOf(">");
  let depth = 1;
  let end = -1;
  for (const m of seg.slice(gt + 1).matchAll(/<div\b|<\/div>/g)) {
    depth += m[0].startsWith("<div") ? 1 : -1;
    if (depth === 0) {
      end = gt + 1 + (m.index ?? 0) + m[0].length;
      break;
    }
  }
  return end < 0 ? seg : seg.slice(0, end);
}

function explanationText(q) {
  const html = explanationHtml(q);
  if (!html) return "";
  const withoutTable = html.replace(/<table[\s\S]*?<\/table>/g, "");
  return clean(withoutTable)
    .replace(/<[^>]+>/g, "")
    .trim();
}

/** Parse a table cell grid out of the explanation box. */
function tableGrid(q) {
  const html = explanationHtml(q);
  if (!html) return null;
  const rows = [...html.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((row) =>
    [...row[1].matchAll(/<(th|td)>([\s\S]*?)<\/\1>/g)].map((cell) => clean(cell[2]))
  );
  return rows.length > 1 ? rows : null;
}

const CHOOSE_WORDS = { two: 2, three: 3, four: 4, five: 5, six: 6 };

function chooseCount(text) {
  const m = /\(Choose ([a-z]+|\d+)\.\)/i.exec(text);
  if (!m) return undefined;
  const raw = m[1].toLowerCase();
  const n = Number(raw) || CHOOSE_WORDS[raw];
  return Number.isFinite(n) ? n : undefined;
}

const EXHIBITS = {
  5: {
    src: "/images/itn-modules-4-7/q5-exhibit.jpg",
    alt: "Exhibit for question 5: situations matched to copper, fiber-optic, and wireless media",
    width: 887,
    height: 870,
  },
  10: {
    src: "/images/itn-modules-4-7/q10-exhibit.jpg",
    alt: "Exhibit for question 10: a type of network cabling",
    width: 300,
    height: 234,
  },
  12: {
    src: "/images/itn-modules-4-7/q12-exhibit.jpg",
    alt: "Exhibit for question 12: a type of network cabling",
    width: 301,
    height: 232,
  },
  30: {
    src: "/images/itn-modules-4-7/q30-exhibit.png",
    alt: "Exhibit for question 30: a PC sending a frame to a web server through a switch and router",
    width: 610,
    height: 355,
  },
  45: {
    src: "/images/itn-modules-4-7/q45-exhibit.png",
    alt: "Exhibit for question 45: RJ-45 termination of a UTP cable",
    width: 300,
    height: 221,
  },
  46: {
    src: "/images/itn-modules-4-7/q46-exhibit.png",
    alt: "Exhibit for question 46: a PC, switch, and router connected through FastEthernet links",
    width: 637,
    height: 134,
  },
  47: {
    src: "/images/itn-modules-4-7/q47-exhibit.jpg",
    alt: "Exhibit for question 47: Packet Tracer topology with a switch and several hosts",
    width: 344,
    height: 267,
  },
};

/** The dump only gives a topic line for these; fill in a concise explanation. */
const EXPLANATION_OVERRIDES = {
  1: "Explanation: Topic 4.1.1\nThe physical layer encodes the frame's bits as signals and transmits them across the local media. Media access control and frame error detection belong to the data link layer.",
  2: "Explanation: Topic 4.5.4\nA fiber-optic connection uses one strand to carry the transmitted signal and the other to carry the received signal, which is what allows full-duplex communication.",
  3: "Explanation: Topic 4.3.1\nCrosstalk is the distortion of the transmitted messages caused by signals carried in adjacent wires.",
  4: "Explanation: Topic 4.3.1\nTwisting opposing circuit wire pairs together cancels much of the electromagnetic interference between them, which reduces crosstalk.",
  73: "Explanation: Topic 7.2.6\nThe destination MAC address 01:00:5E:00:00:D9 is a multicast address. A switch floods a multicast frame out every port except the ingress port, because multicast addresses are not learned as unicast entries in the MAC address table.",
};

const questions = [];
for (const n of [...qmap.keys()].sort((a, b) => a - b)) {
  const q = qmap.get(n);
  const headingMatch = /^<p><(?:strong|b)>([\s\S]*?)<\/(?:strong|b)>/.exec(q);
  const text = heading(q);
  const choose = chooseCount(text);
  const isPair = n === 5;

  if (isPair) {
    const rows = tableGrid(q);
    const right = rows[0];
    const left = [];
    const correctPairs = {};
    for (let r = 1; r < rows.length; r += 1) {
      rows[r].forEach((cell, col) => {
        correctPairs[left.length] = col;
        left.push(cell);
      });
    }
    const explanation =
      "Explanation: Topic 4.3.3\n" +
      right
        .map((r, i) => `${r}: ${left.filter((_, li) => correctPairs[li] === i).join(", ")}`)
        .join("\n");
    questions.push({
      number: n,
      type: "pair",
      text,
      left,
      right,
      correctPairs,
      allowMultiMatch: true,
      explanation,
      exhibit: EXHIBITS[n],
    });
    continue;
  }

  const pre = preOptions(q);
  const choice = pre ? pre : choiceOptions(q);
  if (!choice) throw new Error(`question ${n}: no options`);
  if (choice.options.some((o) => !o)) throw new Error(`question ${n}: empty option`);
  if (choice.correct.length === 0) throw new Error(`question ${n}: no correct answer`);

  // Only the visible body before the choices counts; the explanation box and the
  // `<pre>` answer block (Q46) have their own handling and their own `<strong>`s.
  let rest = q.slice(headingMatch ? headingMatch[0].length : 0);
  const mboxAt = rest.indexOf('<div class="message_box success"');
  if (mboxAt >= 0) rest = rest.slice(0, mboxAt);
  const ulAt = rest.indexOf("<ul");
  if (ulAt >= 0) rest = rest.slice(0, ulAt);
  rest = rest.replace(/<pre[\s\S]*?<\/pre>/g, "");
  const extra = [...rest.matchAll(/<(?:strong|b)>([\s\S]*?)<\/(?:strong|b)>/g)]
    .map((m) => clean(m[1]))
    .filter((t) => t && !t.startsWith("Explanation:"));
  const fullText = [text, ...extra].join("\n");

  const explanation = EXPLANATION_OVERRIDES[n] ?? explanationText(q);
  questions.push({
    number: n,
    type: choose && choose > 1 ? "multi" : "single",
    ...(choose && choose > 1 ? { choose } : {}),
    text: fullText,
    ...(EXHIBITS[n] ? { exhibit: EXHIBITS[n] } : {}),
    options: choice.options,
    correct: choice.correct,
    explanation,
  });
}

if (questions.length !== 70) throw new Error(`expected 70 questions, got ${questions.length}`);
for (const q of questions) {
  if (q.type === "single" && q.correct.length !== 1) {
    throw new Error(`question ${q.number}: single with ${q.correct.length} correct`);
  }
  if (q.type === "multi" && q.choose && q.correct.length !== q.choose) {
    throw new Error(
      `question ${q.number}: choose ${q.choose}, ${q.correct.length} correct`
    );
  }
  if (q.options && q.options.length < 2) throw new Error(`question ${q.number}: too few options`);
  if (!q.explanation) throw new Error(`question ${q.number}: missing explanation`);
}

/** Minimal TS printer: objects + JSON-escaped strings, matching the module style. */
function tsValue(value, indent = 0) {
  const pad = "  ".repeat(indent);
  const padIn = "  ".repeat(indent + 1);
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    // Short primitive lists stay on one line, like the hand-written modules.
    if (value.every((v) => typeof v === "string" || typeof v === "number")) {
      const oneLine = `[${value.map((v) => tsValue(v)).join(", ")}]`;
      if (oneLine.length <= 90) return oneLine;
    }
    const printed = value.map((v) => padIn + tsValue(v, indent + 1));
    return `[\n${printed.join(",\n")}\n${pad}]`;
  }
  const entries = Object.entries(value);
  const printed = entries.map(
    ([k, v]) => `${padIn}${k}: ${tsValue(v, indent + 1)}`
  );
  return `{\n${printed.join(",\n")}\n${pad}}`;
}

function render(questions, exportName, title) {
  const body = questions.map((q) => "  " + tsValue(q, 1)).join(",\n");
  return (
    'import type { Question } from "../../lib/types";\n\n' +
    `/** ${title} */\n` +
    `export const ${exportName}: Question[] = [\n${body},\n];\n`
  );
}

mkdirSync(OUT_DIR, { recursive: true });
const first = questions.filter((q) => q.number <= 40);
const second = questions.filter((q) => q.number > 40);
writeFileSync(
  join(OUT_DIR, "questions-1-40.ts"),
  render(first, "questions1to40", "Modules 4 - 7 (Ethernet Concepts), questions 1-40.")
);
writeFileSync(
  join(OUT_DIR, "questions-41-79.ts"),
  render(
    second,
    "questions41to79",
    "Modules 4 - 7 (Ethernet Concepts), questions 41-79 (52, 62, 63, 65, 67, 69, 70, 72 and 77 are missing from the dump)."
  )
);

console.log(`wrote ${questions.length} questions (${first.length} + ${second.length})`);
console.log(
  questions
    .filter((q) => !q.options)
    .map((q) => `pair: ${q.number}`)
    .join(", ") || "no pair questions"
);
