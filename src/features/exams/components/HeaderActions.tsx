import { useEffect, useState } from "react";
import { Maximize2, Moon, Sun } from "lucide-react";

/**
 * Header action buttons (right side of the top bar):
 *  - theme toggle: switches light/dark mode and persists the choice
 *  - full view:    hides the whole header; the only way out is the Esc key
 */
const THEME_KEY = "ccna-theme";

type Theme = "light" | "dark";

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

export default function HeaderActions() {
  const [theme, setTheme] = useState<Theme>("light");
  const [fullView, setFullView] = useState(false);

  // islands are server-rendered first, so sync to the real (early-set) theme
  // only after hydration
  useEffect(() => {
    setTheme(readTheme());
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent): void {
      if (e.key === "Escape") setFullView(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("full-view", fullView);
  }, [fullView]);

  function toggleTheme(): void {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  }

  return (
    <div className="header-actions">
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
    </div>
  );
}
