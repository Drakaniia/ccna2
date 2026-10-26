#!/usr/bin/env node
/**
 * Smoke test for /ccna/exam/modules-1-4.
 *
 * Drives the real page in Chrome over the DevTools protocol (no Playwright /
 * Puppeteer dependency) and covers both halves of the exam:
 *
 *   pass A — a full-bank attempt seeded with the interesting questions (single,
 *            multi, exhibit, matching, order, PT activity): every question must
 *            render exactly what the data says, auto-check, mark the feedback
 *            correct, and grading must come back at 100%.
 *   pass B — the signed-out preview: 77 tabs with 5 free questions, and the
 *            sign-in gate where the preview ends and where Submit would be.
 *
 * Prereq: the dev server is running on port 4321 (npm run dev:site).
 * Run with: node scripts/smoke-m14.mjs
 */
import { spawn, spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import * as esbuild from "esbuild";

const SITE = "http://localhost:4321";
const EXAM_URL = `${SITE}/ccna/exam/modules-1-4`;
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const DEBUG_PORT = 9300 + Math.floor(Math.random() * 90);
const MODULE_ID = "modules-1-4";

const failures = [];
const notes = [];

function check(name, ok, extra = "") {
  console.log(`[${ok ? "PASS" : "FAIL"}] ${name}${!ok && extra ? ` — ${extra}` : ""}`);
  if (!ok) failures.push(name);
}

const norm = (s) => String(s ?? "").replace(/\s+/g, " ").trim();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* --------------------------------- module data -------------------------------- */

const bundled = await esbuild.build({
  entryPoints: [resolve(import.meta.dirname, "../src/features/exams/data/modules-1-4/index.ts")],
  bundle: true,
  format: "esm",
  write: false,
  target: "node22",
  logLevel: "silent",
});
const { modules14 } = await import(
  "data:text/javascript;base64," +
    Buffer.from(bundled.outputFiles[0].text, "utf8").toString("base64")
);
const questions = modules14.questions;
const indexOfNumber = new Map(questions.map((q, i) => [q.number, i]));
const range = (n) => Array.from({ length: n }, (_, i) => i);

/* -------------------------------- CDP plumbing -------------------------------- */

const profile = mkdtempSync(join(tmpdir(), "ccna-smoke-"));
const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir=${profile}`,
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-extensions",
    "--disable-gpu",
    "--window-size=1440,1000",
    "about:blank",
  ],
  { stdio: "ignore" }
);

let ws;
let nextId = 1;
const pending = new Map();
const consoleErrors = [];

function send(method, params = {}) {
  const id = nextId++;
  return new Promise((res, rej) => {
    pending.set(id, { res, rej });
    ws.send(JSON.stringify({ id, method, params }));
    setTimeout(() => {
      if (pending.has(id)) {
        pending.delete(id);
        rej(new Error(`CDP timeout: ${method}`));
      }
    }, 20000);
  });
}

async function evaluate(expression) {
  const res = await send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (res.exceptionDetails) {
    throw new Error(
      res.exceptionDetails.exception?.description ?? "evaluate failed: " + expression.slice(0, 80)
    );
  }
  return res.result.value;
}

/** Poll an expression until it is true; returns the last value. */
async function waitFor(expression, label, timeout = 15000) {
  const deadline = Date.now() + timeout;
  let last;
  while (Date.now() < deadline) {
    try {
      last = await evaluate(expression);
      if (last) return last;
    } catch {
      /* page may be mid-navigation */
    }
    await sleep(150);
  }
  check(`wait for ${label}`, false, `timed out after ${timeout}ms`);
  return last;
}

const click = (selector) => evaluate(`(() => { const el = ${selector}; if (!el) return false; el.click(); return true; })()`);
const clickTab = (p) => evaluate(`(() => { const t = document.querySelectorAll("#tabs .qtab")[${p}]; if (!t) return false; t.click(); return true; })()`);

/** Everything the checks need about the question on screen. */
const SNAPSHOT = `(() => {
  const n = (s) => String(s ?? "").replace(/\\s+/g, " ").trim();
  const body = document.getElementById("qBody");
  const cols = body ? body.querySelectorAll(".pairing-board .pair-column") : [];
  const byCol = (i) => [...((cols[i]||{querySelectorAll:()=>[]}).querySelectorAll(".pair-item"))].map((el) => {
    const spans = el.querySelectorAll("span");
    const badgePos = el.classList.contains("pair-right") ? 1 : 0;
    return {
      text: n(spans[badgePos] ? spans[badgePos].textContent : el.textContent),
      left: el.dataset.left ?? null,
      right: el.dataset.right ?? null,
      cls: el.className,
    };
  });
  const options = body ? [...body.querySelectorAll("label.option")] : [];
  return {
    phase: document.body.dataset.phase,
    title: n(document.getElementById("qTitle") ? document.getElementById("qTitle").textContent : ""),
    text: n(document.getElementById("qText") ? document.getElementById("qText").textContent : ""),
    instruction: n(document.getElementById("qInstruction") ? document.getElementById("qInstruction").textContent : ""),
    optionCount: options.length,
    options: options.map((el) => ({ text: n(el.textContent), cls: el.className })),
    codeOptions: options.filter((el) => el.classList.contains("code-option")).length,
    pairTitle: n(document.querySelector(".pair-answer-title") ? document.querySelector(".pair-answer-title").textContent : ""),
    pairStatus: n(document.querySelector(".pair-status") ? document.querySelector(".pair-status").textContent : ""),
    left: byCol(0),
    right: byCol(1),
    explanation: n(document.getElementById("qExplanation") ? document.getElementById("qExplanation").textContent : ""),
    explanationHidden: document.getElementById("qExplanation") ? document.getElementById("qExplanation").hidden : true,
    exhibitHidden: document.getElementById("qExhibit") ? document.getElementById("qExhibit").hidden : true,
    imgs: [...document.querySelectorAll("#qExhibit img")].map((im) => ({
      src: im.getAttribute("src"),
      ok: im.complete && im.naturalWidth > 0,
    })),
    progress: n(document.getElementById("progress") ? document.getElementById("progress").textContent : ""),
    tabs: [...document.querySelectorAll("#tabs .qtab")].map((t) => t.className),
    footerText: n(document.getElementById("footerNextBtn") ? document.getElementById("footerNextBtn").textContent : ""),
    footerDisabled: document.getElementById("footerNextBtn") ? document.getElementById("footerNextBtn").disabled : null,
    gateHidden: document.getElementById("qLocked") ? document.getElementById("qLocked").hidden : true,
    gateHrefs: [...document.querySelectorAll("#qLocked a[href]")].map((a) => a.getAttribute("href")),
  };
})()`;

/** Answer the question on screen correctly, using the seeded identity layouts. */
function answerScript(q) {
  if (q.type === "pair") {
    const pairs = Object.entries(q.correctPairs)
      .map(([left, right]) => `[${left}, ${right}]`)
      .join(", ");
    return `(() => {
      const board = document.querySelector(".pairing-board");
      if (!board) return "no board";
      const items = [...board.querySelectorAll(".pair-item")];
      for (const [left, right] of [${pairs}]) {
        const l = items.find((el) => el.dataset.left === String(left));
        const r = items.find((el) => el.dataset.right === String(right));
        if (!l || !r) return "missing item";
        l.click(); r.click();
      }
      return "ok";
    })()`;
  }
  const indices = q.correct.join(", ");
  return `(() => {
    const opts = [...document.querySelectorAll("#qBody label.option")];
    for (const i of [${indices}]) {
      if (!opts[i]) return "missing option " + i;
      opts[i].click();
    }
    return "ok";
  })()`;
}

/* ----------------------------------- boot ----------------------------------- */

try {
  const deadline = Date.now() + 20000;
  let version = null;
  while (Date.now() < deadline && !version) {
    try {
      const res = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/version`);
      if (res.ok) version = await res.json();
    } catch {
      await sleep(250);
    }
  }
  if (!version) throw new Error("Chrome did not expose its debugging endpoint");

  const list = await (await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/list`)).json();
  const target = list.find((t) => t.type === "page");
  ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((res, rej) => {
    ws.onopen = res;
    ws.onerror = () => rej(new Error("could not connect to the page target"));
  });

  ws.onmessage = (event) => {
    let msg;
    try {
      msg = JSON.parse(event.data);
    } catch {
      return;
    }
    if (msg.id && pending.has(msg.id)) {
      const { res, rej } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) rej(new Error(msg.error.message));
      else res(msg.result);
      return;
    }
    if (msg.method === "Runtime.exceptionThrown") {
      consoleErrors.push(
        "exception: " +
          (msg.params.exceptionDetails?.exception?.description ?? msg.params.exceptionDetails?.text ?? "?")
      );
    } else if (msg.method === "Runtime.consoleAPICalled" && msg.params.type === "error") {
      consoleErrors.push("console.error: " + msg.params.args.map((a) => a.value ?? a.description ?? "").join(" "));
    } else if (msg.method === "Log.entryAdded" && msg.params.entry.level === "error") {
      const e = msg.params.entry;
      // The ccna-auth worker is not part of this test (no .env locally): its
      // connection refusals are expected for the passes that do not stub it.
      if (!String(e.url ?? "").includes(":8787")) consoleErrors.push(`log: ${e.text} ${e.url ?? ""}`);
    }
  };

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Log.enable");

  /* ------------------------------ pass A: full bank ------------------------------ */

  const stub = await send("Page.addScriptToEvaluateOnNewDocument", {
    source: `(() => {
      const real = window.fetch.bind(window);
      window.fetch = (input, init) => {
        const url = typeof input === "string" ? input : (input && input.url) || "";
        if (url.includes("/auth/session")) {
          return Promise.resolve(new Response(JSON.stringify({ authenticated: true, user: { email: "smoke@example.com" } }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }));
        }
        return real(input, init);
      };
    })();`,
  });

  // Curated order: every question shape this module has, incl. all four matching
  // boards and the two-part PT Activity text.
  const picked = [1, 24, 25, 20, 23, 31, 33, 70, 77, 78, 79].map((n) => indexOfNumber.get(n));
  check("curated question numbers all exist", !picked.includes(undefined), String(picked));

  const state = {
    seed: 1,
    order: picked,
    optionOrders: picked.map((i) => (questions[i].type === "pair" ? null : range(questions[i].options.length))),
    rightOrders: picked.map((i) => (questions[i].type === "pair" ? range(questions[i].right.length) : null)),
    leftOrders: picked.map((i) => (questions[i].type === "pair" ? range(questions[i].left.length) : null)),
    answers: picked.map(() => []),
    pairs: picked.map(() => null),
    skipped: picked.map(() => false),
    current: 0,
    checked: picked.map(() => false),
    // Flagging the last question is what makes the intro offer "Resume Session".
    reviewed: picked.map((_, i) => i === picked.length - 1),
    phase: "quiz",
    access: "full",
    total: questions.length,
  };

  await send("Page.navigate", { url: EXAM_URL });
  await waitFor(`document.documentElement.dataset.auth === "ok"`, "auth to resolve");
  await evaluate(
    `localStorage.setItem(${JSON.stringify(`ccna-exam:full:${MODULE_ID}`)}, ${JSON.stringify(
      JSON.stringify(state)
    )}); true`
  );
  await send("Page.reload", { ignoreCache: true });
  await waitFor(`document.documentElement.dataset.auth === "ok"`, "auth to resolve after reload");

  const intro = await evaluate(SNAPSHOT);
  check("pass A: intro offers the seeded session", intro.phase === "intro");
  check("pass A: resume button visible", await evaluate(`!document.getElementById("introResume").hidden`));
  await click(`document.getElementById("resumeExamBtn")`);
  await waitFor(`document.body.dataset.phase === "quiz"`, "the seeded attempt to start");

  const first = await evaluate(SNAPSHOT);
  check("pass A: seeded attempt has 11 tabs", first.tabs.length === 11, `found ${first.tabs.length}`);
  check("pass A: no question is locked in full mode", first.tabs.every((c) => !c.includes("locked")));
  check("pass A: question 1 of 11 on screen", first.progress === "1 of 11 Questions", first.progress);

  for (let p = 0; p < picked.length; p += 1) {
    const q = questions[picked[p]];
    const label = `Q${q.number}`;

    if (p > 0) await clickTab(p);
    await waitFor(
      `document.getElementById("qText") && document.getElementById("qText").textContent.length > 0`,
      `${label} to render`
    );
    const snap = await evaluate(SNAPSHOT);

    check(`pass A ${label}: title`, snap.title === `Question ${p + 1}`, snap.title);
    check(`pass A ${label}: question text`, snap.text === norm(q.text), `${snap.text} != ${norm(q.text)}`);

    const exhibits = !q.exhibit ? [] : Array.isArray(q.exhibit) ? q.exhibit : [q.exhibit];
    check(
      `pass A ${label}: exhibit images loaded (${exhibits.length})`,
      exhibits.length === snap.imgs.length && snap.imgs.every((im) => im.ok),
      JSON.stringify(snap.imgs)
    );
    if (q.type !== "pair") {
      check(`pass A ${label}: option count`, snap.optionCount === q.options.length, `${snap.optionCount}`);
      const mismatched = snap.options.filter((o, i) => norm(q.options[i]) !== o.text);
      check(
        `pass A ${label}: option wording`,
        mismatched.length === 0,
        mismatched.map((m) => m.text).join(" | ")
      );
      if (q.type === "multi") {
        check(`pass A ${label}: choose instruction`, snap.instruction === `(Choose ${q.choose ?? 2}.)`, snap.instruction);
      }
    } else {
      const wantLeft = q.left.map(norm);
      const wantRight = q.right.map(norm);
      check(
        `pass A ${label}: left column`,
        snap.left.length === wantLeft.length && snap.left.every((it, i) => it.text === wantLeft[i] && it.left === String(i)),
        JSON.stringify(snap.left.map((l) => l.text))
      );
      check(
        `pass A ${label}: right column`,
        snap.right.length === wantRight.length && snap.right.every((it, i) => it.text === wantRight[i] && it.right === String(i)),
        JSON.stringify(snap.right.map((l) => l.text))
      );
    }

    const answered = await evaluate(answerScript(q));
    check(`pass A ${label}: answering`, answered === "ok", String(answered));
    await waitFor(
      q.type === "pair"
        ? `!!document.querySelector(".pair-answer-table")`
        : `document.querySelectorAll("#qBody label.option.locked").length > 0`,
      `${label} to auto-check`
    );

    const checked = await evaluate(SNAPSHOT);
    check(`pass A ${label}: explanation revealed`, !checked.explanationHidden && checked.explanation === norm(q.explanation), checked.explanation.slice(0, 80));
    if (q.type === "pair") {
      check(`pass A ${label}: correct-matches table`, checked.pairTitle === "Correct matches", checked.pairTitle);
      check(
        `pass A ${label}: every pair marked correct`,
        checked.left.every((it) => it.cls.includes("reveal-correct") && !it.cls.includes("wrong")) &&
          !checked.right.some((it) => it.cls.includes("wrong")),
        JSON.stringify(checked.left.map((l) => l.cls))
      );
    } else {
      check(
        `pass A ${label}: right answers marked correct`,
        checked.options.filter((o) => o.cls.includes("correct")).length === q.correct.length &&
          !checked.options.some((o) => o.cls.includes("wrong")),
        JSON.stringify(checked.options.map((o) => o.cls))
      );
    }
    check(`pass A ${label}: tab turns answered`, checked.tabs[p].includes("answered"), checked.tabs[p]);
  }

  /* submit and grade */
  await clickTab(picked.length - 1);
  const last = await evaluate(SNAPSHOT);
  check("pass A: footer reads Submit on the last question", last.footerText === "Submit", last.footerText);
  await click(`document.getElementById("footerNextBtn")`);
  await waitFor(`document.body.dataset.phase === "submit"`, "the submit screen");
  check("pass A: submit screen asks for confirmation", await evaluate(`!!document.getElementById("confirmSubmit")`));
  await click(`document.getElementById("confirmSubmit")`);
  await evaluate(`(() => { const c = document.getElementById("confirmSubmit"); c.checked = true; return true; })()`);
  await click(`document.getElementById("doSubmitBtn")`);
  await waitFor(`document.body.dataset.phase === "result"`, "the result screen");

  const result = await evaluate(`(() => ({
    score: (document.getElementById("scoreText") || {}).textContent,
    message: (document.getElementById("scoreMessage") || {}).textContent,
    pass: (document.getElementById("passMessage") || {}).textContent,
    gauge: document.querySelector(".gauge-svg") ? document.querySelector(".gauge-svg").getAttribute("aria-valuenow") : null,
  }))()`);
  check("pass A: graded 11/11 = 100%", norm(result.score) === "100%", JSON.stringify(result));
  check("pass A: gauge reads 100", result.gauge === "100", String(result.gauge));
  check("pass A: pass message", norm(result.pass) === "You have passed the exam.", norm(result.pass));

  /* reset then check the wrong-answer feedback path */
  await click(`document.getElementById("resetBtn")`);
  await waitFor(`document.body.dataset.phase === "quiz"`, "the reset attempt");
  const reset = await evaluate(SNAPSHOT);
  check("pass A: reset clears the answers", reset.tabs.every((c) => !c.includes("answered")), JSON.stringify(reset.tabs));

  const firstQ = await evaluate(`(() => {
    const q = JSON.parse(localStorage.getItem(${JSON.stringify(`ccna-exam:full:${MODULE_ID}`)}));
    return q.order[0];
  })()`);
  const targetQ = questions[firstQ];
  if (targetQ.type !== "pair") {
    const wrong = targetQ.options.map((_, i) => i).find((i) => !targetQ.correct.includes(i));
    await evaluate(`document.querySelectorAll("#qBody label.option")[${wrong}].click()`);
    await waitFor(`document.querySelectorAll("#qBody label.option.locked").length > 0`, "the wrong answer to check");
    const after = await evaluate(SNAPSHOT);
    check(
      "pass A: a wrong answer is marked wrong",
      after.options[wrong].cls.includes("wrong") && after.tabs[0].includes("wrong"),
      JSON.stringify({ option: after.options[wrong].cls, tab: after.tabs[0] })
    );
    check("pass A: retry is offered after checking", await evaluate(`!document.getElementById("retryQBtn").hidden`));
    await click(`document.getElementById("retryQBtn")`);
    await waitFor(`document.querySelectorAll("#qBody label.option.selected").length === 0`, "the retry to clear the answer");
  } else {
    notes.push("first question of the reset shuffle is a matching board — skipped the wrong-answer check");
  }

  /* ------------------------------ pass B: preview ------------------------------ */

  await send("Page.removeScriptToEvaluateOnNewDocument", { identifier: stub.identifier });
  await evaluate(`localStorage.clear()`);
  await send("Page.navigate", { url: EXAM_URL });
  await waitFor(`document.documentElement.dataset.auth === "ok"`, "auth to resolve signed out");

  const previewIntro = await evaluate(`(() => ({
    phase: document.body.dataset.phase,
    count: document.getElementById("introQCount").textContent.trim(),
    note: document.getElementById("introPreviewNote").hidden ? "" : document.getElementById("introPreviewNote").textContent,
  }))()`);
  check("pass B: intro is the preview intro", previewIntro.phase === "intro");
  check("pass B: intro announces the real module length", previewIntro.count === "77 Questions", previewIntro.count);
  check("pass B: preview note is shown", /sign in/i.test(previewIntro.note), previewIntro.note);

  await click(`document.getElementById("startExamBtn")`);
  await waitFor(`document.body.dataset.phase === "quiz"`, "the preview attempt");
  const p0 = await evaluate(SNAPSHOT);
  const unlocked = p0.tabs.filter((c) => !c.includes("locked")).length;
  check("pass B: tab strip runs the full module", p0.tabs.length === 77, `found ${p0.tabs.length}`);
  check("pass B: exactly 5 free questions", unlocked === 5, `found ${unlocked}`);
  check("pass B: progress reports the gate position", p0.progress === "1 of 77 Questions", p0.progress);

  // The preview's own first question is a random one — answer it through the UI
  // without knowing its layout, then check the feedback appears.
  const previewChoice = p0.optionCount > 0;
  if (previewChoice) {
    const need = /\(Choose (\d)\.\)/.test(p0.instruction) ? Number(p0.instruction.match(/\d/)[0]) : 1;
    await evaluate(`(() => {
      const opts = [...document.querySelectorAll("#qBody label.option")];
      for (let i = 0; i < ${need}; i += 1) opts[i].click();
      return true;
    })()`);
    await waitFor(`document.querySelectorAll("#qBody label.option.locked").length > 0`, "the preview answer to check");
    const checked = await evaluate(SNAPSHOT);
    check("pass B: auto-check reveals an explanation", !checked.explanationHidden && /^Explanation: Topic/.test(checked.explanation), checked.explanation.slice(0, 60));
  } else {
    const status = await evaluate(SNAPSHOT);
    check("pass B: first free question is a matching board", /pairs matched/.test(status.pairStatus), status.pairStatus);
  }

  /* submit from the last free question must open the gate, not the submit screen */
  await clickTab(4);
  await waitFor(`document.getElementById("qTitle").textContent === "Question 5"`, "question 5");
  await click(`document.getElementById("footerNextBtn")`);
  await waitFor(`document.getElementById("qLocked") && !document.getElementById("qLocked").hidden`, "the sign-in gate");
  const gate = await evaluate(SNAPSHOT);
  check("pass B: Submit at the preview end opens the gate", gate.phase === "quiz" && !gate.gateHidden, JSON.stringify({ phase: gate.phase, gateHidden: gate.gateHidden }));
  check("pass B: gate offers a sign-in link", gate.gateHrefs.some((h) => /auth\/login/.test(h ?? "")), JSON.stringify(gate.gateHrefs));
  check("pass B: progress reads 6 of 77", gate.progress === "6 of 77 Questions", gate.progress);
  check("pass B: footer is inert on the gate", gate.footerDisabled === true, String(gate.footerDisabled));
  check("pass B: question body is replaced by the gate", await evaluate(`document.getElementById("qView").hidden`));
  check("pass B: locked tabs past the gate", gate.tabs.filter((c) => c.includes("locked")).length === 72, `${gate.tabs.filter((c) => c.includes("locked")).length}`);

  /* the exhibit questions served in preview still load their images */
  await clickTab(0);
  await waitFor(`document.getElementById("qTitle").textContent === "Question 1"`, "question 1 again");
  check("pass B: returning from the gate restores the question", await evaluate(`!document.getElementById("qView").hidden`));

  const assets = await evaluate(`(() => {
    const out = [];
    for (const q of ${JSON.stringify(
      questions
        .flatMap((q) => (!q.exhibit ? [] : Array.isArray(q.exhibit) ? q.exhibit : [q.exhibit]))
        .map((e) => e.src)
    )}) out.push(q);
    return out;
  })()`);
  const statuses = await Promise.all(
    assets.map(async (src) => {
      try {
        const res = await fetch(`${SITE}/ccna${src}`);
        return { src, status: res.status, type: res.headers.get("content-type") ?? "" };
      } catch (err) {
        return { src, status: -1, type: String(err) };
      }
    })
  );
  const badAssets = statuses.filter((s) => s.status !== 200 || !s.type.startsWith("image/"));
  check(
    `pass B: all ${statuses.length} exhibit files are served`,
    badAssets.length === 0,
    JSON.stringify(badAssets.slice(0, 5))
  );

  check("no page errors", consoleErrors.length === 0, consoleErrors.slice(0, 5).join(" ;; "));
} catch (err) {
  check("smoke test ran to completion", false, err?.stack ?? String(err));
} finally {
  try {
    ws?.close();
  } catch {
    /* nothing to do */
  }
  try {
    if (process.platform === "win32") {
      spawnSync("taskkill", ["/pid", String(chrome.pid), "/T", "/F"], { stdio: "ignore" });
    } else {
      chrome.kill("SIGKILL");
    }
  } catch {
    /* nothing to do */
  }
  try {
    rmSync(profile, { recursive: true, force: true });
  } catch {
    /* chrome may still hold the profile */
  }
}

if (notes.length > 0) {
  console.log("\nnotes:");
  for (const n of notes) console.log(`  ! ${n}`);
}
console.log(`\n${failures.length === 0 ? "ALL CHECKS PASSED" : `FAILURES (${failures.length}): ${failures.join(", ")}`}`);
process.exit(failures.length === 0 ? 0 : 1);
