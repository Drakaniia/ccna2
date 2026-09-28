import { useEffect, useState } from "react";
import { LogIn, LogOut, Users } from "lucide-react";
import {
  currentPath,
  fetchSession,
  loginPageUrl,
  signOut,
  sitePath,
  type SessionResponse,
} from "./auth-client";

interface Props {
  /**
   * Set by the exam page so a signed-out visitor still gets a sign-in link in
   * the header. Left off on the public chooser, where the chip stays invisible
   * while signed out.
   */
  showSignedOut?: boolean;
}

/**
 * Signed-in account chip for the exam header (spec §9, decision 24).
 * Renders nothing while loading or when signed out — unless `showSignedOut` is
 * set, in which case signed out means a compact link to the login page.
 */
export default function AccountChip({ showSignedOut = false }: Props) {
  const [session, setSession] = useState<SessionResponse | null>(null);
  const [signInHref, setSignInHref] = useState(sitePath("login"));

  useEffect(() => {
    let alive = true;
    fetchSession().then((s) => {
      if (alive) setSession(s);
    });
    return () => {
      alive = false;
    };
  }, []);

  // islands are server-rendered first, and the return path is only knowable
  // from `window`, so the href is filled in after hydration
  useEffect(() => {
    if (!showSignedOut || typeof window === "undefined") return;
    setSignInHref(loginPageUrl(currentPath()));
  }, [showSignedOut]);

  const user = session?.authenticated ? session.user : undefined;
  if (!user) {
    if (!showSignedOut || !session) return null;
    return (
      <div className="account-chip">
        <a
          className="account-admin"
          href={signInHref}
          data-signin
          title="Sign in with your Buksu student account"
        >
          <LogIn size={14} />
          <span>Sign in</span>
        </a>
      </div>
    );
  }

  // Only admins can open the roster (the Worker re-checks the role server-side),
  // so the link is rendered from the session rather than for everyone.
  const isAdmin = user.role === "admin";

  const label = user.name?.trim() || user.studentId || user.email;
  const initials = label
    .split(/\s+/)
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="account-chip" title={user.email}>
      {user.picture ? (
        <img
          className="account-avatar"
          src={user.picture}
          alt=""
          width={26}
          height={26}
          referrerPolicy="no-referrer"
        />
      ) : (
        <span className="account-avatar account-avatar-fallback" aria-hidden="true">
          {initials}
        </span>
      )}
      <span className="account-name">{label}</span>
      {isAdmin && (
        <a
          className="account-admin"
          href={sitePath("admin/")}
          aria-label="Student roster"
          title="Student roster"
        >
          <Users size={14} />
          <span className="account-admin-label">Roster</span>
        </a>
      )}
      <button
        type="button"
        className="hdr-btn account-signout"
        onClick={() => void signOut(sitePath("login"))}
        aria-label="Sign out"
        title="Sign out"
      >
        <LogOut size={16} />
      </button>
    </div>
  );
}
