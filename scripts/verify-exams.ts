/**
 * Verify that the app's exam question data (src/features/exams/data) matches the
 * raw ITExamAnswers HTML dumps in public/ (question count, numbering, text, code,
 * options, correct answers, pairings, exhibits, explanation topics).
 *
 * Run with: bun scripts/verify-exams.ts
 */
import { readFileSync, existsSync } from "node:fs";
import { modules79 } from "../src/features/exams/data/modules-7-9/index.ts";
import { modules1013 } from "../src/features/exams/data/modules-10-13/index.ts";
import { modules1416 } from "../src/features/exams/data/modules-14-16/index.ts";
import type { Question } from "../src/features/exams/lib/types.ts";
import { exhibitList } from "../src/features/exams/lib/types.ts";

// ---------------------------------------------------------------------------
// Normalization helpers
// ---------------------------------------------------------------------------

const ENTITIES: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ndash: "-",
  mdash: "-", hellip: "...", rsquo: "'", lsquo: "'", rdquo: '"', ldquo: '"',
  deg: "°", times: "x", minus: "-", middot: "·", bull: "•", rarr: "->",
  copy: "(c)", reg: "(r)", trade: "(tm)", eacute: "é", aacute: "á",
  ecirc: "ê", icirc: "î", ocirc: "ô", ucirc: "û", uuml: "ü", ouml: "ö",
  auml: "ä", szlig: "ß", ccedil: "ç", ensp: " ", emsp: " ", thinsp: " ",
};

function decodeEntities(s: string): string {
  return s.replace(
    /&#x([0-9a-fA-F]+);|&#(\d+);|&([a-zA-Z]+);/g,
    (m, hex: string, dec: string, name: string) => {
      if (hex) {
        const cp = parseInt(hex, 16);
        return Number.isNaN(cp) ? m : String.fromCodePoint(cp);
      }
      if (dec) {
        const cp = parseInt(dec, 10);
        return Number.isNaN(cp) ? m : String.fromCodePoint(cp);
      }
      return ENTITIES[name] ?? m;
    }
  );
}

/** Normalize a single line of text for comparison. */
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

/** Multiset of normalized lines from a multi-line string. */
function lineSet(s: string): string[] {
  return s
    .split("\n")
    .map(normLine)
    .filter((l) => l.length > 0)
    .sort();
}

/** Multiset of normalized words from a multi-line string. */
function wordSet(s: string): string[] {
  return normLine(s)
    .split(/\s+/)
    .filter((w) => w.length > 0)
    .sort();
}

function diff(a: string[], b: string[]): { onlyA: string[]; onlyB: string[] } {
  const ma = new Map<string, number>();
  for (const x of a) ma.set(x, (ma.get(x) ?? 0) + 1);
  const mb = new Map<string, number>();
  for (const x of b) mb.set(x, (mb.get(x) ?? 0) + 1);
  const onlyA: string[] = [];
  const onlyB: string[] = [];
  for (const [k, v] of ma) {
    const n = mb.get(k) ?? 0;
    for (let i = v - n; i > 0; i--) onlyA.push(k);
  }
  for (const [k, v] of mb) {
    const n = ma.get(k) ?? 0;
    for (let i = v - n; i > 0; i--) onlyB.push(k);
  }
  return { onlyA, onlyB };
}

function stripTags(s: string): string {
  return s.replace(/<[^>]*>/g, "");
}

/**
 * Remove every <div> whose opening tag contains classSubstr, honoring nested
 * divs (balanced matching). Returns the text with those divs removed and the
 * list of their inner contents.
 */
function extractDivsByClass(
  html: string,
  classSubstr: string
): { cleaned: string; contents: string[] } {
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

interface ParsedQuestion {
  number: number;
  /** normalized words of question text (paragraphs + <pre>) */
  bodyWords: string[];
  /** answer-list items found inside the explanation box */
  explOptions: string[];
  /** option strings with correctness flag */
  options: { text: string; correct: boolean }[];
  /** normalized stem lines (paragraphs only, in order) */
  stemLines: string[];
  /** rows extracted from answer tables: array of cells per row */
  tableRows: { cells: string[]; fromHead: boolean }[];
  hasUl: boolean;
  /** images found in the question body (not options/explanation) */
  images: string[];
  /** explanation text (may be empty) */
  explanation: string;
  /** true when the explanation box exists at all */
  hasExplanation: boolean;
}

export function parseHtml(file: string): Map<number, ParsedQuestion> {
  const html = readFileSync(file, "utf8");

  const firstQ = html.search(/<p><(?:strong|b)>\s*1\./);
  if (firstQ === -1) throw new Error(`No question 1 found in ${file}`);

  const endMarkers = [
    /<h2 class="screen-reader-text">Post navigation/,
    /<div id="mts_related_posts_widget/,
  ].map((re) => {
    const m = html.slice(firstQ).search(re);
    return m === -1 ? html.length : firstQ + m;
  });
  const end = Math.min(...endMarkers);
  const body = html.slice(firstQ, end);

  // Split into per-question blocks.
  const starts: { idx: number; num: number }[] = [];
  const re = /<p><(?:strong|b)>\s*(\d+)\./g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body)) !== null) {
    starts.push({ idx: m.index, num: parseInt(m[1], 10) });
  }

  const questions = new Map<number, ParsedQuestion>();
  for (let i = 0; i < starts.length; i++) {
    const start = starts[i];
    const endIdx = i + 1 < starts.length ? starts[i + 1].idx : body.length;
    let block = body.slice(start.idx, endIdx);

    // Option lists (declared early — the explanation box may contain one).
    const hasUl = /<ul[^>]*>/.test(block);
    const options: { text: string; correct: boolean }[] = [];
    // Explanation box(es) — keep any <ul> answer list they contain in a
    // separate list (some dumps put the answer list inside the box; used only
    // for pair questions that have no other answer table).
    let explanation = "";
    let hasExplanation = false;
    const explOptions: string[] = [];
    const expl = extractDivsByClass(block, "message_box success");
    block = expl.cleaned;
    for (const inner of expl.contents) {
      hasExplanation = true;
      const txt = stripTags(inner)
        .replace(/^Explanation:/i, "")
        .replace(/\s+/g, " ")
        .trim();
      explanation = decodeEntities(txt);
      // answer list inside the explanation box
      const liRe = /<li([^>]*)>([\s\S]*?)<\/li>/g;
      let li: RegExpExecArray | null;
      while ((li = liRe.exec(inner)) !== null) {
        const txt2 = stripTags(li[2])
          .replace(/\r/g, " ")
          .replace(/<br\s*\/?>/g, " ")
          .trim();
        if (txt2.length > 0) explOptions.push(txt2);
      }
    }
    // Remove other message boxes and the inter-question download cards.
    block = extractDivsByClass(block, "message_box").cleaned;
    block = extractDivsByClass(block, "w3eden").cleaned;
    block = extractDivsByClass(block, "wp-block-file").cleaned;
    block = block.replace(/<div class="cbc-code-bar">[\s\S]*?<\/div>/g, "");

    // Remove image caption text (site chrome).
    block = block.replace(/<p[^>]*class="[^"]*wp-caption-text[^"]*"[^>]*>[\s\S]*?<\/p>/g, "");
    block = block.replace(/<figcaption[^>]*>[\s\S]*?<\/figcaption>/g, "");

    // Answer tables -> rows (theads separated from tbody rows).
    const tableRows: { cells: string[]; fromHead: boolean }[] = [];
    block = block.replace(/<table[^>]*>([\s\S]*?)<\/table>/g, (_m0, inner: string) => {
      // parse thead first (for header inference), then rows
      const headMatch = inner.match(/<thead[^>]*>([\s\S]*?)<\/thead>/);
      if (headMatch) {
        const rowRe = /<tr[^>]*>([\s\S]*?)<\/tr>/g;
        let r: RegExpExecArray | null;
        while ((r = rowRe.exec(headMatch[1])) !== null) {
          tableRows.push({ cells: extractCells(r[1]), fromHead: true });
        }
      }
      const tbodyMatch = inner.match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/) ?? ["", inner];
      const rowRe = /<tr[^>]*>([\s\S]*?)<\/tr>/g;
      let r: RegExpExecArray | null;
      while ((r = rowRe.exec(tbodyMatch[1])) !== null) {
        tableRows.push({ cells: extractCells(r[1]), fromHead: false });
      }
      return "";
    });

    // Images in the question body.
    const images: string[] = [];
    block = block.replace(/<img[^>]*src="([^"]*)"[^>]*>/g, (_m0, src: string) => {
      images.push(src);
      return "";
    });

    // <pre> blocks -> code lines
    const preLines: string[] = [];
    block = block.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/g, (_m0, inner: string) => {
      const clean = stripTags(inner).replace(/\r\n/g, "\n").replace(/\r/g, "\n");
      for (const l of clean.split("\n")) preLines.push(l);
      return "";
    });

    // Option lists
    block = block.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/g, (_m0, inner: string) => {
      const liRe = /<li([^>]*)>([\s\S]*?)<\/li>/g;
      let li: RegExpExecArray | null;
      while ((li = liRe.exec(inner)) !== null) {
        const cls = li[1] ?? "";
        const txt = stripTags(li[2].replace(/<br\s*\/?>/g, "\n"))
          .replace(/\r/g, " ")
          .trim();
        if (txt.length > 0) {
          options.push({
            text: txt,
            correct: /\bcorrect_answer\b/.test(cls),
          });
        }
      }
      return "";
    });

    // Remaining paragraphs -> stem lines, with paragraph-option handling when
    // the dump used <p> blocks instead of a <ul> (command-set options).
    const stemLines: string[] = [];
    const paraRe = /<p\b[^>]*>([\s\S]*?)<\/p>/g;
    let firstPara = true;
    block = block.replace(paraRe, (_m0, raw: string) => {
      const lines = raw.split(/<br\s*\/?>/);
      const lineIsWrapped = lines.map((l) => /<strong|color:\s*#ff0000|style="[^"]*red/i.test(l));
      const text = (s: string) => decodeEntities(stripTags(s.replace(/<br\s*\/?>/g, "\n")));
      const fullyWrapped =
        /^\s*<(?:strong|span)\b[^>]*>/.test(raw) && /<\/(?:span|strong)>\s*$/.test(raw);
      if (firstPara) {
        // question stem paragraph
        for (const l of lines) stemLines.push(text(l));
        firstPara = false;
      } else if (!hasUl && lines.length > 1) {
        // multi-line paragraph outside a <ul>: command-set option block
        const wrappedCount = lineIsWrapped.filter(Boolean).length;
        if (fullyWrapped) {
          // whole block wrapped (e.g. red answer block): one correct option
          options.push({ text: text(raw), correct: true });
        } else if (wrappedCount > 0) {
          // partial wrap: each line is an option
          lines.forEach((l, idx) => {
            options.push({ text: text(l), correct: lineIsWrapped[idx] });
          });
        } else {
          // unwrapped multi-line block: one option
          options.push({ text: text(raw), correct: false });
        }
      } else {
        for (const l of lines) stemLines.push(text(l));
      }
      return "";
    });
    // Any remaining bare text (e.g. text directly after </p>)
    const bare = stripTags(block).trim();
    if (bare.length > 0) stemLines.push(bare);

    // Strip the "N. " question-number prefix from the first stem line.
    if (stemLines.length > 0) {
      stemLines[0] = stemLines[0].replace(/^\s*\d+\.\s*/, "");
    }

    const normStems = stemLines.map(normLine).filter((l) => l.length > 0);
    questions.set(start.num, {
      number: start.num,
      bodyWords: wordSet([...stemLines, ...preLines].join("\n")),
      options,
      stemLines: normStems,
      tableRows,
      hasUl,
      explOptions,
      images,
      explanation,
      hasExplanation,
    });
  }
  return questions;
}

function extractCells(rowHtml: string): string[] {
  const cells: string[] = [];
  const re = /<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(rowHtml)) !== null) {
    cells.push(normLine(stripTags(m[1])));
  }
  return cells;
}

// ---------------------------------------------------------------------------
// TS data loading
// ---------------------------------------------------------------------------

interface TsQuestion {
  number: number;
  type: "single" | "multi" | "pair";
  text: string;
  code?: string;
  options?: string[];
  correct?: number[];
  choose?: number;
  left?: string[];
  right?: string[];
  correctPairs?: Record<number, number>;
  explanation?: string;
  exhibits: { src: string }[];
}

function loadTs(questions: Question[]): Map<number, TsQuestion> {
  const map = new Map<number, TsQuestion>();
  for (const q of questions) {
    map.set(q.number, {
      number: q.number,
      type: q.type,
      text: q.text,
      code: "code" in q ? q.code : undefined,
      options: "options" in q ? q.options : undefined,
      correct: "correct" in q ? q.correct : undefined,
      choose: "choose" in q ? q.choose : undefined,
      left: "left" in q ? q.left : undefined,
      right: "right" in q ? q.right : undefined,
      correctPairs: "correctPairs" in q ? q.correctPairs : undefined,
      explanation: q.explanation,
      exhibits: exhibitList(q.exhibit),
    });
  }
  return map;
}

// ---------------------------------------------------------------------------
// Comparison
// ---------------------------------------------------------------------------

interface Issue {
  q: number;
  kind: string;
  detail: string;
}

function fmtList(arr: string[], max = 6): string {
  return (
    arr.slice(0, max).map((l) => `    | ${l}`).join("\n") +
    (arr.length > max ? `\n    ... (+${arr.length - max} more)` : "")
  );
}

/** Option representation for exact comparison: multiset of normalized lines. */
function optKey(opt: string): string {
  return JSON.stringify(opt.split("\n").map(normLine).filter(Boolean).sort());
}

function compareModule(
  name: string,
  htmlFile: string,
  tsQuestions: Question[],
  moduleDir: string
): { issues: Issue[]; htmlNums: number[]; tsNums: number[] } {
  const html = parseHtml(htmlFile);
  const ts = loadTs(tsQuestions);
  const issues: Issue[] = [];

  const htmlNums = [...html.keys()].sort((a, b) => a - b);
  const tsNums = [...ts.keys()].sort((a, b) => a - b);

  if (JSON.stringify(htmlNums) !== JSON.stringify(tsNums)) {
    issues.push({
      q: 0,
      kind: "NUMBERING",
      detail: `HTML has ${htmlNums.length} questions, TS has ${tsNums.length}. ` +
        `Only in HTML: ${htmlNums.filter((n) => !ts.has(n)).join(",") || "none"} | ` +
        `Only in TS: ${tsNums.filter((n) => !html.has(n)).join(",") || "none"}`,
    });
  }

  for (const n of tsNums) {
    const t = ts.get(n)!;
    const h = html.get(n);
    if (!h) continue; // already reported

    const isPresented = h.stemLines.length > 0 && h.stemLines[0] === "question as presented:";

    // 1. body words (text + code) as a multiset
    const tsWords = wordSet(t.text + (t.code ? "\n" + t.code : ""));
    const { onlyA: htmlOnly, onlyB: tsOnly } = diff(h.bodyWords, tsWords);
    if (htmlOnly.length > 0 || tsOnly.length > 0) {
      issues.push({
        q: n,
        kind: "BODY",
        detail: `Text/code content differs.\n  Only in HTML:\n${fmtList(htmlOnly)}\n  Only in TS:\n${fmtList(tsOnly)}`,
      });
    }

    // 2. type / options / correct answers
    const correctCount = h.options.filter((o) => o.correct).length;
    const htmlType = correctCount === 0 ? "pair" : correctCount === 1 ? "single" : "multi";

    if (isPresented) {
      // "Question as presented:" — dump deliberately gives no options/answers.
      // Per EXAM_BUILDER_PROMPT: TS must be single True/False with True correct.
      if (t.type !== "single") {
        issues.push({ q: n, kind: "TYPE", detail: `"Question as presented" should be single; TS says "${t.type}"` });
      }
      const tsOpts = (t.options ?? []).map(normLine);
      if (JSON.stringify(tsOpts) !== JSON.stringify(["true", "false"])) {
        issues.push({ q: n, kind: "OPTIONS", detail: `"Question as presented" options should be [True, False]; TS has: ${tsOpts.join(" | ")}` });
      }
      const tsCorrect = (t.correct ?? []).map((i) => t.options?.[i]).filter(Boolean).map(normLine);
      if (tsCorrect.join(",") !== "true") {
        issues.push({ q: n, kind: "CORRECT", detail: `"Question as presented" should mark True correct; TS marks: ${tsCorrect.join(",")}` });
      }
      const stmt = h.stemLines.slice(1).join(" ");
      const tsStmt = t.text.split("\n").map(normLine).filter(Boolean).slice(1).join(" ");
      if (stmt !== tsStmt) {
        issues.push({
          q: n,
          kind: "BODY",
          detail: `Presented statement differs.\n  HTML: ${stmt}\n  TS:   ${tsStmt}`,
        });
      }
    } else if (t.type === "single" || t.type === "multi") {
      if (htmlType !== t.type) {
        issues.push({
          q: n,
          kind: "TYPE",
          detail: `HTML implies "${htmlType}" (${correctCount} correct option(s)), TS says "${t.type}"`,
        });
      }
      const tsOpts = (t.options ?? []).map(optKey);
      const htmlOpts = h.options.map((o) => optKey(o.text));
      const { onlyA, onlyB } = diff(htmlOpts, tsOpts);
      if (onlyA.length > 0 || onlyB.length > 0) {
        issues.push({
          q: n,
          kind: "OPTIONS",
          detail: `Option lists differ.\n  Only in HTML:\n${fmtList(onlyA)}\n  Only in TS:\n${fmtList(onlyB)}`,
        });
      }
      const tsCorrect = (t.correct ?? []).map((i) => t.options?.[i]).filter(Boolean).map(optKey).sort();
      const htmlCorrect = h.options.filter((o) => o.correct).map((o) => optKey(o.text)).sort();
      const cd = diff(htmlCorrect, tsCorrect);
      if (cd.onlyA.length > 0 || cd.onlyB.length > 0) {
        issues.push({
          q: n,
          kind: "CORRECT",
          detail: `Correct answers differ.\n  Only in HTML:\n${fmtList(cd.onlyA)}\n  Only in TS:\n${fmtList(cd.onlyB)}`,
        });
      }
      if (t.type === "multi" && t.choose !== undefined && t.choose !== correctCount) {
        issues.push({
          q: n,
          kind: "CHOOSE",
          detail: `TS choose=${t.choose} but HTML marks ${correctCount} correct`,
        });
      }
    } else if (t.type === "pair") {
      // Build the expected pairs from the dump.
      let htmlPairs: string[] | null = null;
      const rows = h.tableRows.filter((r) => !r.fromHead);
      if (rows.length > 0) {
        const headers = h.tableRows.filter((r) => r.fromHead).flatMap((r) => r.cells).filter(Boolean);
        htmlPairs = rows.flatMap((r) => {
          if (headers.length > 0) {
            // classification matrix: each cell maps to its column header
            return r.cells
              .map((c, col) => (c.length > 0 ? JSON.stringify([c, headers[col] ?? headers[0]].sort()) : null))
              .filter((p): p is string => p !== null);
          }
          const nonEmpty = r.cells.filter((c) => c.length > 0);
          if (nonEmpty.length >= 2) return [JSON.stringify([nonEmpty[0], nonEmpty[1]].sort())];
          return [];
        });
      } else if (h.options.length > 0) {
        htmlPairs = h.options.map((o) => {
          const parts = o.text.split(" - ");
          if (parts.length >= 2) return JSON.stringify([normLine(parts[0]), normLine(parts.slice(1).join(" - "))].sort());
          return normLine(o.text);
        }).sort();
      } else if (h.explOptions.length > 0) {
        // answer list inside the explanation box
        htmlPairs = h.explOptions.map((o) => {
          const parts = o.split(" - ");
          if (parts.length >= 2) return JSON.stringify([normLine(parts[0]), normLine(parts.slice(1).join(" - "))].sort());
          return normLine(o);
        }).sort();
      }

      if (htmlPairs) {
        const tsPairs = (t.left ?? []).map((l, i) => {
          const r = t.right?.[t.correctPairs?.[i] ?? -1] ?? "";
          return JSON.stringify([normLine(l), normLine(r)].sort());
        }).sort();
        const pd = diff(htmlPairs, tsPairs);
        if (pd.onlyA.length > 0 || pd.onlyB.length > 0) {
          issues.push({
            q: n,
            kind: "PAIR",
            detail: `Pairings differ.\n  Only in HTML:\n${fmtList(pd.onlyA)}\n  Only in TS:\n${fmtList(pd.onlyB)}`,
          });
        }
      } else {
        // No table/options in the dump: pairing must come from the exhibit image
        // or the explanation text. Check right targets against the dump text;
        // when the dump only offers an image, mark as unverifiable (info).
        const hay = normLine([h.explanation, ...h.stemLines].join(" \n "));
        const missing = (t.right ?? []).filter((r) => !hay.includes(normLine(r)));
        if (missing.length > 0) {
          issues.push({
            q: n,
            kind: h.images.length > 0 ? "PAIR-IMG-ONLY" : "PAIR",
            detail: h.images.length > 0
              ? `Answer table missing in dump (pairing shown only in the exhibit image); TS targets not verifiable from text: ${missing.join(", ")}`
              : `TS pairs reference content not found in the dump text: ${missing.join(", ")}`,
          });
        }
      }
    }

    // 3. exhibits: TS exhibit entries vs HTML images
    if (t.exhibits.length !== h.images.length) {
      issues.push({
        q: n,
        kind: "EXHIBIT-COUNT",
        detail: `HTML has ${h.images.length} image(s), TS has ${t.exhibits.length} exhibit(s)`,
      });
    }
    for (const ex of t.exhibits) {
      const local = `public${ex.src}`;
      if (!existsSync(local)) {
        issues.push({
          q: n,
          kind: "EXHIBIT-FILE",
          detail: `Exhibit file missing on disk: ${ex.src}`,
        });
      }
    }

    // 4. explanation topic
    const htmlTopic = h.explanation.match(/topic\s+(\d+\.\d+\.\d+)/i);
    const tsTopic = (t.explanation ?? "").match(/topic\s+(\d+\.\d+\.\d+)/i);
    if (htmlTopic && !tsTopic) {
      issues.push({
        q: n,
        kind: "EXPL-TOPIC",
        detail: `HTML explanation cites ${htmlTopic[1]} but TS explanation has no topic`,
      });
    } else if (htmlTopic && tsTopic && htmlTopic[1] !== tsTopic[1]) {
      issues.push({
        q: n,
        kind: "EXPL-TOPIC",
        detail: `Topic mismatch: HTML=${htmlTopic[1]}, TS=${tsTopic[1]}`,
      });
    }
    if (h.hasExplanation && !t.explanation) {
      issues.push({ q: n, kind: "EXPL-MISSING", detail: "HTML has explanation, TS has none" });
    }
    if (!h.hasExplanation && t.explanation) {
      issues.push({
        q: n,
        kind: "EXPL-EXTRA",
        detail: "HTML has no explanation box; TS explanation written from curriculum (informational)",
      });
    }
    if (t.explanation && !/^Explanation:\s*Topic/i.test(t.explanation.trim())) {
      issues.push({
        q: n,
        kind: "EXPL-FORMAT",
        detail: `TS explanation does not start with "Explanation: Topic ..."`,
      });
    }
  }

  return { issues, htmlNums, tsNums };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const modules = [
  { name: "Modules 7-9", html: "public/itexamanswers_modules7-9.html", ts: modules79.questions },
  { name: "Modules 10-13", html: "public/itexamanswers_modules10-13.html", ts: modules1013.questions },
  { name: "Modules 14-16", html: "public/itexamanswers_modules14-16.html", ts: modules1416.questions },
];

let totalIssues = 0;
for (const mod of modules) {
  const { issues } = compareModule(mod.name, mod.html, mod.ts);
  console.log(`\n${"=".repeat(70)}`);
  console.log(`${mod.name} — ${mod.html}`);
  console.log(`${"=".repeat(70)}`);
  if (issues.length === 0) {
    console.log("✅ All checks passed — data matches the dump.");
  } else {
    totalIssues += issues.length;
    for (const iss of issues) {
      console.log(`\n❌ Q${iss.q} [${iss.kind}]: ${iss.detail}`);
    }
  }
}
console.log(`\n${"=".repeat(70)}`);
console.log(totalIssues === 0 ? "✅ No issues found in any module." : `❌ ${totalIssues} issue(s) found across all modules.`);