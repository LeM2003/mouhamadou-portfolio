import Link from "next/link";
import { TimeAwareStatus } from "./TimeAwareStatus";

export function Nav() {
  return (
    <nav className="px-6 md:px-12 lg:px-20 py-8 flex items-center justify-between gap-6">
      <Link
        href="/"
        className="font-[family-name:var(--font-display)] text-xl tracking-tight shrink-0"
      >
        MD
      </Link>

      {/* Status live (humanise — signature Baptiste Briel-style) */}
      <div className="hidden md:flex flex-1 justify-center">
        <TimeAwareStatus />
      </div>

      <div className="flex items-center gap-6 lg:gap-8 text-xs uppercase tracking-[0.15em]">
        {/* Indice Command Palette — découvrabilité */}
        <button
          type="button"
          aria-label="Ouvrir la command palette"
          onClick={() => {
            // Déclenche Cmd+K synthétiquement
            const event = new KeyboardEvent("keydown", {
              key: "k",
              metaKey: true,
              bubbles: true,
            });
            window.dispatchEvent(event);
          }}
          className="hidden md:flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--muted)] hover:text-[var(--accent)] px-2 py-1 border border-[var(--hairline)] hover:border-[var(--accent)] transition-colors"
        >
          <span>Intent</span>
          <kbd className="text-[9px] opacity-70">⌘K</kbd>
        </button>
        <Link
          href="/#projects"
          className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
        >
          Projets
        </Link>
        <Link
          href="/now"
          className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors hidden lg:inline"
        >
          Maintenant
        </Link>
        <Link
          href="/card"
          className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
        >
          Carte
        </Link>
        <a
          href="https://github.com/LeM2003"
          target="_blank"
          rel="noreferrer"
          className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors font-mono hidden lg:inline"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/mouhamadoudiouf"
          target="_blank"
          rel="noreferrer"
          className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors font-mono hidden lg:inline"
        >
          LinkedIn
        </a>
      </div>
    </nav>
  );
}
