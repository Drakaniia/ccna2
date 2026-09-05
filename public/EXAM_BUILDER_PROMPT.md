# Reusable Prompt — Build the Next CCNA 2 v7 Exam Group

## Task

Build this exam group into the Astro app exactly the way the already-shipped Modules 7 - 9
exam was built (`src/features/exams/data/modules-7-9/` is the reference pattern). The raw
WordPress dump is reference-only source material — never edit it.

**Exam parameters (fill these in):**
- Module registry id: `{module-id}` — e.g. `modules-10-13`
- Title: `{Title}` — e.g. `Modules 10 - 13`
- Subtitle: `{Subtitle}` — e.g. `L2 Security and WLANs`
- Group label: `{Group label}` — e.g. `Checkpoint Exam`
- Source dump: `public/itexamanswers_{module-id}.html`

1. **Create question data** at `src/features/exams/data/{module-id}/`:
   - `index.ts` exporting an `ExamModule` (`id`, `title`, `subtitle`, `groupLabel` copied
     from the matching `moduleRegistry` entry in `src/features/exams/data/index.ts`).
   - Two question files (`questions-1-N.ts`, `questions-N+1-M.ts`) typed as `Question[]`,
     split evenly. `number` on every question must match the numbering in the dump.
2. **Convert every question** using the `Question` types in `src/features/exams/lib/types.ts`:
   - Plain multiple choice → `single`, or `multi` with `choose: N` when the text says
     "(Choose N.)". `correct` = indices of `<li class="correct_answer">` options (keep the
     option strings verbatim, in source order).
   - Matching / ordering questions ("Match each/the …", "Place the options in the following
     order:", "Order the …") → `pair`. Left column = the descriptions (or "Step 1…N"),
     right column = the targets. `correctPairs` = leftIndex → rightIndex in SOURCE order.
     "(Not all options are used.)" means extra right-column decoys that no left maps to.
     Answers come from the dump's answer table / explanation; when that table is scrambled
     or missing, verify against Brainscape/Quizlet flashcard sets for the same exam before
     committing to a mapping.
   - "Question as presented:" statements → `single` `True`/`False` options with the
     presented statement as the correct (True) answer — the dump deliberately gives no
     other marking. Write a brief accurate explanation if the dump's is empty.
   - "Open the PT Activity" items → include only when the follow-up question is answerable
     without Packet Tracer (e.g. asks for a keyword or known fact); otherwise drop the
     question and note it.
   - CLI / router-output content shown above the options → put it in the `code` string on
     the question. Command-set *options* (multi-line blocks) → keep each block as ONE
     multi-line string; the option renderer already displays these monospace with line
     breaks preserved.
   - Classification matches where several descriptions map to the SAME target (e.g. "match
     each description to Stateless/Stateful") → `pair` + `allowMultiMatch: true`.
   - Strip HTML tags, `&nbsp;`, and zero-width-space (U+200B) characters from all text.
3. **Explanations**: copy each `<div class="message_box success">` explanation text, format
   `"Explanation: Topic N.N.N\n<cleaned text>"`. When the dump's explanation is empty, write
   a concise accurate explanation from the cited topic's curriculum content.
4. **Exhibits**: for each `<img>` in a question, download the FULL-SIZE image (never the
   `-300x…` / `-768x…` / `-20x13…` srcset variants, never site chrome such as favicons or
   gravatar) to `public/images/{module-id}/qN-exhibit.<ext>` and set the `exhibit` field
   (`src`, `alt`, and the REAL width/height read from the downloaded file with `file`).
   Questions without images get no exhibit field.
5. **Register the module**: in `src/features/exams/data/index.ts`, import the new module,
   add it to `availableModules`, and flip its `moduleRegistry` entry to `available: true`.
   Update the matching row in `README.md` from "🚧 Coming soon" to "✅ Available".
6. **Verify before finishing**:
   - `npm run build` must pass cleanly.
   - Smoke-test the exam at the dev server route `/exam/{module-id}` (server URL includes
     the `/ccna2` base path): tab count equals the question count; a choice question checks
     on selection and shows its explanation; a pair question pairs, checks, and shows the
     "Correct matches" table; a True/False question works; multi-line code options keep
     their line breaks; exhibits load; the submit → score-gauge flow works; the home chooser
     card and header drawer now link to the exam.
   - Never modify the Modules 7 - 9 data, the shared engine behavior, or the reference dump.

---

## Fill-in values for each remaining exam

| # | registry id | title | subtitle | group label | source dump |
| --- | --- | --- | --- | --- | --- |
| 1 | `modules-10-13` | `Modules 10 - 13` | `L2 Security and WLANs` | `Checkpoint Exam` | `public/itexamanswers_modules10-13.html` |
| 2 | `modules-14-16` | `Modules 14 - 16` | `Routing Concepts and Configuration` | `Checkpoint Exam` | `public/itexamanswers_modules14-16.html` |
| 3 | `srwe-practice-final` | `SRWEv7 Practice Final Exam` | `CCNA 2 v7 (SRWE)` | `Practice Exam` | `public/itexamanswers_srwe-practice-final.html` |
| 4 | `srwe-final-exam` | `CCNA 2 v7 Course FINAL Exam` | `Switching, Routing, and Wireless Essentials` | `Final Exam` | `public/itexamanswers_srwe-final-exam.html` |

Note: final exams are large and are sometimes saved from a multi-page article; if a dump's
question numbering is not contiguous (e.g. starts at 1 then jumps, or says "Part 2"), say so
in your reply and split the work rather than guessing.
