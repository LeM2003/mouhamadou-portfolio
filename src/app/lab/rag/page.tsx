"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Nav } from "@/components/Nav";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  corpus,
  chunkQuery,
  projectQuery,
  retrieve,
} from "@/lib/ragPlayground/corpus";

/**
 * /lab/rag — RAG Playground visuel.
 *
 * Le visiteur tape une phrase et VOIT en direct :
 *   1. CHUNKING : sa query est décomposée en tokens
 *   2. EMBEDDING : sa query est projetée en 2D dans l'espace sémantique
 *      du corpus (10 documents sur les projets de Mouhamadou)
 *   3. RETRIEVAL : les 3 chunks les plus proches sont mis en avant
 *
 * Pédagogique : on rend visible ce qui se passe quand on dit "RAG"
 * — chunking, embeddings, retrieval. C'est l'arme contre le "chatbot collé".
 *
 * V1 : déterministe (mots-clés → coords 2D). V2 : Groq API embeddings réels.
 */

export default function RagPlaygroundPage() {
  const [query, setQuery] = useState("");
  const [hasRun, setHasRun] = useState(false);

  const tokens = useMemo(() => chunkQuery(query), [query]);
  const queryPos = useMemo(() => projectQuery(query), [query]);
  const retrieved = useMemo(() => (query ? retrieve(query, 3) : []), [query]);
  const retrievedIds = new Set(retrieved.map((r) => r.id));

  const [answerState, setAnswerState] = useState<
    | { status: "idle" }
    | { status: "loading" }
    | { status: "error"; message: string }
    | { status: "done"; answer: string; sources: { ref: number; source: string }[] }
  >({ status: "idle" });

  function handleRun(value: string) {
    setQuery(value);
    setHasRun(value.trim().length >= 2);
    setAnswerState({ status: "idle" });
  }

  async function handleGenerate() {
    if (!query.trim() || retrieved.length === 0) return;
    setAnswerState({ status: "loading" });
    try {
      const res = await fetch("/api/rag/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          chunkIds: retrieved.map((r) => r.id),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAnswerState({
          status: "error",
          message: data.error || "Erreur inconnue.",
        });
        return;
      }
      setAnswerState({ status: "done", answer: data.answer, sources: data.sources });
    } catch {
      setAnswerState({
        status: "error",
        message: "Impossible de joindre le service de génération.",
      });
    }
  }

  return (
    <main className="flex-1 flex flex-col">
      <Nav />

      {/* ── HERO ── */}
      <section className="px-6 md:px-12 lg:px-20 pt-16 md:pt-24 pb-12 max-w-6xl mx-auto w-full">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-8 flex items-center gap-3">
          <span>/lab/rag</span>
          <span className="w-8 h-px bg-[var(--hairline)]" />
          <span>RAG visuel · v1 déterministe</span>
        </div>

        <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl lg:text-7xl font-normal leading-[0.95] tracking-tight max-w-4xl">
          Le RAG n&apos;est pas magique.{" "}
          <span className="text-[var(--accent)] italic">
            Voici exactement
          </span>{" "}
          ce qu&apos;il fait.
        </h1>

        <p className="mt-8 max-w-2xl text-base md:text-lg text-[var(--muted)] leading-relaxed">
          Tape une phrase ci-dessous. Tu vas voir comment elle est chunkée,
          projetée en vecteur 2D, puis comment l&apos;algorithme trouve les{" "}
          <em>k voisins les plus proches</em> dans un mini-corpus sur mes
          projets. C&apos;est l&apos;épine dorsale de tout RAG en prod.
        </p>
      </section>

      {/* ── INPUT ── */}
      <section className="px-6 md:px-12 lg:px-20 pb-8 max-w-6xl mx-auto w-full">
        <div className="border border-[var(--hairline)] focus-within:border-[var(--accent)] transition-colors p-1">
          <div className="flex items-center gap-3 px-4 md:px-6">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)] shrink-0">
              QUERY
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => handleRun(e.target.value)}
              placeholder="ex. plateforme de formation supabase rls..."
              className="flex-1 bg-transparent outline-none font-[family-name:var(--font-display)] text-xl md:text-2xl py-5 placeholder:text-[var(--muted)] placeholder:italic text-[var(--foreground)]"
              autoComplete="off"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Exemples cliquables */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--muted)] py-1.5 mr-2">
            essaie:
          </span>
          {[
            "plateforme formation supabase",
            "assistant ia local groq",
            "freelance dakar mvp",
            "import multi-currency",
            "communauté musulmane pwa",
          ].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleRun(s)}
              className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--muted)] hover:text-[var(--accent)] px-3 py-1.5 border border-[var(--hairline)] hover:border-[var(--accent)] transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      {/* ── STAGE 1 : CHUNKING ── */}
      <ScrollReveal>
        <section className="px-6 md:px-12 lg:px-20 py-16 max-w-6xl mx-auto w-full border-t border-[var(--hairline)]">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-6 flex items-center gap-3">
            <span>01</span>
            <span className="w-8 h-px bg-[var(--hairline)]" />
            <span>Chunking</span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl mb-6">
            Ta query est{" "}
            <span className="text-[var(--accent)] italic">décomposée</span> en
            tokens.
          </h2>

          {tokens.length === 0 ? (
            <p className="font-mono text-sm text-[var(--muted)] italic">
              ↳ tape une query pour voir les tokens apparaître
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              <AnimatePresence mode="popLayout">
                {tokens.map((t, i) => (
                  <motion.span
                    key={`${t}-${i}`}
                    layout
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      duration: 0.25,
                      delay: i * 0.03,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="font-mono text-sm md:text-base px-3 py-1.5 border border-[var(--accent)]/40 bg-[var(--accent)]/5 text-[var(--foreground)]"
                  >
                    {t}
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>
      </ScrollReveal>

      {/* ── STAGE 2 : EMBEDDING (projection 2D) ── */}
      <ScrollReveal>
        <section className="px-6 md:px-12 lg:px-20 py-16 max-w-6xl mx-auto w-full border-t border-[var(--hairline)]">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-6 flex items-center gap-3">
            <span>02</span>
            <span className="w-8 h-px bg-[var(--hairline)]" />
            <span>Embedding · projection 2D</span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl mb-4">
            Chaque chunk devient un{" "}
            <span className="text-[var(--accent)] italic">point</span> dans
            l&apos;espace sémantique.
          </h2>
          <p className="font-mono text-xs text-[var(--muted)] mb-8 max-w-xl leading-relaxed">
            En vrai, c&apos;est R<sup>1536</sup> (OpenAI) ou R<sup>768</sup>{" "}
            (sentence-transformers). On projette ici en R<sup>2</sup> pour
            que ton cerveau humain capte. L&apos;étoile = ta query.
          </p>

          {/* Canvas SVG 2D */}
          <div className="relative w-full aspect-square max-w-2xl mx-auto border border-[var(--hairline)] bg-[var(--background)]">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Grille discrète */}
              <defs>
                <pattern
                  id="grid"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 10 0 L 0 0 0 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.15"
                    opacity="0.18"
                  />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />

              {/* Lignes axes */}
              <line
                x1="0"
                y1="50"
                x2="100"
                y2="50"
                stroke="currentColor"
                strokeWidth="0.2"
                opacity="0.3"
                strokeDasharray="1 1"
              />
              <line
                x1="50"
                y1="0"
                x2="50"
                y2="100"
                stroke="currentColor"
                strokeWidth="0.2"
                opacity="0.3"
                strokeDasharray="1 1"
              />

              {/* Lignes vers les retrieved (apparaissent si hasRun) */}
              <AnimatePresence>
                {hasRun &&
                  retrieved.map((r) => (
                    <motion.line
                      key={`line-${r.id}`}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.5 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      x1={queryPos.x}
                      y1={queryPos.y}
                      x2={r.coords.x}
                      y2={r.coords.y}
                      stroke="var(--accent)"
                      strokeWidth="0.3"
                    />
                  ))}
              </AnimatePresence>

              {/* Points du corpus */}
              {corpus.map((chunk, i) => {
                const isRetrieved = retrievedIds.has(chunk.id);
                return (
                  <motion.g
                    key={chunk.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                  >
                    <motion.circle
                      cx={chunk.coords.x}
                      cy={chunk.coords.y}
                      r={isRetrieved && hasRun ? 2.6 : 1.4}
                      fill={
                        isRetrieved && hasRun ? "var(--accent)" : "currentColor"
                      }
                      opacity={isRetrieved && hasRun ? 1 : 0.4}
                      animate={{
                        r: isRetrieved && hasRun ? 2.6 : 1.4,
                        opacity: isRetrieved && hasRun ? 1 : 0.4,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    {isRetrieved && hasRun && (
                      <motion.text
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        x={chunk.coords.x + 3}
                        y={chunk.coords.y + 0.5}
                        fontSize="2"
                        fill="var(--accent)"
                        className="font-mono"
                      >
                        {chunk.id}
                      </motion.text>
                    )}
                  </motion.g>
                );
              })}

              {/* Étoile query */}
              <AnimatePresence>
                {hasRun && (
                  <motion.g
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <circle
                      cx={queryPos.x}
                      cy={queryPos.y}
                      r="3.5"
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="0.5"
                    >
                      <animate
                        attributeName="r"
                        from="3.5"
                        to="6"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.8"
                        to="0"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      cx={queryPos.x}
                      cy={queryPos.y}
                      r="1.8"
                      fill="var(--accent)"
                    />
                    <text
                      x={queryPos.x + 3}
                      y={queryPos.y - 2}
                      fontSize="2.5"
                      fill="var(--accent)"
                      className="font-mono"
                      style={{ fontStyle: "italic" }}
                    >
                      query
                    </text>
                  </motion.g>
                )}
              </AnimatePresence>
            </svg>
          </div>
        </section>
      </ScrollReveal>

      {/* ── STAGE 3 : RETRIEVAL ── */}
      <ScrollReveal>
        <section className="px-6 md:px-12 lg:px-20 py-16 max-w-6xl mx-auto w-full border-t border-[var(--hairline)]">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-6 flex items-center gap-3">
            <span>03</span>
            <span className="w-8 h-px bg-[var(--hairline)]" />
            <span>Retrieval · k-nearest neighbors</span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl mb-8">
            Les{" "}
            <span className="text-[var(--accent)] italic">3 chunks</span> les
            plus proches de ta query.
          </h2>

          {retrieved.length === 0 ? (
            <p className="font-mono text-sm text-[var(--muted)] italic">
              ↳ tape une query pour voir les chunks remonter
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              <AnimatePresence mode="popLayout">
                {retrieved.map((r, i) => (
                  <motion.div
                    key={r.id}
                    layout
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                    className="grid grid-cols-12 gap-4 py-4 border-b border-[var(--hairline)]"
                  >
                    <div className="col-span-2 md:col-span-1 font-[family-name:var(--font-display)] text-3xl md:text-4xl text-[var(--accent)] italic leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="col-span-10 md:col-span-8">
                      <div className="text-sm md:text-base text-[var(--foreground)] leading-relaxed mb-2">
                        {r.text}
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted)]">
                        ↳ {r.source}
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-3 flex md:justify-end items-start">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted)]">
                        distance{" "}
                        <span className="text-[var(--accent)]">
                          {r.dist.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>
      </ScrollReveal>

      {/* ── STAGE 4 : GÉNÉRATION (vrai LLM, ancré sur le retrieval) ── */}
      <ScrollReveal>
        <section className="px-6 md:px-12 lg:px-20 py-16 max-w-6xl mx-auto w-full border-t border-[var(--hairline)]">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-6 flex items-center gap-3">
            <span>04</span>
            <span className="w-8 h-px bg-[var(--hairline)]" />
            <span>Génération · réponse ancrée</span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl mb-6">
            La seule étape qui a besoin d&apos;un{" "}
            <span className="text-[var(--accent)] italic">vrai LLM</span>.
          </h2>
          <p className="font-mono text-xs text-[var(--muted)] mb-8 max-w-xl leading-relaxed">
            Le retrieval ci-dessus reste 100% déterministe (c&apos;est le
            point pédagogique). Ce bouton envoie les {retrieved.length || 3}{" "}
            chunks récupérés à un modèle Groq, avec ordre strict : répondre
            uniquement à partir de ces extraits, citer les sources, ou dire
            explicitement qu&apos;il n&apos;a pas l&apos;info plutôt
            qu&apos;inventer.
          </p>

          {retrieved.length === 0 ? (
            <p className="font-mono text-sm text-[var(--muted)] italic">
              ↳ tape une query pour activer la génération
            </p>
          ) : (
            <div>
              <button
                type="button"
                onClick={handleGenerate}
                disabled={answerState.status === "loading"}
                className="font-mono text-xs uppercase tracking-[0.15em] px-5 py-3 border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--background)] transition-colors disabled:opacity-40"
              >
                {answerState.status === "loading"
                  ? "Génération…"
                  : "Générer une réponse ancrée"}
              </button>

              <AnimatePresence mode="wait">
                {answerState.status === "error" && (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 font-mono text-xs text-[var(--muted)] italic max-w-xl"
                  >
                    ↳ {answerState.message}
                  </motion.p>
                )}

                {answerState.status === "done" && (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-8 max-w-2xl border-l-2 border-[var(--accent)] pl-6"
                  >
                    <p className="text-base md:text-lg text-[var(--foreground)] leading-relaxed">
                      {answerState.answer}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-wider text-[var(--muted)]">
                      {answerState.sources.map((s) => (
                        <span key={s.ref}>
                          [{s.ref}] {s.source}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </section>
      </ScrollReveal>

      {/* ── FOOTER ── */}
      <section className="px-6 md:px-12 lg:px-20 py-16 max-w-6xl mx-auto w-full border-t border-[var(--hairline)]">
        <p className="text-sm text-[var(--muted)] leading-relaxed max-w-2xl">
          <strong className="text-[var(--foreground)]">Retrieval — déterministe :</strong>{" "}
          les coordonnées 2D sont calculées par matching de mots-clés (pas
          un vrai embedding LLM). Volontaire — c&apos;est ce qui rend la
          mécanique du RAG visible plutôt qu&apos;une boîte noire.
          <br />
          <br />
          <strong className="text-[var(--foreground)]">Génération — réelle :</strong>{" "}
          l&apos;étape 04 appelle un vrai modèle (Groq, <code>llama-3.1-8b-instant</code>)
          ancré strictement sur les chunks récupérés ci-dessus. Note technique :
          Groq n&apos;expose pas d&apos;endpoint d&apos;embeddings à ce jour —
          la projection 2D restera donc déterministe tant qu&apos;un
          fournisseur d&apos;embeddings (ou un modèle client-side type
          transformers.js) n&apos;est pas branché à la place.
        </p>
      </section>

      <footer className="px-6 md:px-12 lg:px-20 py-12 mt-auto border-t border-[var(--hairline)]">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-[var(--muted)] font-mono">
          <div>© {new Date().getFullYear()} Mouhamadou Diouf</div>
          <div>/lab/rag · retrieval déterministe + génération Groq</div>
        </div>
      </footer>
    </main>
  );
}
