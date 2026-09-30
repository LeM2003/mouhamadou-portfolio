import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MdMonogram } from "@/components/MdMonogram";
import { projects } from "@/data/projects";
import { JARGON_BENEFITS } from "@/lib/jargon";

// Titre et description hérités de src/app/layout.tsx ; seule la canonique est propre à la home
// (une canonique "/" dans le layout serait héritée par toutes les pages).
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const STATUS_BADGE = {
  available: true,
  label: "Disponible · missions freelance",
};

/**
 * Lien Calendly ou Cal.com pour la réservation d'appels (15 min).
 * TODO(LeM): Remplacer null par l'URL active (ex: "https://cal.com/lem2003/15min")
 * tant qu'aucun lien n'est fourni, un placeholder TODO explicite et non-cliquable est affiché.
 */
const CALENDLY_URL: string | null = null;

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <Nav />

      {/* ── 01 — Hero ───────────────────────────────────────────── */}
      <section className="flex-1 relative px-6 md:px-12 lg:px-20 pt-12 md:pt-20 pb-16 md:pb-24 max-w-6xl mx-auto w-full overflow-hidden">
        {/* Chiffre décoratif brutaliste */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-8 right-0 md:right-8 lg:right-16 font-[family-name:var(--font-display)] text-[16rem] md:text-[22rem] lg:text-[28rem] italic leading-[0.78] tracking-tighter text-[var(--accent)] opacity-[0.07] select-none"
        >
          01
        </div>

        {/* MdMonogram — signature watermark desktop */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 hidden lg:block opacity-[0.04] select-none"
        >
          <MdMonogram />
        </div>

        {/* Badge disponibilité */}
        {STATUS_BADGE.available && (
          <div className="relative mb-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)] border border-[var(--accent)] px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            {STATUS_BADGE.label}
          </div>
        )}

        <div className="relative font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-8 flex items-center gap-3">
          <span>01</span>
          <span className="w-8 h-px bg-[var(--hairline)]" />
          <span>Manifeste</span>
        </div>

        <h1 className="relative font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-normal leading-[0.95] tracking-tight max-w-5xl">
          Je conçois des produits où l&apos;IA est une
          <span className="text-[var(--accent)] italic"> décision d&apos;architecture</span>,
          pas un add-on marketing.
        </h1>

        <div className="mt-10 md:mt-12 grid grid-cols-12 gap-6 md:gap-12 max-w-5xl">
          <div className="col-span-12 md:col-span-7">
            <p className="text-lg md:text-xl text-[var(--muted)] leading-relaxed">
              Product Owner @Auryntix & builder indépendant à Dakar. Je pilote des produits
              et les construis — de la roadmap au déploiement. Master Data Science/IA en cours.
              L&apos;IA est dans l&apos;architecture dès le départ, pas ajoutée pour cocher une case.
            </p>
            {/* Liens secondaires recruteur/diaspora — visibles above the fold */}
            <div className="mt-6 flex flex-wrap items-center gap-3 md:gap-4">
              <Link
                href="/collaboration"
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-3.5 py-2 border border-[var(--hairline)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                <span className="w-1.5 h-1.5 bg-[var(--accent)]" />
                <span>CV · Parcours</span>
              </Link>
              <a
                href="https://www.linkedin.com/in/mouhamadoudiouf"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-3.5 py-2 border border-[var(--hairline)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                <span className="w-1.5 h-1.5 bg-[var(--foreground)] group-hover:bg-[var(--accent)] transition-colors" />
                <span>LinkedIn</span>
                <span className="text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">↗</span>
              </a>
            </div>
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

      {/* ── 02 — Projets ───────────────────────────────────────── */}
      <section
        id="projects"
        className="px-6 md:px-12 lg:px-20 py-24 max-w-6xl mx-auto w-full"
      >
        <ScrollReveal>
          <div className="flex items-end justify-between mb-16 pb-4 border-b border-[var(--hairline)]">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-2">
                02 — Ce que j&apos;ai construit
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
            const isEven = i % 2 === 1;
            const statusColor: Record<string, string> = {
              production: "text-emerald-400 border-emerald-400/40",
              active: "text-sky-400 border-sky-400/40",
              "open-source": "text-violet-400 border-violet-400/40",
              archived: "text-[var(--muted)] border-[var(--hairline)]",
            };
            const statusLabel: Record<string, string> = {
              production: "Production",
              active: "Actif",
              "open-source": "Open Source",
              archived: "Archivé",
            };
            return (
              <ScrollReveal key={p.num} delay={i * 0.1} y={32}>
                <Link
                  href={`/projects/${p.slug}`}
                  data-cursor-text={p.cursorText}
                  className={`group relative grid grid-cols-12 gap-6 py-10 border-b border-[var(--hairline)] hover:border-[var(--accent)] transition-colors ${
                    isEven ? "md:ml-16 lg:ml-32 md:-mt-4 md:mb-4" : ""
                  }`}
                >
                  <div className="col-span-2 md:col-span-2 font-[family-name:var(--font-display)] text-6xl md:text-8xl text-[var(--muted)] group-hover:text-[var(--accent)] leading-none transition-colors -mt-2">
                    {p.num}
                  </div>
                  <div className="col-span-10 md:col-span-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="font-[family-name:var(--font-display)] text-2xl md:text-3xl group-hover:text-[var(--accent)] transition-colors">
                        {p.name}
                      </div>
                      <span className={`hidden md:inline font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 border ${statusColor[p.status] ?? ""}`}>
                        {statusLabel[p.status]}
                      </span>
                    </div>
                    <div className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
                      {p.tag} · {p.year}
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-4 space-y-2 text-[var(--muted)]">
                    <div className="text-sm leading-relaxed">{p.context}</div>
                    <div className="hidden md:block text-xs italic text-[var(--foreground)] opacity-70 leading-relaxed border-l-2 border-[var(--accent-soft)] pl-3">
                      Décision : {p.decision}
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-2 flex flex-wrap gap-1.5 self-end">
                    {p.stack.map((s) => {
                      const benefit = JARGON_BENEFITS[s];
                      return (
                        <div key={s} className="group/tag relative flex items-center">
                          <span
                            title={benefit ? `${s} — Bénéfice : ${benefit}` : s}
                            className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 border border-[var(--hairline)] text-[var(--muted)] group-hover/tag:border-[var(--accent)] group-hover/tag:text-[var(--foreground)] transition-colors cursor-help flex items-center gap-1.5"
                          >
                            <span>{s}</span>
                            {benefit && (
                              <span
                                aria-hidden
                                className="w-1 h-1 rounded-full bg-[var(--accent)] opacity-60 group-hover/tag:opacity-100 transition-opacity"
                              />
                            )}
                          </span>
                          {benefit && (
                            <div className="pointer-events-none absolute bottom-full mb-2 right-0 md:left-1/2 md:-translate-x-1/2 opacity-0 group-hover/tag:opacity-100 transition-opacity z-20 whitespace-nowrap bg-[var(--foreground)] text-[var(--background)] font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 shadow-sm">
                              <span className="text-[var(--accent)] font-semibold mr-1">Bénéfice :</span>
                              <span>{benefit}</span>
                              <div className="hidden md:block absolute top-full left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-[var(--foreground)]" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ── 03 — Chiffres réels ────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-20 py-32 max-w-6xl mx-auto w-full">
        <ScrollReveal>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-16 flex items-center gap-3">
            <span>03</span>
            <span className="w-8 h-px bg-[var(--hairline)]" />
            <span>Chiffres réels</span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
          {[
            { value: "04", label: "Produits en production · Liggeyo · Auryntix · Personal OS · DABA", delay: 0 },
            { value: "02", label: "Projets open source · MuslimApp · ImportManager SN", delay: 0.1 },
            { value: "1+", label: "Année Master Data Science / IA · UMEF Dakar", delay: 0.2 },
            { value: "GMT+0", label: "Fuseau Dakar · EU-friendly · 7h–23h disponible", delay: 0.3 },
          ].map((m) => (
            <ScrollReveal key={m.label} delay={m.delay} y={40}>
              <div className="flex flex-col">
                <div className="font-[family-name:var(--font-display)] text-[5rem] md:text-[7rem] lg:text-[9rem] italic leading-[0.85] tracking-tighter text-[var(--foreground)]">
                  {m.value}
                </div>
                <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.18em] text-[var(--muted)] mt-4 max-w-[28ch] leading-relaxed">
                  {m.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── 04 — Ce que je fais / Services ──────────────────────── */}
      <section className="px-6 md:px-12 lg:px-20 py-24 max-w-6xl mx-auto w-full border-t border-[var(--hairline)]">
        <ScrollReveal>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-16 flex items-center gap-3">
            <span>04</span>
            <span className="w-8 h-px bg-[var(--hairline)]" />
            <span>Ce que je fais</span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {[
            {
              num: "A",
              title: "Sites & Apps web",
              desc: "Next.js · Supabase · Tailwind. Du MVP au produit en production. Livraison rapide, code maintenable.",
            },
            {
              num: "B",
              title: "Intégration IA",
              desc: "LLMs intégrés en profondeur (pas un widget ChatGPT). RAG, agents, pipelines de données — pensés dès l'architecture.",
            },
            {
              num: "C",
              title: "Product Ownership",
              desc: "Roadmap, priorisation, coordination technique. Je pilote les produits de bout en bout — de la vision au déploiement.",
            },
          ].map((s) => (
            <ScrollReveal key={s.num} y={24}>
              <div className="group py-10 px-0 md:pr-12 border-b md:border-b-0 md:border-r border-[var(--hairline)] last:border-0">
                <div className="font-[family-name:var(--font-display)] text-5xl italic text-[var(--accent)] opacity-30 mb-6 group-hover:opacity-100 transition-opacity">
                  {s.num}
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-xl mb-3 group-hover:text-[var(--accent)] transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── 05 — Présence & preuve sociale ──────────────────────── */}
      <section className="px-6 md:px-12 lg:px-20 py-20 max-w-6xl mx-auto w-full border-t border-[var(--hairline)]">
        <ScrollReveal>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-10 flex items-center gap-3">
            <span>05</span>
            <span className="w-8 h-px bg-[var(--hairline)]" />
            <span>Présence & preuve</span>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {[
            { value: "440", label: "Connexions LinkedIn", sub: "réseau professionnel actif" },
            { value: "455", label: "Abonnés LinkedIn", sub: "en croissance" },
            { value: "4", label: "Produits en prod", sub: "Liggeyo · Auryntix · DABA" },
            { value: "2", label: "Open source", sub: "MuslimApp · ImportManager SN" },
          ].map((stat) => (
            <ScrollReveal key={stat.label} y={20}>
              <div className="border-t border-[var(--hairline)] pt-6">
                <div className="font-[family-name:var(--font-display)] text-5xl md:text-6xl italic leading-none text-[var(--foreground)]">
                  {stat.value}
                </div>
                <div className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--foreground)] mt-3">
                  {stat.label}
                </div>
                <div className="font-mono text-[10px] text-[var(--muted)] mt-1">
                  {stat.sub}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── 06 — CTA Contact ────────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-20 py-32 max-w-6xl mx-auto w-full">
        <ScrollReveal y={40}>
          <div className="border border-[var(--hairline)] hover:border-[var(--accent)] transition-colors p-10 md:p-16 flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-6">
                06 — Contact
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl leading-[0.95] tracking-tight max-w-xl">
                Un projet à construire ?{" "}
                <span className="text-[var(--accent)] italic">Parlons-en.</span>
              </h2>
              <p className="mt-6 text-[var(--muted)] max-w-md leading-relaxed">
                Disponible pour missions freelance, collaborations long terme et projets africains avec impact.
                Réponse sous 24h.
              </p>
            </div>
            <div className="flex flex-col gap-4 shrink-0">
              <Link
                href="/card"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--accent)] text-[var(--background)] font-mono text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                Voir ma carte
                <span>→</span>
              </Link>
              <div className="flex flex-col md:flex-row gap-4">
                {CALENDLY_URL ? (
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-[var(--accent)] text-[var(--accent)] font-mono text-sm uppercase tracking-wider hover:bg-[var(--accent)] hover:text-[var(--background)] transition-colors"
                  >
                    Réserver un appel (15 min)
                  </a>
                ) : (
                  <div
                    title="TODO : Lien Calendly / Cal.com à configurer par LeM"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-4 border border-dashed border-[var(--hairline)] text-[var(--muted)] font-mono text-xs uppercase tracking-wider select-none"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--hairline)]" />
                    <span>Réserver un appel (15 min)</span>
                    <span className="text-[9px] px-1.5 py-0.5 border border-[var(--hairline)] text-[var(--muted)]">
                      TODO
                    </span>
                  </div>
                )}
                <a
                  href="mailto:Mouhamadoud_Diouf@proton.me"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-[var(--hairline)] font-mono text-sm uppercase tracking-wider hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                >
                  Email direct
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="px-6 md:px-12 lg:px-20 py-16 mt-auto border-t border-[var(--hairline)]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
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
            <div>Master DS & IA · UMEF Dakar</div>
          </div>
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-2">
              Rôle actuel
            </div>
            <div>Product Owner · Auryntix</div>
          </div>
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-2">
              Statut
            </div>
            <div className="text-[var(--accent)]">Disponible freelance</div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-[var(--hairline)] flex items-center justify-between text-xs text-[var(--muted)] font-mono">
          <div>© {new Date().getFullYear()} Mouhamadou Diouf</div>
          <div>v3.0 — éditorial</div>
        </div>
      </footer>
    </main>
  );
}
