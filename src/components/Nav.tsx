import Link from "next/link";
import { CommandPaletteTrigger } from "./CommandPaletteTrigger";

export function Nav() {
  return (
    <nav className="print:hidden px-6 md:px-12 lg:px-20 py-5 md:py-8 border-b border-[var(--hairline)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Link
          href="/"
          className="text-lg md:text-xl tracking-tight shrink-0"
          aria-label="Accueil — Mouhamadou Diouf"
        >
          <span className="font-sans">Mouhamadou </span>
          <span className="font-[family-name:var(--font-display)] italic text-[var(--accent)]">Diouf.</span>
        </Link>

        <div className="flex items-center justify-between md:justify-end gap-5 md:gap-8 text-[11px] md:text-xs uppercase tracking-[0.15em]">
          <CommandPaletteTrigger />
          <Link href="/#realisations" className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
            Réalisations
          </Link>
          <Link href="/services" className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
            Services
          </Link>
          <Link href="/#contact" className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
