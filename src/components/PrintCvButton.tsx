"use client";

export function PrintCvButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="group inline-flex items-center gap-3 text-base font-medium border-b border-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors pb-1 print:hidden"
    >
      <span className="font-mono text-xs text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
        ↓
      </span>
      <span>Imprimer / Enregistrer en PDF</span>
    </button>
  );
}
