"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { matchIntents, projectMeta, type Intent } from "@/lib/commandPalette/intents";

/**
 * Command Palette morphologique — l'âme du portfolio.
 *
 * Pattern Top 1 mondial 2026 :
 *  - Cmd+K (ou Ctrl+K) ou "/" pour ouvrir
 *  - L'user tape une INTENTION ("dev react avec stripe", "freelance dakar", "ia/llm")
 *  - Le portfolio comprend l'intent → met en avant les projets pertinents
 *  - Génère un paragraphe contextuel sur-mesure (déterministe pour V1, LLM pour V2)
 *
 * Différence avec une search bar classique : on ne cherche pas du texte,
 * on identifie une INTENTION. C'est l'AI Product Builder mindset.
 */
export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Hook clavier global : Cmd+K, Ctrl+K, ou "/"
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isMod = e.metaKey || e.ctrlKey;
      const isSlash =
        e.key === "/" &&
        !isMod &&
        !(e.target as HTMLElement)?.matches?.("input, textarea, select, [contenteditable]");

      if ((isMod && e.key.toLowerCase() === "k") || isSlash) {
        e.preventDefault();
        setIsOpen((v) => !v);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        setQuery("");
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Autofocus + reset à l'ouverture
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  const matchedIntents = query.trim().length >= 2 ? matchIntents(query, 3) : [];

  const handleAction = useCallback(
    (action: Intent["actions"][number]) => {
      setIsOpen(false);
      setQuery("");

      if (action.kind === "external") {
        window.open(action.url, "_blank", "noopener,noreferrer");
      } else if (action.kind === "route") {
        router.push(action.path);
      } else if (action.kind === "project") {
        const meta = projectMeta[action.slug];
        window.open(meta.href, "_blank", "noopener,noreferrer");
      }
    },
    [router]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="palette-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-start justify-center pt-20 md:pt-32 px-4 backdrop-blur-md bg-black/40"
          onClick={() => setIsOpen(false)}
          aria-modal
          role="dialog"
          aria-label="Command palette"
        >
          <motion.div
            key="palette-modal"
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-2xl border border-[var(--hairline)] bg-[var(--background)] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header avec input + hint clavier */}
            <div className="flex items-center gap-4 px-6 py-5 border-b border-[var(--hairline)]">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                INTENT
              </span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="dev react · ia/llm · freelance dakar..."
                className="flex-1 bg-transparent outline-none font-[family-name:var(--font-display)] text-xl md:text-2xl placeholder:text-[var(--muted)] placeholder:italic text-[var(--foreground)]"
                autoComplete="off"
                spellCheck={false}
              />
              <kbd className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-wider text-[var(--muted)] px-2 py-1 border border-[var(--hairline)]">
                ESC
              </kbd>
            </div>

            {/* État vide : explication + suggestions */}
            {query.trim().length < 2 && (
              <div className="px-6 py-6">
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-4">
                  Comment ça marche
                </div>
                <p className="text-sm text-[var(--muted)] leading-relaxed mb-6 max-w-lg">
                  Tape une intention en langage naturel. Le portfolio identifie
                  l&apos;angle et met en avant les projets pertinents. Pas une
                  recherche textuelle — une lecture d&apos;intention.
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "freelance dakar",
                    "ia llm groq",
                    "supabase postgres",
                    "react nextjs",
                    "contact",
                    "e-commerce stripe",
                  ].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setQuery(s)}
                      className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--muted)] hover:text-[var(--accent)] px-3 py-1.5 border border-[var(--hairline)] hover:border-[var(--accent)] transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Résultats : intents matchés */}
            {query.trim().length >= 2 && matchedIntents.length === 0 && (
              <div className="px-6 py-10 text-center">
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-2">
                  Aucun intent matché
                </div>
                <p className="text-sm text-[var(--muted)] italic">
                  Essaie : <span className="text-[var(--accent)]">ia</span>,{" "}
                  <span className="text-[var(--accent)]">react</span>,{" "}
                  <span className="text-[var(--accent)]">freelance</span>,{" "}
                  <span className="text-[var(--accent)]">contact</span>...
                </p>
              </div>
            )}

            {query.trim().length >= 2 && matchedIntents.length > 0 && (
              <motion.div
                key={`results-${query}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="max-h-[60vh] overflow-y-auto"
              >
                {matchedIntents.map((intent, intentIdx) => (
                  <motion.div
                    key={intent.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: intentIdx * 0.06 }}
                    className="border-b border-[var(--hairline)] last:border-b-0 px-6 py-5"
                  >
                    {/* Catégorie + réponse contextuelle */}
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] mb-2">
                      {intent.category} · matched
                    </div>
                    <p className="text-sm text-[var(--foreground)] leading-relaxed mb-4">
                      {intent.response(query)}
                    </p>

                    {/* Actions : projets / liens / routes */}
                    <div className="flex flex-col gap-1.5">
                      {intent.actions.map((action, actionIdx) => {
                        const label =
                          action.kind === "project"
                            ? `${projectMeta[action.slug].name} — ${projectMeta[action.slug].tag}`
                            : action.label;
                        return (
                          <button
                            key={actionIdx}
                            type="button"
                            onClick={() => handleAction(action)}
                            data-cursor-text={
                              action.kind === "project"
                                ? projectMeta[action.slug].cursorText
                                : undefined
                            }
                            className="group flex items-center justify-between gap-4 text-left py-2 px-3 -mx-3 hover:bg-[var(--hairline)]/40 transition-colors"
                          >
                            <span className="flex items-center gap-3 min-w-0">
                              <span className="font-mono text-[10px] text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors shrink-0">
                                →
                              </span>
                              <span className="font-[family-name:var(--font-display)] text-base md:text-lg group-hover:text-[var(--accent)] transition-colors truncate">
                                {label}
                              </span>
                            </span>
                            <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--muted)] shrink-0">
                              {action.kind}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Footer : hints clavier */}
            <div className="flex items-center justify-between gap-4 px-6 py-3 border-t border-[var(--hairline)] bg-[var(--hairline)]/20">
              <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-wider text-[var(--muted)]">
                <span>
                  <kbd className="text-[var(--foreground)]">Cmd+K</kbd> ouvrir
                </span>
                <span>
                  <kbd className="text-[var(--foreground)]">/</kbd> aussi
                </span>
                <span>
                  <kbd className="text-[var(--foreground)]">Esc</kbd> fermer
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)]">
                Intent v1 · déterministe
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
