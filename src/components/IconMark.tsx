/**
 * Monogramme « MD » des icônes (onglet, écran d'accueil iOS, résultats Google).
 * Rendu par ImageResponse (next/og) : seul un sous-ensemble de CSS en flexbox
 * est supporté — pas de classes Tailwind ici.
 *
 * Couleurs = tokens du site (globals.css) : accent cobalt #2146E8, papier #F5F5F1.
 * Lisibilité vérifiée à 16 px : deux lettres épaisses, pas de détail fin.
 */
export function IconMark({ size, radius }: { size: number; radius: number }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#2146E8",
        borderRadius: radius,
        color: "#F5F5F1",
        fontSize: Math.round(size * 0.56),
        fontWeight: 700,
        letterSpacing: Math.round(-size * 0.04),
        lineHeight: 1,
        // La police intégrée d'ImageResponse n'a pas de graisse grasse : on
        // épaissit le tracé par un contour de la même couleur, sinon « MD »
        // devient illisible à 16 px dans l'onglet.
        WebkitTextStroke: `${Math.max(1, Math.round(size * 0.025))}px #F5F5F1`,
      }}
    >
      MD
    </div>
  );
}
