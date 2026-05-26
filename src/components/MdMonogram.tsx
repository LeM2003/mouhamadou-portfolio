"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * "MD" — monogramme signature de Mouhamadou Diouf sur /card.
 *
 * 2 comportements premium :
 *  1. ScrambleText au mount : chars aléatoires se stabilisent vers "MD"
 *     (signature texte vivant, pattern Stripe Press)
 *  2. Tilt 3D au mouvement souris : l'objet réagit comme s'il avait
 *     du poids physique (signature Vercel AI Gateway)
 *
 * Désactivé sur touch (mouse-only feature).
 * Désactivé si prefers-reduced-motion.
 */

const FINAL = "MD";
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
const SCRAMBLE_DURATION_MS = 900;
const SCRAMBLE_FRAME_MS = 40;

export function MdMonogram() {
  const [display, setDisplay] = useState(FINAL);
  const [tiltEnabled, setTiltEnabled] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // Motion values pour le tilt 3D (-1 à +1 selon position souris)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.6 });
  const springY = useSpring(my, { stiffness: 120, damping: 18, mass: 0.6 });
  // Mappe vers rotations (max ±10 degrés, subtle premium)
  const rotateY = useTransform(springX, [-1, 1], [-10, 10]);
  const rotateX = useTransform(springY, [-1, 1], [10, -10]);

  // ── ScrambleText au mount ──
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(FINAL);
      return;
    }

    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / SCRAMBLE_DURATION_MS, 1);
      // chaque char se "lock" progressivement (à partir de progress > son seuil)
      const next = FINAL.split("")
        .map((ch, i) => {
          const threshold = (i + 1) / FINAL.length;
          if (progress >= threshold) return ch;
          return SCRAMBLE_CHARS[
            Math.floor(Math.random() * SCRAMBLE_CHARS.length)
          ];
        })
        .join("");
      setDisplay(next);
      if (progress >= 1) {
        setDisplay(FINAL);
        clearInterval(interval);
      }
    }, SCRAMBLE_FRAME_MS);

    return () => clearInterval(interval);
  }, []);

  // ── Tilt 3D au mouvement souris ──
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setTiltEnabled(true);

    function onMove(e: MouseEvent) {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // Position du curseur dans un cercle d'influence (200px autour de l'élément)
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / Math.max(rect.width, 300);
      const dy = (e.clientY - cy) / Math.max(rect.height, 300);
      // Clamp à [-1, 1]
      mx.set(Math.max(-1, Math.min(1, dx)));
      my.set(Math.max(-1, Math.min(1, dy)));
    }

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div
      style={{ perspective: "1200px" }}
      className="inline-block"
    >
      <motion.div
        ref={ref}
        style={
          tiltEnabled
            ? {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }
            : undefined
        }
        className="font-[family-name:var(--font-display)] text-[10rem] md:text-[14rem] lg:text-[18rem] leading-[0.85] tracking-tighter text-[var(--accent)] italic select-none will-change-transform"
        aria-label="MD — initiales de Mouhamadou Diouf"
      >
        <span suppressHydrationWarning>{display}</span>
      </motion.div>
    </div>
  );
}
