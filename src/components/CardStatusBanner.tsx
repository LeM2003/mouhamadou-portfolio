"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Status banner vivant pour /card.
 *
 * Affiche en monospace uppercase :
 *  ● DISPONIBLE · HH:MM DAKAR · [phrase qui rotate toutes les 5s]
 *
 * Pattern Top 1 mondial (Baptiste Briel-style) : la signature vivante
 * qui prouve que le portfolio n'est pas un fichier mort.
 */

const ROTATING_PHRASES = [
  "OPEN TO FREELANCE & COLLABORATIONS",
  "BUILDING PERSONAL OS V2",
  "MASTER DS/IA · SHIPPING WEEKLY",
];

function formatDakarTime(): string {
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Africa/Dakar",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

export function CardStatusBanner() {
  const [time, setTime] = useState<string>("--:--");
  const [phraseIdx, setPhraseIdx] = useState(0);

  useEffect(() => {
    setTime(formatDakarTime());
    const tickClock = setInterval(() => setTime(formatDakarTime()), 60_000);
    const rotate = setInterval(
      () => setPhraseIdx((i) => (i + 1) % ROTATING_PHRASES.length),
      5_000
    );
    return () => {
      clearInterval(tickClock);
      clearInterval(rotate);
    };
  }, []);

  return (
    <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-12 flex items-center gap-3 flex-wrap">
      <span className="flex items-center gap-2">
        <motion.span
          aria-hidden
          className="inline-block w-2 h-2 rounded-full bg-[var(--accent)]"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="text-[var(--foreground)]">Disponible</span>
      </span>

      <span className="opacity-50">·</span>

      <span suppressHydrationWarning>
        {time} <span className="opacity-60">Dakar</span>
      </span>

      <span className="opacity-50">·</span>

      <span className="overflow-hidden inline-flex items-center min-w-[18ch]">
        <AnimatePresence mode="wait">
          <motion.span
            key={phraseIdx}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="text-[var(--accent)] inline-block"
          >
            {ROTATING_PHRASES[phraseIdx]}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}
