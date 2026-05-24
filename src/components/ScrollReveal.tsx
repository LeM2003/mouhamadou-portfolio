"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Décalage en pixels appliqué au démarrage (sera annulé vers 0). Default: 24 */
  y?: number;
  /** Délai avant le début de l'animation (s). Utile pour staggered cascade. Default: 0 */
  delay?: number;
  /** Fraction d'élément visible avant déclenchement (0-1). Default: 0.2 (20%) */
  amount?: number;
  /** Durée totale de l'animation (s). Default: 0.6 */
  duration?: number;
  className?: string;
};

/**
 * Wrapper qui fait apparaître son enfant au scroll (fade + slide-up).
 *
 * Pattern Top 1 mondial (Baptiste Briel, Dennis Snellenberg) :
 *  - opacity 0 → 1 + y +24 → 0 = "ça monte et apparaît"
 *  - easing cubic-bezier(0.22, 1, 0.36, 1) = très smooth en fin de course
 *  - once: true = n'anime qu'au premier passage (pas à chaque scroll-up)
 *  - Respecte prefers-reduced-motion automatiquement (Framer Motion l'intègre)
 */
export function ScrollReveal({
  children,
  y = 24,
  delay = 0,
  amount = 0.2,
  duration = 0.6,
  className,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
