/**
 * One-off generator: CCNA 1 v7 Modules 1 - 3 (Basic Network Connectivity and
 * Communications) question data. Parses the reference dump into
 * src/features/exams/data/itn-modules-1-3/.
 *
 * Run with: node scripts/gen-itn-1-3.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DUMP = join(
  ROOT,
  "public",
  "reference",
  "CCNA 1 v7 Modules 1 - 3_ Basic Network Connectivity and Communications Exam Answers.html"
);
const OUT_DIR = join(ROOT, "src", "features", "exams", "data", "itn-modules-1-3");

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
    .replace(/\r\n?/g, "\n")
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

function choiceOptions(q) {
  const mbox = q.indexOf('<div class="message_box success"');
  const region = mbox >= 0 ? q.slice(0, mbox) : q;
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
  return { options, correct };
}

/** Q19 keeps its command block in a `<pre>` and its answers in a `<ul>`. */
function codeBlock(q) {
  const m = /<pre[^>]*>([\s\S]*?)<\/pre>/.exec(q);
  return m ? clean(m[1]) : null;
}

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
  return clean(html.replace(/<table[\s\S]*?<\/table>/g, "")).trim();
}

/** First table in the question block — covers both before and inside the answer box. */
function tableRows(q) {
  const table = /<table[\s\S]*?<\/table>/.exec(q);
  if (!table) return null;
  const rows = [...table[0].matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((row) =>
    [...row[1].matchAll(/<(th|td)>([\s\S]*?)<\/\1>/g)].map((cell) => clean(cell[2]))
  );
  const pairs = rows.filter((r) => r.length >= 2).map((r) => [r[0], r[1]]);
  return pairs.length > 0 ? pairs : null;
}

function chooseCount(text) {
  const m = /\(Choose ([a-z]+|\d+)\.?\)/i.exec(text);
  if (!m) return undefined;
  const words = { two: 2, three: 3, four: 4, five: 5, six: 6 };
  const n = Number(m[1]) || words[m[1].toLowerCase()];
  return Number.isFinite(n) ? n : undefined;
}

const EXHIBITS = {
  5: { src: "/images/itn-modules-1-3/q5-exhibit.jpg", alt: "Exhibit for question 5: fault tolerance, scalability, and security matched to network architecture descriptions", width: 582, height: 519 },
  9: { src: "/images/itn-modules-1-3/q9-exhibit.jpg", alt: "Exhibit for question 9: Internet connectivity characteristics matched to connection types", width: 1168, height: 422 },
  18: { src: "/images/itn-modules-1-3/q18-exhibit.jpg", alt: "Exhibit for question 18: console and VTY password configuration on switch SW1", width: 487, height: 235 },
  24: { src: "/images/itn-modules-1-3/q24-exhibit.jpg", alt: "Exhibit for question 24: IOS modes of operation placed in order", width: 1022, height: 439 },
  27: { src: "/images/itn-modules-1-3/q27-exhibit.jpg", alt: "Exhibit for question 27: IOS mode descriptions matched to IOS modes", width: 665, height: 691 },
  28: { src: "/images/itn-modules-1-3/q28-exhibit.jpg", alt: "Exhibit for question 28: CLI hot keys and their definitions", width: 1064, height: 564 },
  36: { src: "/images/itn-modules-1-3/q36-exhibit.jpg", alt: "Exhibit for question 36: Internet standards organizations and their descriptions", width: 727, height: 671 },
  41: { src: "/images/itn-modules-1-3/q41-exhibit.jpg", alt: "Exhibit for question 41: encapsulation events placed in order", width: 1026, height: 450 },
  43: { src: "/images/itn-modules-1-3/q43-exhibit.png", alt: "Exhibit for question 43: ServerB sending a packet to HostA through RouterB and RouterA", width: 392, height: 320 },
  52: { src: "/images/itn-modules-1-3/q52-exhibit.jpg", alt: "Exhibit for question 52: PC0 connected to Switch0", width: 304, height: 132 },
  54: { src: "/images/itn-modules-1-3/q54-exhibit.png", alt: "Exhibit for question 54: invalid input error when entering config t from user EXEC mode", width: 308, height: 55 },
};

/**
 * Matching/ordering questions whose answers live only in the exhibit image
 * (the dump ships no table for them) or whose table omits the unused options.
 */
const PAIRS = {
  5: {
    left: ["fault tolerance", "scalability", "security"],
    right: [
      "Protect the network from unauthorized access.",
      "Provide redundant links and devices.",
      "Match the type of communication with a specific priority.",
      "Expand the network without degrading the service for existing users.",
      "Ensure that streaming data is provided over high speed links.",
    ],
    correctPairs: { 0: 1, 1: 3, 2: 0 },
    explanation:
      "Explanation: Topic 1.6.5\n- fault tolerance: Provide redundant links and devices.\n- scalability: Expand the network without degrading the service for existing users.\n- security: Protect the network from unauthorized access.\nThe two quality-of-service descriptions are not requirements of a reliable network architecture.",
  },
  27: {
    left: [
      "changes made affect the operation of the device as a whole",
      "accessed by entering the enable command",
      "identified by a prompt ending with the # character",
      "limited number of basic monitoring commands",
      "accessed by entering the configure terminal command",
      "the first entrance into the CLI of an IOS device",
    ],
    right: ["user EXEC mode", "privileged EXEC mode", "global configuration mode"],
    correctPairs: { 0: 2, 1: 1, 2: 1, 3: 0, 4: 2, 5: 0 },
    allowMultiMatch: true,
    explanation:
      "Explanation: Topic 2.2.4\n- user EXEC mode: limited number of basic monitoring commands; the first entrance into the CLI of an IOS device\n- privileged EXEC mode: accessed by entering the enable command; identified by a prompt ending with the # character\n- global configuration mode: changes made affect the operation of the device as a whole; accessed by entering the configure terminal command\nThe vty password command belongs to line configuration mode and is not used here.",
  },
  36: {
    left: [
      "This organization is responsible for overseeing and managing IP address allocation, domain name management, and protocol identifiers.",
      "This organization is the largest developer of international standards in the world for a wide variety of products and services. It is known for its Open Systems Interconnection (OSI) reference model.",
      "This organization promotes the open development, evolution, and use of the Internet throughout the world.",
    ],
    right: ["ISOC", "ISO", "EIA", "IANA"],
    correctPairs: { 0: 3, 1: 1, 2: 0 },
    explanation:
      "Explanation: Topic 3.3.2 and 3.4.2\n- IANA: oversees and manages IP address allocation, domain name management, and protocol identifiers.\n- ISO: the largest developer of international standards and the body behind the OSI reference model.\n- ISOC: promotes the open development, evolution, and use of the Internet.\nEIA is a standards and trade organization for electronics; its electrical wiring, connector, and rack standards are not described here, so it is not used.",
  },
};

/** Questions whose dump explanation is only a topic line. */
const EXPLANATION_OVERRIDES = {
  41: "Explanation: Topic 3.3.5\nThe encapsulation order is: the Telnet-formatted data is provided to the next layer, the TCP header is added, the IP header is added, and the Ethernet header is added.",
  65: "Explanation: Topic 3.6.4\nThe network layer adds a source and a destination IP address to the PDU when it encapsulates the segment into a packet.",
  73: "Explanation: Topic 3.6.3\nThe data link layer adds a source and a destination MAC address to the frame header during encapsulation.",
};

function pairExplanation(q, left, right, correctPairs) {
  const dump = explanationText(q);
  const hasBody = dump.split("\n").filter((line) => line.trim()).length > 1;
  const mapping = left
    .map((item, i) => `- ${item} → ${right[correctPairs[i]]}`)
    .join("\n");
  const topic = dump.split("\n")[0] || "Explanation";
  return hasBody ? `${topic}\n${mapping}\n${dump.split("\n").slice(1).join("\n")}` : `${topic}\n${mapping}`;
}

const questions = [];
for (const n of [...qmap.keys()].sort((a, b) => a - b)) {
  const q = qmap.get(n);
  const headingMatch = /^<p><(?:strong|b)>([\s\S]*?)<\/(?:strong|b)>/.exec(q);
  const text = heading(q);
  const choose = chooseCount(text);
  const override = PAIRS[n];
  // A trailing page table after the last question must not turn it into a pair.
  const isMatch = /\b(match|order)\b/i.test(text);
  const rows = override ? null : isMatch ? tableRows(q) : null;

  if (override || rows) {
    const left = override ? override.left : rows.map((r) => r[0]);
    const right = override ? override.right : [...new Set(rows.map((r) => r[1]))];
    const correctPairs = override
      ? override.correctPairs
      : Object.fromEntries(rows.map((r, i) => [i, right.indexOf(r[1])]));
    const repeatedTarget = new Set(Object.values(correctPairs)).size !== left.length;
    questions.push({
      number: n,
      type: "pair",
      text,
      left,
      right,
      correctPairs,
      ...(override?.allowMultiMatch || repeatedTarget ? { allowMultiMatch: true } : {}),
      explanation: override?.explanation ?? EXPLANATION_OVERRIDES[n] ?? pairExplanation(q, left, right, correctPairs),
      ...(EXHIBITS[n] ? { exhibit: EXHIBITS[n] } : {}),
    });
    continue;
  }

  const choice = choiceOptions(q);
  if (!choice) throw new Error(`question ${n}: no options`);
  if (choice.options.some((o) => !o)) throw new Error(`question ${n}: empty option`);
  if (choice.correct.length === 0) throw new Error(`question ${n}: no correct answer`);

  // Only the visible body before the choices counts; the explanation box and
  // the `<pre>` command block have their own handling.
  let rest = q.slice(headingMatch ? headingMatch[0].length : 0);
  const mboxAt = rest.indexOf('<div class="message_box success"');
  if (mboxAt >= 0) rest = rest.slice(0, mboxAt);
  const ulAt = rest.indexOf("<ul");
  if (ulAt >= 0) rest = rest.slice(0, ulAt);
  rest = rest.replace(/<pre[\s\S]*?<\/pre>/g, "");
  const extra = [...rest.matchAll(/<(?:strong|b)>([\s\S]*?)<\/(?:strong|b)>/g)]
    .map((m) => clean(m[1]))
    .filter((t) => t && !t.startsWith("Explanation:"));

  const code = codeBlock(q);
  questions.push({
    number: n,
    type: choose && choose > 1 ? "multi" : "single",
    ...(choose && choose > 1 ? { choose } : {}),
    text: [text, ...extra].join("\n"),
    ...(code ? { code } : {}),
    ...(EXHIBITS[n] ? { exhibit: EXHIBITS[n] } : {}),
    options: choice.options,
    correct: choice.correct,
    explanation: EXPLANATION_OVERRIDES[n] ?? explanationText(q),
  });
}

if (questions.length !== 75) throw new Error(`expected 75 questions, got ${questions.length}`);
for (const q of questions) {
  if (q.type === "single" && q.correct.length !== 1) {
    throw new Error(`question ${q.number}: single with ${q.correct.length} correct`);
  }
  if (q.type === "multi" && q.choose && q.correct.length !== q.choose) {
    throw new Error(`question ${q.number}: choose ${q.choose}, ${q.correct.length} correct`);
  }
  if (q.type === "pair" && !q.left.length) throw new Error(`question ${q.number}: empty pair`);
  if (!q.explanation) throw new Error(`question ${q.number}: missing explanation`);
}

function tsValue(value, indent = 0) {
  const pad = "  ".repeat(indent);
  const padIn = "  ".repeat(indent + 1);
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    if (value.every((v) => typeof v === "string" || typeof v === "number")) {
      const oneLine = `[${value.map((v) => tsValue(v)).join(", ")}]`;
      if (oneLine.length <= 90) return oneLine;
    }
    const printed = value.map((v) => padIn + tsValue(v, indent + 1));
    return `[\n${printed.join(",\n")}\n${pad}]`;
  }
  const printed = Object.entries(value).map(([k, v]) => `${padIn}${k}: ${tsValue(v, indent + 1)}`);
  return `{\n${printed.join(",\n")}\n${pad}}`;
}

function render(questions, exportName, title) {
  const bodyOut = questions.map((q) => "  " + tsValue(q, 1)).join(",\n");
  return (
    'import type { Question } from "../../lib/types";\n\n' +
    `/** ${title} */\n` +
    `export const ${exportName}: Question[] = [\n${bodyOut},\n];\n`
  );
}

mkdirSync(OUT_DIR, { recursive: true });
const first = questions.filter((q) => q.number <= 40);
const second = questions.filter((q) => q.number > 40);
writeFileSync(
  join(OUT_DIR, "questions-1-40.ts"),
  render(first, "questions1to40", "Modules 1 - 3 (Basic Network Connectivity and Communications), questions 1-40.")
);
writeFileSync(
  join(OUT_DIR, "questions-41-76.ts"),
  render(
    second,
    "questions41to76",
    "Modules 1 - 3 (Basic Network Connectivity and Communications), questions 41-76 (60 is missing from the dump)."
  )
);

console.log(`wrote ${questions.length} questions (${first.length} + ${second.length})`);
console.log("pairs:", questions.filter((q) => q.type === "pair").map((q) => q.number).join(", "));
