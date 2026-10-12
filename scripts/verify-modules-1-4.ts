/**
 * One-off verifier: compare src/features/exams/data/modules-1-4 against the
 * reference HTML dump in public/reference.
 *
 * Run with: node scripts/verify-modules-1-4.ts
 */
import { readFileSync, existsSync } from "node:fs";
import { modules14 } from "../src/features/exams/data/modules-1-4/index.ts";
import type { Question } from "../src/features/exams/lib/types.ts";
import { exhibitList } from "../src/features/exams/lib/types.ts";

const HTML_FILE =
  "public/reference/CCNA 2 v7 Modules 1 - 4_ Switching Concepts, VLANs, and InterVLAN Routing Exam Answers.html";

// ---------------------------------------------------------------------------
// Normalization
// ---------------------------------------------------------------------------
const ENTITIES: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ndash: "-",
  mdash: "-", hellip: "...", rsquo: "'", lsquo: "'", rdquo: '"', ldquo: '"',
};

function decodeEntities(s: string): string {
  return s.replace(/&#x([0-9a-fA-F]+);|&#(\d+);|&([a-zA-Z]+);/g, (m, hex, dec, name) => {
    if (hex) { const cp = parseInt(hex, 16); return Number.isNaN(cp) ? m : String.fromCodePoint(cp); }
    if (dec) { const cp = parseInt(dec, 10); return Number.isNaN(cp) ? m : String.fromCodePoint(cp); }
    return ENTITIES[name] ?? m;
  });
}

function normLine(s: string): string {
  return decodeEntities(s)
    .replace(/[\u200b\u00ad\u202f\u2009\u200a]/g, "")
    .replace(/\u00a0/g, " ")
    .replace(/[–—]/g, "-")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function stripTags(s: string): string {
  return s.replace(/<[^>]*>/g, "");
}

function wordMultiset(s: string): Map<string, number> {
  const m = new Map<string, number>();
  for (const w of normLine(s).split(/\s+/).filter(Boolean)) {
    m.set(w, (m.get(w) ?? 0) + 1);
  }
  return m;
}

function diffMultiset(a: Map<string, number>, b: Map<string, number>) {
  const onlyA: string[] = [];
  const onlyB: string[] = [];
  for (const [k, v] of a) { const n = b.get(k) ?? 0; for (let i = v - n; i > 0; i--) onlyA.push(k); }
  for (const [k, v] of b) { const n = a.get(k) ?? 0; for (let i = v - n; i > 0; i--) onlyB.push(k); }
  return { onlyA, onlyB };
}

// ---------------------------------------------------------------------------
// Balanced <div> extraction
// ---------------------------------------------------------------------------
function extractDivsByClass(html: string, classSubstr: string): { cleaned: string; contents: string[] } {
  const contents: string[] = [];
  let result = "";
  let pos = 0;
  const scan = /<div\b[^>]*>|<\/div>/g;
  let m: RegExpExecArray | null;
  while ((m = scan.exec(html)) !== null) {
    if (m[0] === "</div>") continue;
    if (m[0].includes(classSubstr)) {
      result += html.slice(pos, m.index);
      const start = scan.lastIndex;
      let depth = 1;
      let m2: RegExpExecArray | null;
      while (depth > 0 && (m2 = scan.exec(html)) !== null) {
        if (m2[0] === "</div>") depth--;
        else depth++;
      }
      contents.push(html.slice(start, scan.lastIndex - "</div>".length));
      pos = scan.lastIndex;
    }
  }
  result += html.slice(pos);
  return { cleaned: result, contents };
}

// ---------------------------------------------------------------------------
// HTML parsing
// ---------------------------------------------------------------------------
interface HOption { text: string; correct: boolean }
interface HQuestion {
  number: number;
  stem: string;
  options: HOption[];
  explanation: string;
  explHtml: string;
  hasExplanation: boolean;
  images: string[];
}

function parseHtml(file: string): Map<number, HQuestion> {
  const html = readFileSync(file, "utf8");
  const firstQ = html.search(/<(?:strong|b)>\s*1\.\s/);
  if (firstQ === -1) throw new Error("No question 1 found");
  const endRel = html.slice(firstQ).search(/<h2 class="screen-reader-text">Post navigation|<div id="mts_related_posts_widget/);
  const end = endRel === -1 ? html.length : firstQ + endRel;
  const body = html.slice(firstQ, end);

  const starts: { idx: number; num: number }[] = [];
  const re = /<(?:strong|b)>\s*(\d+)\.\s/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body)) !== null) {
    starts.push({ idx: m.index, num: parseInt(m[1], 10) });
  }

  const questions = new Map<number, HQuestion>();
  for (let i = 0; i < starts.length; i++) {
    const start = starts[i];
    let block = body.slice(start.idx, i + 1 < starts.length ? starts[i + 1].idx : body.length);

    // 1. explanation (remove it)
    const expl = extractDivsByClass(block, "message_box success");
    block = expl.cleaned;
    let explanation = "";
    let explHtml = "";
    let hasExplanation = false;
    for (const inner of expl.contents) {
      hasExplanation = true;
      explHtml = inner;
      explanation = decodeEntities(stripTags(inner).replace(/^Explanation:/i, "").trim());
    }
    // remove other message boxes and the WPDM download card (site chrome)
    block = extractDivsByClass(block, "message_box").cleaned;
    block = extractDivsByClass(block, "w3eden").cleaned;

    // 2. images (ignore inline data: URIs / site chrome)
    const images: string[] = [];
    block = block.replace(/<img[^>]*src="([^"]*)"[^>]*>/g, (_m, src: string) => {
      if (!src.startsWith("data:")) images.push(src);
      return "";
    });
    // caption text
    block = block.replace(/<p[^>]*class="[^"]*wp-caption-text[^"]*"[^>]*>[\s\S]*?<\/p>/g, "");

    // 3. options (<ul>)
    const options: HOption[] = [];
    block = block.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/g, (_m, inner: string) => {
      const liRe = /<li([^>]*)>([\s\S]*?)<\/li>/g;
      let li: RegExpExecArray | null;
      while ((li = liRe.exec(inner)) !== null) {
        const txt = decodeEntities(stripTags(li[2].replace(/<br\s*\/?>/g, "\n"))).trim();
        if (txt.length > 0) options.push({ text: txt, correct: /\bcorrect_answer\b/.test(li[1] ?? "") });
      }
      return "";
    });

    // 4. remaining text = stem
    const stem = decodeEntities(stripTags(block.replace(/<br\s*\/?>/g, "\n")))
      .replace(/\n{2,}/g, "\n")
      .trim()
      .replace(/^\s*\d+\.\s*/, "");

    questions.set(start.num, { number: start.num, stem, options, explanation, explHtml, hasExplanation, images });
  }
  return questions;
}

// ---------------------------------------------------------------------------
// TS side
// ---------------------------------------------------------------------------
function loadTs(questions: Question[]) {
  const map = new Map<number, Question>();
  for (const q of questions) map.set(q.number, q);
  return map;
}

// ---------------------------------------------------------------------------
// Compare
// ---------------------------------------------------------------------------
interface Issue { q: number; kind: string; detail: string }
function fmt(arr: string[], max = 8): string {
  return arr.slice(0, max).map((l) => `    | ${l}`).join("\n") + (arr.length > max ? `\n    ... (+${arr.length - max})` : "");
}

function compare(): { issues: Issue[]; htmlNums: number[]; tsNums: number[] } {
  const html = parseHtml(HTML_FILE);
  const ts = loadTs(modules14.questions);
  const issues: Issue[] = [];

  const htmlNums = [...html.keys()].sort((a, b) => a - b);
  const tsNums = [...ts.keys()].sort((a, b) => a - b);
  if (JSON.stringify(htmlNums) !== JSON.stringify(tsNums)) {
    issues.push({
      q: 0, kind: "NUMBERING",
      detail: `HTML has ${htmlNums.length}, TS has ${tsNums.length}. ` +
        `Only HTML: ${htmlNums.filter((n) => !ts.has(n)).join(",") || "none"} | ` +
        `Only TS: ${tsNums.filter((n) => !html.has(n)).join(",") || "none"}`,
    });
  }

  for (const n of tsNums) {
    const t = ts.get(n)!;
    const h = html.get(n);
    if (!h) continue;

    // body text
    const tsText = t.text + ("code" in t && t.code ? "\n" + t.code : "");
    const d = diffMultiset(wordMultiset(h.stem), wordMultiset(tsText));
    if (d.onlyA.length || d.onlyB.length) {
      issues.push({ q: n, kind: "BODY", detail: `Text differs.\n  Only HTML:\n${fmt(d.onlyA)}\n  Only TS:\n${fmt(d.onlyB)}` });
    }

    const correctCount = h.options.filter((o) => o.correct).length;
    const htmlType = correctCount === 0 ? "pair" : correctCount === 1 ? "single" : "multi";

    if (t.type === "single" || t.type === "multi") {
      if (htmlType !== t.type) {
        issues.push({ q: n, kind: "TYPE", detail: `HTML implies "${htmlType}" (${correctCount} correct), TS says "${t.type}"` });
      }
      const htmlOpts = h.options.map((o) => normLine(o.text)).sort();
      const tsOpts = (t.options ?? []).map(normLine).sort();
      const od = diffMultiset(wordMultiset(htmlOpts.join("\n")), wordMultiset(tsOpts.join("\n")));
      // compare as multisets of whole option strings, not words
      const optDiff = listDiff(htmlOpts, tsOpts);
      if (optDiff.onlyA.length || optDiff.onlyB.length) {
        issues.push({ q: n, kind: "OPTIONS", detail: `Options differ (word-level: ${JSON.stringify(od)}).\n  Only HTML:\n${fmt(optDiff.onlyA)}\n  Only TS:\n${fmt(optDiff.onlyB)}` });
      }
      const htmlCorrect = h.options.filter((o) => o.correct).map((o) => normLine(o.text)).sort();
      const tsCorrect = (t.correct ?? []).map((i) => t.options?.[i]).filter((s): s is string => Boolean(s)).map(normLine).sort();
      const cd = listDiff(htmlCorrect, tsCorrect);
      if (cd.onlyA.length || cd.onlyB.length) {
        issues.push({ q: n, kind: "CORRECT", detail: `Correct answers differ.\n  Only HTML:\n${fmt(cd.onlyA)}\n  Only TS:\n${fmt(cd.onlyB)}` });
      }
      if (t.type === "multi" && t.choose !== undefined && t.choose !== correctCount) {
        issues.push({ q: n, kind: "CHOOSE", detail: `choose=${t.choose} but HTML marks ${correctCount} correct` });
      }
    } else if (t.type === "pair") {
      if (htmlType !== "pair") {
        issues.push({ q: n, kind: "TYPE", detail: `TS says pair but HTML has ${correctCount} marked option(s)` });
      }
      // The dump may encode the mapping as "left - right" list items in the explanation.
      const liRe = /<li[^>]*>([\s\S]*?)<\/li>/g;
      const mappingRe = /^(.+?)\s+-\s+(.+)$/;
      const htmlPairs: string[] = [];
      let li: RegExpExecArray | null;
      while ((li = liRe.exec(h.explHtml)) !== null) {
        const txt = decodeEntities(stripTags(li[1])).trim();
        const mm = txt.match(mappingRe);
        if (mm) htmlPairs.push([normLine(mm[1]), normLine(mm[2])].sort().join(" || "));
      }
      const tsPairs = (t.left ?? []).map((l, i) => {
        const r = t.right?.[t.correctPairs?.[i] ?? -1] ?? "";
        return [normLine(l), normLine(r)].sort().join(" || ");
      });
      if (htmlPairs.length > 0) {
        const pd = listDiff(htmlPairs, tsPairs);
        if (pd.onlyA.length || pd.onlyB.length) {
          issues.push({ q: n, kind: "PAIR", detail: `Pairings differ.\n  Only HTML:\n${fmt(pd.onlyA)}\n  Only TS:\n${fmt(pd.onlyB)}` });
        }
      } else if (h.images.length === 0) {
        // no image and no encoded mapping: check TS targets appear in the text
        const hay = normLine(h.explanation + "\n" + h.stem);
        const missing = (t.right ?? []).filter((r) => !hay.includes(normLine(r)));
        if (missing.length) issues.push({ q: n, kind: "PAIR", detail: `TS targets not found in dump text: ${missing.join(", ")}` });
      } else {
        issues.push({ q: n, kind: "PAIR-IMG", detail: "Pairing encoded only in exhibit image — verify manually" });
      }
    }

    // exhibits
    if (exhibitList(t.exhibit).length !== h.images.length) {
      issues.push({ q: n, kind: "EXHIBIT-COUNT", detail: `HTML has ${h.images.length} image(s), TS has ${exhibitList(t.exhibit).length}` });
    }
    for (const ex of exhibitList(t.exhibit)) {
      if (!existsSync(`public${ex.src}`)) issues.push({ q: n, kind: "EXHIBIT-FILE", detail: `missing on disk: ${ex.src}` });
    }

    // explanation topic
    const ht = h.explanation.match(/topic\s+(\d+\.\d+\.\d+)/i);
    const tt = (t.explanation ?? "").match(/topic\s+(\d+\.\d+\.\d+)/i);
    if (ht && !tt) issues.push({ q: n, kind: "EXPL-TOPIC", detail: `HTML cites ${ht[1]}, TS has no topic` });
    else if (ht && tt && ht[1] !== tt[1]) issues.push({ q: n, kind: "EXPL-TOPIC", detail: `HTML=${ht[1]}, TS=${tt[1]}` });
    if (!h.hasExplanation && t.explanation) issues.push({ q: n, kind: "EXPL-EXTRA", detail: "HTML has no explanation box (TS wrote one)" });
    if (h.hasExplanation && !t.explanation) issues.push({ q: n, kind: "EXPL-MISSING", detail: "HTML has explanation, TS has none" });
    if (h.hasExplanation && t.explanation) {
      const ed = diffMultiset(wordMultiset(h.explanation), wordMultiset(t.explanation));
      if (ed.onlyA.length + ed.onlyB.length > 6) {
        issues.push({ q: n, kind: "EXPL-DIFF", detail: `Explanation text differs (${ed.onlyA.length}+/${ed.onlyB.length}- words).\n  Only HTML:\n${fmt(ed.onlyA)}\n  Only TS:\n${fmt(ed.onlyB)}` });
      }
    }
  }
  return { issues, htmlNums, tsNums };
}

function listDiff(a: string[], b: string[]) {
  const onlyA: string[] = []; const onlyB: string[] = [];
  const mb = [...b];
  for (const x of a) { const i = mb.indexOf(x); if (i === -1) onlyA.push(x); else mb.splice(i, 1); }
  onlyB.push(...mb);
  return { onlyA, onlyB };
}

const { issues, htmlNums, tsNums } = compare();
console.log("HTML question numbers:", htmlNums.join(","));
console.log("TS question numbers:  ", tsNums.join(","));
console.log(`\n${issues.length} issue(s):`);
for (const iss of issues) console.log(`\n[${iss.kind}] Q${iss.q}: ${iss.detail}`);
