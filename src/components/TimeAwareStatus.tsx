"use client";

import { useEffect, useState } from "react";

/**
 * Affiche l'heure de Dakar en live + un status de disponibilité.
 *
 * Inspiré du Spotify widget de Baptiste Briel (humanise le portfolio).
 *
 * - Heure mise à jour toutes les 30 secondes (suffisant, économise CPU)
 * - Greeting dynamique selon l'heure ("Bonjour" / "Bon après-midi" / "Bonsoir")
 * - Status : "Disponible" (6h–23h) · "En sommeil" (23h–6h) — visuel par dot
 * - Tout côté client uniquement (évite décalages SSR ↔ user timezone)
 */
export function TimeAwareStatus() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // Mount : date initiale
    setNow(new Date());

    // Update toutes les 30s
    const interval = setInterval(() => {
      setNow(new Date());
    }, 30_000);

    return () => clearInterval(interval);
  }, []);

  // Pendant SSR ou avant le premier render client → placeholder discret
  if (!now) {
    return (
      <span className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted)] opacity-40">
        — · —
      </span>
    );
  }

  // Heure Dakar — Africa/Dakar = UTC+0 sans DST, donc équivalent à UTC
  const dakarTime = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Africa/Dakar",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);

  // Heure de Dakar en number pour décider du status
  const dakarHour = Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Dakar",
      hour: "2-digit",
      hour12: false,
    }).format(now)
  );

  // Status disponibilité : on est "Disponible" entre 6h et 23h Dakar
  const isAvailable = dakarHour >= 6 && dakarHour < 23;

  return (
    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
      {/* Dot status */}
      <span
        aria-hidden
        className={`inline-block w-1.5 h-1.5 rounded-full ${
          isAvailable
            ? "bg-[var(--accent)] animate-pulse"
            : "bg-[var(--muted)] opacity-40"
        }`}
        style={
          isAvailable
            ? { boxShadow: "0 0 8px rgba(176, 74, 35, 0.6)" }
            : undefined
        }
      />
      {/* Texte status + heure */}
      <span>
        <span className="hidden sm:inline">
          {isAvailable ? "Disponible" : "En sommeil"} ·{" "}
        </span>
        <span className="text-[var(--foreground)]">{dakarTime}</span>{" "}
        <span className="opacity-60">Dakar</span>
      </span>
    </div>
  );
}
