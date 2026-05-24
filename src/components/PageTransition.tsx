"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Transition entre routes Next.js App Router.
 *
 * Pattern Top 1 mondial 2026 :
 *  - usePathname() pour avoir une key unique par route
 *  - AnimatePresence mode="wait" : la page sortante s'anime avant que la nouvelle entre
 *  - Animation : fade + slide subtil (8px → 0 → -8px) = sensation de "page qui glisse"
 *  - Durée 0.4s : ni trop rapide (manque le wow) ni trop lent (frustre)
 *
 * NB : Next.js 16 a aussi la View Transitions API native, mais
 * AnimatePresence reste plus portable (Safari iOS, Firefox).
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="flex-1 flex flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
