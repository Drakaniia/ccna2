import { useEffect, useState } from "react";
import { LogOut, Users } from "lucide-react";
import { fetchSession, signOut, sitePath, type SessionResponse } from "./auth-client";

/**
 * Signed-in account chip for the exam header (spec §9, decision 24).
 * Renders nothing while loading or when signed out, so public pages stay clean.
 */
export default function AccountChip() {
  const [session, setSession] = useState<SessionResponse | null>(null);

  useEffect(() => {
    let alive = true;
    fetchSession().then((s) => {
      if (alive) setSession(s);
    });
    return () => {
      alive = false;
    };
  }, []);

  const user = session?.authenticated ? session.user : undefined;
  if (!user) return null;

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
