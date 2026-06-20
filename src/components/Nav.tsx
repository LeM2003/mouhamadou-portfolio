import Link from "next/link";
import { TimeAwareStatus } from "./TimeAwareStatus";
import { CommandPaletteTrigger } from "./CommandPaletteTrigger";

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
        {/* Indice Command Palette — découvrabilité (Client Component dédié) */}
        <CommandPaletteTrigger />
        <Link
          href="/#projects"
          className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
        >
          Projets
        </Link>
        <Link
          href="/services"
          className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
        >
          Services
        </Link>
        <Link
          href="/lab/rag"
          className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors hidden lg:inline"
        >
          Lab
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
