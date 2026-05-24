"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Curseur sémantique — pas juste un effet esthétique.
 *
 * Comportement à 3 niveaux :
 *  1. Idle : dot + ring discret (32px)
 *  2. Hover lien classique (a, button) : ring grandit (56px) + accent
 *  3. Hover élément avec [data-cursor-text="..."] : ring grandit (96px)
 *     + texte monospace affiché AU CENTRE (le curseur DEVIENT un outil
 *     de lecture de métadonnées contextuelles)
 *
 * → Le visiteur n'a plus un curseur "joli". Il a un curseur qui LIT
 *   les métadonnées techniques du portfolio. Signature "rendre visible
 *   l'invisible" (brief AI Product Builder).
 *
 * Désactivé sur touch & prefers-reduced-motion.
 * Couleurs en RGBA explicites (Framer Motion ne sait pas animer color-mix).
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Dot : suit vite (high stiffness)
  const dotX = useSpring(cursorX, { damping: 30, stiffness: 700, mass: 0.3 });
  const dotY = useSpring(cursorY, { damping: 30, stiffness: 700, mass: 0.3 });

  // Ring : suit doucement (effet magnétique)
  const ringX = useSpring(cursorX, { damping: 25, stiffness: 150, mass: 0.6 });
  const ringY = useSpring(cursorY, { damping: 25, stiffness: 150, mass: 0.6 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isTouch || reducedMotion) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor-on");

    function onMove(e: MouseEvent) {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    }

    function onMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Priorité 1 : data-cursor-text (métadonnées sémantiques)
      const elWithText = target.closest<HTMLElement>("[data-cursor-text]");
      if (elWithText) {
        setCursorText(elWithText.getAttribute("data-cursor-text"));
        setHovering(true);
        return;
      }

      // Priorité 2 : élément interactif standard
      const interactive = target.closest(
        'a, button, [role="button"], [data-cursor="hover"], input, textarea, select'
      );
      setHovering(!!interactive);
      setCursorText(null);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.body.classList.remove("custom-cursor-on");
    };
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  // Tailles selon le mode
  const hasText = !!cursorText;
  const ringSize = hasText ? 96 : hovering ? 56 : 32;

  return (
    <>
      {/* Ring : élément central du curseur — grandit selon le contexte */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full border flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          // accent terre cuite #b04a23 = rgb(176, 74, 35)
          // foreground brun très foncé #1a0f08 = rgb(26, 15, 8)
          borderColor: hovering
            ? "rgba(176, 74, 35, 1)"
            : "rgba(26, 15, 8, 0.35)",
          backgroundColor: hasText
            ? "rgba(176, 74, 35, 0.95)"
            : hovering
            ? "rgba(176, 74, 35, 0.08)"
            : "rgba(176, 74, 35, 0)",
        }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Texte orbital à l'intérieur du ring */}
        <AnimatePresence>
          {cursorText && (
            <motion.span
              key={cursorText}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-center px-2 leading-tight"
              style={{ color: "#fdf6ec" }}
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Dot : petit point qui colle au pointeur — caché en mode texte */}
      {!hasText && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed top-0 left-0 z-[9999] w-1.5 h-1.5 rounded-full bg-[var(--foreground)] mix-blend-difference"
          style={{
            x: dotX,
            y: dotY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
      )}
    </>
  );
}
