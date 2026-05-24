"use client";

/**
 * Bouton "Intent ⌘K" visible dans la nav — déclenche l'ouverture
 * de la <CommandPalette /> en simulant un Cmd+K synthétique.
 *
 * Extrait en Client Component séparé pour que Nav.tsx puisse rester
 * Server Component (best practice Next.js App Router 16).
 */
export function CommandPaletteTrigger() {
  return (
    <button
      type="button"
      aria-label="Ouvrir la command palette (raccourci Cmd+K)"
      onClick={() => {
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
  );
}
