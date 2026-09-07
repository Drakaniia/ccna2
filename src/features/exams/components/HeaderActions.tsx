import { useEffect, useRef, useState } from "react";
import { Maximize2, Moon, Settings, Sun } from "lucide-react";
import { getStoredLimit, setStoredLimit } from "../lib/exam-limits";
import { getState } from "../lib/quiz-state";

/**
 * Header action buttons (right side of the top bar):
 *  - settings: opens modal to limit how many items to take (per exam, random subset)
 *  - theme toggle: switches light/dark mode and persists the choice
 *  - full view:    hides the whole header; the only way out is the Esc key
 */
const THEME_KEY = "ccna-theme";

type Theme = "light" | "dark";

interface Props {
  /** Only set inside /exam/[module] — when absent the settings button is hidden. */
  moduleId?: string;
  maxQuestions?: number;
}

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* private mode — keep the theme for this visit only */
  }
}

export default function HeaderActions({ moduleId, maxQuestions }: Props) {
  const [theme, setTheme] = useState<Theme>("light");
  const [fullView, setFullView] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [draft, setDraft] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingRestart, setPendingRestart] = useState<{
    prev: number | null;
    next: number | null;
    snapshotLen: number;
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const confirmPrimaryRef = useRef<HTMLButtonElement>(null);

  const hasSettings = !!moduleId && typeof maxQuestions === "number" && maxQuestions > 0;
  const max = maxQuestions ?? 0;

  // islands are server-rendered first, so sync to the real (early-set) theme
  // only after hydration
  useEffect(() => {
    setTheme(readTheme());
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent): void {
      if (e.key === "Escape") {
        if (confirmOpen) {
          setConfirmOpen(false);
          setPendingRestart(null);
        } else if (settingsOpen) {
          setSettingsOpen(false);
        } else {
          setFullView(false);
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [settingsOpen, confirmOpen]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("full-view", fullView);
  }, [fullView]);

  // Keep draft in sync when modal opens (read stored limit)
  useEffect(() => {
    if (settingsOpen && hasSettings && moduleId) {
      const stored = getStoredLimit(moduleId);
      setDraft(stored === null ? "" : String(stored));
      setError("");
      // focus input after open animation
      requestAnimationFrame(() => inputRef.current?.focus());
    }
    // prevent background scroll when any modal is open
    const anyOpen = settingsOpen || confirmOpen;
    if (anyOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      if (!anyOpen) document.body.style.overflow = "";
    };
  }, [settingsOpen, confirmOpen, hasSettings, moduleId]);

  // focus confirm primary when confirm opens
  useEffect(() => {
    if (confirmOpen) {
      requestAnimationFrame(() => confirmPrimaryRef.current?.focus());
    }
  }, [confirmOpen]);

  // restore focus to trigger on close of both modals
  useEffect(() => {
    if (!settingsOpen && !confirmOpen) {
      // small delay to allow close animation
      const t = window.setTimeout(() => triggerRef.current?.focus(), 120);
      return () => window.clearTimeout(t);
    }
  }, [settingsOpen, confirmOpen]);

  function toggleTheme(): void {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  }

  function validateAndApply(): void {
    if (!hasSettings || !moduleId) return;
    const trimmed = draft.trim();
    // empty => All
    if (trimmed === "") {
      const prev = getStoredLimit(moduleId);
      setStoredLimit(moduleId, null);
      setSettingsOpen(false);
      maybeTriggerRestart(prev, null);
      return;
    }
    const n = Number(trimmed);
    if (!Number.isFinite(n) || !Number.isInteger(n)) {
      setError("Enter a whole number.");
      return;
    }
    if (n < 1) {
      setError("Minimum is 1.");
      return;
    }
    if (n > max) {
      setError(`Maximum is ${max} (total questions).`);
      return;
    }
    const prev = getStoredLimit(moduleId);
    // if n === max treat as All (clear) to keep storage tidy
    const toStore: number | null = n === max ? null : n;
    setStoredLimit(moduleId, toStore);
    setSettingsOpen(false);
    maybeTriggerRestart(prev, toStore);
  }

  function maybeTriggerRestart(prev: number | null, next: number | null): void {
    // if exam not started (phase intro, no state) -> nothing to restart
    const st = getState();
    if (!st) return;
    const prevEff = prev ?? max;
    const nextEff = next ?? max;
    if (prevEff === nextEff) return;
    // exam in progress (quiz/submit/result)
    const isInProgress = st.phase === "quiz" || st.phase === "submit";
    if (!isInProgress) return;
    setPendingRestart({ prev, next, snapshotLen: st.order.length });
    setConfirmOpen(true);
  }

  function handleConfirmRestart(): void {
    if (!pendingRestart || !moduleId) {
      setConfirmOpen(false);
      return;
    }
    const snapshotLen = pendingRestart.snapshotLen;
    setConfirmOpen(false);
    setPendingRestart(null);
    const ev = new CustomEvent("exam:limit-apply-restart", { detail: { moduleId } });
    document.dispatchEvent(ev);
    // Small timeout to allow exam page to handle reboot; if still same state, reload
    window.setTimeout(() => {
      const cur = getState();
      if (cur && cur.order.length === snapshotLen) {
        window.location.reload();
      }
    }, 250);
  }

  function handleCancelRestart(): void {
    setConfirmOpen(false);
    setPendingRestart(null);
  }

  function applyPreset(v: number | null): void {
    if (!hasSettings) return;
    if (v === null) {
      setDraft("");
      setError("");
    } else {
      const clamped = Math.min(v, max);
      setDraft(String(clamped));
      setError("");
    }
    inputRef.current?.focus();
  }

  return (
    <div className="header-actions">
      {hasSettings && (
        <button
          ref={triggerRef}
          type="button"
          className="hdr-btn"
          onClick={() => setSettingsOpen(true)}
          aria-label="Exam settings"
          aria-haspopup="dialog"
          aria-expanded={settingsOpen}
          title="Exam settings"
        >
          <Settings size={18} />
        </button>
      )}
      <button
        type="button"
        className="hdr-btn"
        onClick={toggleTheme}
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        title={theme === "dark" ? "Light mode" : "Dark mode"}
      >
        {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
      </button>
      <button
        type="button"
        className="hdr-btn"
        onClick={() => setFullView(true)}
        aria-label="Full view"
        aria-pressed={fullView}
        title="Full view (press Esc to exit)"
      >
        <Maximize2 size={18} />
      </button>

      {hasSettings && settingsOpen && (
        <div
          className="settings-scrim is-open"
          onClick={() => setSettingsOpen(false)}
          aria-hidden="true"
        >
          <div
            className="settings-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="settingsTitle"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="settings-head">
              <h2 id="settingsTitle">Exam settings</h2>
              <button
                type="button"
                className="settings-close"
                onClick={() => setSettingsOpen(false)}
                aria-label="Close settings"
              >
                ×
              </button>
            </div>

            <p className="settings-desc">
              Choose how many items to take. A random subset will be selected when the exam starts. Leave empty for all {max} questions.
            </p>

            <label className="settings-field" htmlFor="settingsLimit">
              <span className="settings-label">Number of items</span>
              <input
                ref={inputRef}
                id="settingsLimit"
                type="number"
                inputMode="numeric"
                min={1}
                max={max}
                placeholder={`All (${max})`}
                value={draft}
                onChange={(e) => {
                  setDraft(e.target.value);
                  if (error) setError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    validateAndApply();
                  }
                }}
              />
            </label>
            {error ? (
              <p className="settings-error" role="alert">
                {error}
              </p>
            ) : (
              <p className="settings-hint">
                Min 1 · Max {max} · Empty = all questions
              </p>
            )}

            <div className="settings-presets" aria-label="Quick options">
              {[10, 20, 50].map((v) => (
                <button
                  key={v}
                  type="button"
                  className="preset-btn"
                  onClick={() => applyPreset(v)}
                  disabled={v > max}
                  title={v > max ? `Only ${max} available` : `Set to ${v}`}
                >
                  {v}
                </button>
              ))}
              <button type="button" className="preset-btn preset-all" onClick={() => applyPreset(null)}>
                All
              </button>
            </div>

            <div className="settings-actions">
              <button type="button" className="link-btn" onClick={() => setSettingsOpen(false)}>
                Cancel
              </button>
              <button type="button" className="primary" onClick={validateAndApply}>
                Apply
              </button>
            </div>

            <p className="settings-foot">Takes effect on next start. If an exam is in progress, you’ll be asked to restart.</p>
          </div>
        </div>
      )}

      {confirmOpen && pendingRestart && (
        <div className="settings-scrim is-open confirm-scrim" onClick={handleCancelRestart} aria-hidden="true">
          <div
            className="settings-modal confirm-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirmTitle"
            aria-describedby="confirmDesc"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="confirm-icon" aria-hidden="true">
              <span>↻</span>
            </div>
            <h2 id="confirmTitle" className="confirm-title">
              Restart exam?
            </h2>
            <p id="confirmDesc" className="confirm-desc">
              Question limit changed to{" "}
              <strong>{pendingRestart.next === null ? `All (${max})` : pendingRestart.next}</strong>. Restart now with a new random set of{" "}
              {pendingRestart.next === null ? max : pendingRestart.next} questions? Your current progress will be lost.
            </p>
            <div className="settings-actions confirm-actions">
              <button type="button" className="link-btn" onClick={handleCancelRestart}>
                Keep current exam
              </button>
              <button ref={confirmPrimaryRef} type="button" className="primary confirm-primary" onClick={handleConfirmRestart}>
                Restart now
              </button>
            </div>
            <p className="settings-foot">If you keep the current exam, the new limit will apply on the next start.</p>
          </div>
        </div>
      )}
    </div>
  );
}
