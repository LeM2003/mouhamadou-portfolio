import Link from "next/link";
import { Nav } from "@/components/Nav";
import { ScrollReveal } from "@/components/ScrollReveal";

const projects = [
  {
    num: "01",
    name: "Olèle Systems",
    tag: "Plateforme LMS",
    context: "Formations vidéo + quiz certifiants pour la diaspora",
    decision: "Next.js 16 RSC + Supabase RLS pour scaler à coût quasi-nul",
    stack: ["Next.js 16", "Supabase", "Vercel"],
    year: "2025 – 2026",
    href: "https://github.com/LeM2003/olele-systems",
    cursorText: "Supabase RLS · JWT",
  },
  {
    num: "02",
    name: "Personal OS V2",
    tag: "Dashboard de vie",
    context: "Outil personnel — école, finances, tâches, assistant IA",
    decision: "Local-first avec Groq pour latence assistant <500ms",
    stack: ["Next.js 16", "Groq", "Framer Motion"],
    year: "2026 — en cours",
    href: "https://github.com/LeM2003/personal-os-v2",
    cursorText: "Local-first · Groq",
  },
  {
    num: "03",
    name: "MuslimApp",
    tag: "Application communautaire",
    context: "PWA Coran + dhikr, gratuite, offline-first",
    decision: "PWA pure pour usage hors-ligne en zone faible réseau",
    stack: ["PWA", "Open source"],
    year: "2026",
    href: "https://github.com/LeM2003/MuslimApp",
    cursorText: "PWA · offline-first",
  },
  {
    num: "04",
    name: "ImportManager SN",
    tag: "Gestion d'import",
    context: "Outil métier pour entreprises sénégalaises d'import",
    decision: "Stack legacy JS/Node maintenable par équipe locale",
    stack: ["Node.js", "Web app"],
    year: "2025 – 2026",
    href: "https://github.com/LeM2003/importmanager-sn",
    cursorText: "Multi-currency · JS",
  },
];

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <Nav />

      <section className="flex-1 relative px-6 md:px-12 lg:px-20 pt-16 md:pt-32 pb-24 max-w-6xl mx-auto w-full overflow-hidden">
        {/* "01" monumental en arrière-plan — signature brutaliste premium.
            Tension visuelle entre la typo géante muette et la métadonnée mono. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-8 right-0 md:right-8 lg:right-16 font-[family-name:var(--font-display)] text-[16rem] md:text-[22rem] lg:text-[28rem] italic leading-[0.78] tracking-tighter text-[var(--accent)] opacity-[0.07] select-none"
        >
          01
        </div>

        <div className="relative font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-10 flex items-center gap-3">
          <span>01</span>
          <span className="w-8 h-px bg-[var(--hairline)]" />
          <span>Manifeste</span>
        </div>

        <h1 className="relative font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-normal leading-[0.95] tracking-tight max-w-5xl">
          Je conçois des produits où l&apos;IA est une
          <span className="text-[var(--accent)] italic"> décision d&apos;architecture</span>,
          pas un add-on marketing.
        </h1>

        <div className="mt-20 grid grid-cols-12 gap-6 md:gap-12 max-w-5xl">
          <div className="col-span-12 md:col-span-7">
            <p className="text-lg md:text-xl text-[var(--muted)] leading-relaxed">
              Master Data Science/IA en cours à Dakar. Je construis des sites,
              e-commerce et SaaS où les modèles sont intégrés dès la conception
              — pas collés après coup pour cocher une case investisseur.
            </p>
          </div>
          <div className="col-span-12 md:col-span-5 flex flex-col gap-4 md:items-end">
            <Link
              href="#projects"
              className="group inline-flex items-center gap-3 text-base font-medium hover:text-[var(--accent)] transition-colors"
            >
              <span className="font-mono text-xs text-[var(--muted)]">→</span>
              <span className="border-b border-[var(--foreground)] group-hover:border-[var(--accent)] transition-colors">
                Voir les projets
              </span>
            </Link>
            <Link
              href="/card"
              className="group inline-flex items-center gap-3 text-base font-medium hover:text-[var(--accent)] transition-colors"
            >
              <span className="font-mono text-xs text-[var(--muted)]">→</span>
              <span className="border-b border-[var(--foreground)] group-hover:border-[var(--accent)] transition-colors">
                Discuter d&apos;un projet
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section
        id="projects"
        className="px-6 md:px-12 lg:px-20 py-24 max-w-6xl mx-auto w-full"
      >
        <ScrollReveal>
          <div className="flex items-end justify-between mb-16 pb-4 border-b border-[var(--hairline)]">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-2">
                02 — En production
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">
                Produits qui tournent.
              </h2>
            </div>
            <div className="font-mono text-xs text-[var(--muted)]">
              {projects.length.toString().padStart(2, "0")} projets
            </div>
          </div>
        </ScrollReveal>

        <div className="flex flex-col">
          {projects.map((p, i) => {
            // Asymétrie brutaliste mesurée : décalage alterné des projets
            // Pair (02, 04) → léger retrait à droite + offset top
            const isEven = i % 2 === 1;
            return (
            <ScrollReveal key={p.num} delay={i * 0.1} y={32}>
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                data-cursor-text={p.cursorText}
                className={`group relative grid grid-cols-12 gap-6 py-10 border-b border-[var(--hairline)] hover:border-[var(--accent)] transition-colors ${
                  isEven
                    ? "md:ml-16 lg:ml-32 md:-mt-4 md:mb-4"
                    : ""
                }`}
              >
              <div className="col-span-2 md:col-span-2 font-[family-name:var(--font-display)] text-6xl md:text-8xl text-[var(--muted)] group-hover:text-[var(--accent)] leading-none transition-colors -mt-2">
                {p.num}
              </div>
              <div className="col-span-10 md:col-span-4">
                <div className="font-[family-name:var(--font-display)] text-2xl md:text-3xl mb-2 group-hover:text-[var(--accent)] transition-colors">
                  {p.name}
                </div>
                <div className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
                  {p.tag} · {p.year}
                </div>
              </div>
              <div className="col-span-12 md:col-span-4 space-y-2 text-[var(--muted)]">
                <div className="text-sm leading-relaxed">{p.context}</div>
                <div className="text-xs italic text-[var(--foreground)] opacity-70 leading-relaxed border-l-2 border-[var(--accent-soft)] pl-3">
                  Décision : {p.decision}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2 flex flex-wrap gap-1.5 self-end">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 border border-[var(--hairline)] text-[var(--muted)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
              </a>
            </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ── 03 — Chiffres bruts : tension brutaliste typo monumentale × mono ──
          Pattern Top 1 mondial : chiffre géant Fraunces italique juxtaposé
          avec label mono ultra-petit. Signature "rendre visible le quantifié". */}
      <section className="px-6 md:px-12 lg:px-20 py-32 max-w-6xl mx-auto w-full">
        <ScrollReveal>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-16 flex items-center gap-3">
            <span>03</span>
            <span className="w-8 h-px bg-[var(--hairline)]" />
            <span>Chiffres réels</span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
          {[
            { value: "02", label: "Produits en production (Olèle · Personal OS)", delay: 0 },
            { value: "04", label: "Projets open source publiés", delay: 0.1 },
            { value: "1y+", label: "Master Data Science · IA UMEF Dakar", delay: 0.2 },
            { value: "GMT+0", label: "Fuseau Dakar · EU-friendly", delay: 0.3 },
          ].map((m) => (
            <ScrollReveal key={m.label} delay={m.delay} y={40}>
              <div className="flex flex-col">
                <div className="font-[family-name:var(--font-display)] text-[5rem] md:text-[9rem] lg:text-[13rem] italic leading-[0.85] tracking-tighter text-[var(--foreground)]">
                  {m.value}
                </div>
                <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.18em] text-[var(--muted)] mt-3 max-w-[14ch] leading-tight">
                  {m.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── 04 — Démo ── */}
      <section className="px-6 md:px-12 lg:px-20 py-24 max-w-6xl mx-auto w-full">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-6">
          04 — Démo
        </div>
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl mb-8 max-w-3xl">
          L&apos;IA bien intégrée n&apos;est pas un{" "}
          <span className="text-[var(--accent)] italic">chatbot collé</span> en
          bas de page.
        </h2>
        <p className="text-[var(--muted)] max-w-2xl leading-relaxed text-lg">
          C&apos;est un assistant qui comprend le contexte de la page, l&apos;historique
          du visiteur, et la grammaire de la marque. Bientôt une démo live ici —
          en attendant, regarde l&apos;Assistant IA de{" "}
          <a
            href="https://github.com/LeM2003/personal-os-v2"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--accent)] underline decoration-[var(--accent-soft)] underline-offset-4"
          >
            Personal OS V2
          </a>
          .
        </p>
      </section>

      <footer className="px-6 md:px-12 lg:px-20 py-16 mt-auto border-t border-[var(--hairline)]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-2">
              Basé à
            </div>
            <div>Dakar, Sénégal</div>
          </div>
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-2">
              Formation
            </div>
            <div>Master Data Science & IA · UMEF Dakar</div>
          </div>
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-2">
              Statut
            </div>
            <div>Freelance & collaboration long terme</div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-[var(--hairline)] flex items-center justify-between text-xs text-[var(--muted)] font-mono">
          <div>© {new Date().getFullYear()} Mouhamadou Diouf</div>
          <div>v2.0 — éditorial</div>
        </div>
      </footer>
    </main>
  );
}
