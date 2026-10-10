import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { FeaturedProjects, type FeaturedProject } from "@/components/FeaturedProjects";
import { projects } from "@/data/projects";

// Titre et description hérités de src/app/layout.tsx ; seule la canonique est propre à la home.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const EMAIL = "Mouhamadoud_Diouf@proton.me";
const ESTIMATION_MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent("Demande d'estimation")}&body=${encodeURIComponent("Bonjour Mouhamadou,\n\nJe souhaite une estimation.\n\nMon besoin : \nDélai souhaité : \nBudget indicatif (facultatif) : \n\nMerci !")}`;

const FEATURED_SLUGS = ["liggeyo", "daba-email-assistant", "personal-os-v2"] as const;

const FEATURED_META: Record<string, { angle: string; role: string }> = {
  liggeyo: {
    angle: "Plateforme SaaS de formation : conception et réalisation du produit.",
    role: "Conception produit et développement, du modèle multi-tenant aux paiements Wave / Orange Money.",
  },
  "daba-email-assistant": {
    angle: "Intégration de l'IA dans l'email : usage, fonctionnement, périmètre et supervision.",
    role: "Co-développement avec Ibrahima Diouf ; choix d'une intervention à l'écran plutôt que d'un accès à la boîte mail.",
  },
  "personal-os-v2": {
    angle: "Productivité personnelle : organisation des usages et expérience.",
    role: "Conception et développement d'un tableau de bord personnel local-first, assistant IA via Groq.",
  },
};

const featured: FeaturedProject[] = FEATURED_SLUGS.map((slug) => {
  const p = projects.find((x) => x.slug === slug)!;
  const meta = FEATURED_META[slug];
  return {
    slug: p.slug,
    name: p.name,
    tag: p.tag,
    angle: meta.angle,
    need: p.context,
    role: meta.role,
    proof: p.decision,
  };
});

const expertise = [
  {
    title: "Développement web & SaaS",
    detail: "Landing pages, sites vitrine, MVP SaaS et applications. Besoin : une présence ou un produit en ligne fiable. Livrables : pages, application, déploiement.",
  },
  {
    title: "Analyse de données & Power BI",
    detail: "Exploration de vos données, tableaux de bord lisibles, premiers modèles si pertinent. Besoin : décider à partir de vos chiffres. Livrables : analyse, dashboard, recommandations.",
  },
  {
    title: "Automatisation & intégration IA",
    detail: "Assistants IA, RAG, automatisation de tâches. Besoin : gagner du temps sur le répétitif. Livrables : fonctionnalité intégrée, pipeline automatisé, documentation des limites.",
  },
  {
    title: "Renfort d'équipe (régie)",
    detail: "Une présence dev/product dans votre équipe, à distance depuis Dakar. Besoin : un renfort ponctuel encadré. Livrables : contributions sur vos sprints, communication directe.",
  },
];

const steps = [
  "Premier échange gratuit",
  "Analyse du besoin",
  "Proposition chiffrée",
  "Validation",
  "Réalisation",
];

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <Nav />

      {/* Données structurées — décrit uniquement le contenu visible de cette page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            mainEntity: {
              "@type": "Person",
              name: "Mouhamadou Diouf",
              jobTitle: "Développeur full stack — web, data & IA",
              description:
                "Développeur full stack à Dakar : sites web et applications, tableaux de bord et automatisations IA pour entrepreneurs et PME. Product Owner chez Auryntix.",
              url: "https://mouhamadou-portfolio.vercel.app",
              email: "mailto:Mouhamadoud_Diouf@proton.me",
              address: { "@type": "PostalAddress", addressLocality: "Dakar", addressCountry: "SN" },
              sameAs: [
                "https://www.linkedin.com/in/mouhamadoudiouf",
                "https://github.com/LeM2003",
              ],
            },
          }).replace(/</g, "\\u003c"),
        }}
      />

      {/* ── 01 — Premier écran ─────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-20 pt-12 md:pt-20 pb-16 max-w-6xl mx-auto w-full">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-10">
          Développeur full stack · AI Product Builder — Dakar, Sénégal · Collaboration à distance
        </p>

        <div className="md:grid md:grid-cols-[1fr_auto] md:gap-16 md:items-start">
          <h1 className="font-sans text-[clamp(2.25rem,11vw,3.75rem)] md:text-7xl lg:text-8xl xl:text-9xl tracking-tight leading-[0.95]">
            Mouhamadou
            <br />
            <span className="font-[family-name:var(--font-display)] italic text-[var(--accent)]">Diouf.</span>
          </h1>
          <div
            aria-hidden
            className="hidden lg:flex flex-col gap-2 border-l border-[var(--hairline)] pl-8 font-[family-name:var(--font-display)] italic text-2xl text-[var(--muted)]"
          >
            <span>Web.</span>
            <span>Data.</span>
            <span>IA.</span>
          </div>
        </div>
        <p className="lg:hidden mt-6 font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
          Web. · Data. · IA.
        </p>

        <div className="mt-16 pt-8 border-t border-[var(--hairline)] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <p className="font-[family-name:var(--font-display)] text-2xl md:text-3xl leading-snug">
            Des idées aux produits qui servent.
          </p>
          <p className="text-base md:text-lg text-[var(--muted)] leading-relaxed">
            Je développe des applications web, transforme les données en outils de décision et
            intègre l&apos;IA à vos usages.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center justify-center px-7 py-4 bg-[var(--accent)] text-[#F5F5F1] font-mono text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            Parlons de votre projet
          </a>
          <a
            href="#realisations"
            className="inline-flex items-center justify-center px-7 py-4 border border-[var(--hairline)] font-mono text-sm uppercase tracking-wider hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
          >
            Voir mon travail
          </a>
          <a href={ESTIMATION_MAILTO} className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--accent)] border-b border-[var(--accent)] pb-0.5">
            Demander une estimation →
          </a>
        </div>
      </section>

      {/* ── 02 — Réalisations (section sombre) ─────────────── */}
      <section id="realisations" className="bg-[#111315] text-[#F5F5F1] px-6 md:px-12 lg:px-20 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#8CA5FF] mb-4 flex items-center gap-3">
            <span>02</span>
            <span className="w-8 h-px bg-[#383D40]" />
            <span>Réalisations</span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl mb-12 md:mb-16">
            Le travail, <span className="italic text-[#8CA5FF]">avant les promesses.</span>
          </h2>
          <FeaturedProjects items={featured} />
        </div>
      </section>

      {/* ── 03 — Expertises ────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-4 flex items-center gap-3">
              <span>03</span>
              <span className="w-8 h-px bg-[var(--hairline)]" />
              <span>Expertises</span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl leading-tight">
              Le bon outil. <span className="italic text-[var(--accent)]">Pour votre besoin.</span>
            </h2>
            <p className="mt-6 text-[var(--muted)] leading-relaxed max-w-md">
              Votre projet détermine le périmètre, les livrables et l&apos;estimation. Sur devis,
              après étude de votre besoin.
            </p>
          </div>
          <div className="flex flex-col divide-y divide-[var(--hairline)]">
            {expertise.map((e) => (
              <details key={e.title} className="group py-5">
                <summary className="flex items-center justify-between cursor-pointer list-none font-[family-name:var(--font-display)] text-xl md:text-2xl group-open:text-[var(--accent)] transition-colors [&::-webkit-details-marker]:hidden">
                  {e.title}
                  <span aria-hidden className="font-mono text-sm text-[var(--muted)] group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed max-w-lg">{e.detail}</p>
                <a href={ESTIMATION_MAILTO} className="inline-block mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--accent)] border-b border-[var(--accent)] pb-0.5">
                  Demander une estimation →
                </a>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 — Méthode ───────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-20 py-12 max-w-6xl mx-auto w-full border-t border-b border-[var(--hairline)]">
        <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] md:text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden className="text-[var(--accent)]">→</span>}
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* ── 05 — Contact ───────────────────────────────────── */}
      <section id="contact" className="px-6 md:px-12 lg:px-20 py-20 md:py-28 max-w-6xl mx-auto w-full">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-4 flex items-center gap-3">
          <span>04</span>
          <span className="w-8 h-px bg-[var(--hairline)]" />
          <span>Contact</span>
        </div>
        <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl leading-[0.98] max-w-2xl">
          Vous avez une idée. <span className="italic text-[var(--accent)]">Donnons-lui forme.</span>
        </h2>
        <p className="mt-6 text-[var(--muted)] max-w-md leading-relaxed">
          Premier échange gratuit. Je réponds sous 24h, depuis Dakar, GMT+0.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={ESTIMATION_MAILTO}
            className="inline-flex items-center justify-center px-7 py-4 bg-[var(--accent)] text-[#F5F5F1] font-mono text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            Demander une estimation
          </a>
          <a href="https://www.linkedin.com/in/mouhamadoudiouf" target="_blank" rel="noreferrer" className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
            LinkedIn ↗
          </a>
          <a href="https://github.com/LeM2003" target="_blank" rel="noreferrer" className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
            GitHub ↗
          </a>
          <a href={`mailto:${EMAIL}`} className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
            Email ↗
          </a>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="px-6 md:px-12 lg:px-20 py-12 mt-auto border-t border-[var(--hairline)]">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--muted)] font-mono">
          <div>© {new Date().getFullYear()} Mouhamadou Diouf · Dakar 🇸🇳</div>
          <nav aria-label="Liens secondaires" className="flex flex-wrap gap-4">
            <Link href="/collaboration" className="hover:text-[var(--accent)]">Collaboration</Link>
            <Link href="/now" className="hover:text-[var(--accent)]">Maintenant</Link>
            <Link href="/card" className="hover:text-[var(--accent)]">Carte</Link>
            <Link href="/lab/rag" className="hover:text-[var(--accent)]">Lab</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
