"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Loader élégant au premier chargement de la session.
 *
 * Pattern Top 1 mondial :
 *  - Couvre le viewport avec un overlay couleur background (pas de flash blanc)
 *  - "MD" géant Fraunces italique terre cuite (signature visuelle)
 *  - Animation : scale 0.9→1 + opacity 0→1 (apparition)
 *  - Hold 800ms puis fade out 0.6s (sort de la vue)
 *  - sessionStorage : ne s'affiche QU'UNE fois par session (UX recommandée 2026)
 *
 * Évite le piège du loader qui apparaît à chaque navigation interne
 * (frustrant et inutile en SPA).
 */
export function Loader() {
  const [shown, setShown] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);

    // Skip si l'user a déjà vu le loader dans cette session
    if (typeof window !== "undefined" && sessionStorage.getItem("md-loaded")) {
      setShown(false);
      return;
    }

    // Première visite : montre 1.2s puis fade out
    const timer = setTimeout(() => {
      setShown(false);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("md-loaded", "1");
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Avant hydratation : on rend rien (évite hydration mismatch)
  if (!hydrated) return null;

  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--background)]"
          aria-hidden
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-[family-name:var(--font-display)] text-[12rem] md:text-[18rem] italic text-[var(--accent)] leading-none tracking-tighter select-none"
          >
            MD
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
