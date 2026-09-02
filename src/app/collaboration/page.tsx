import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PrintCvButton } from "@/components/PrintCvButton";
import { projects } from "@/data/projects";
import { experience, education, skills, flagshipProjectSlugs } from "@/data/profile";
import { JARGON_BENEFITS } from "@/lib/jargon";

export const metadata: Metadata = {
  title: "Collaboration — Mouhamadou Diouf",
  description:
    "Parcours, stack et projets clés de Mouhamadou Diouf — Product Owner & builder à Dakar, ouvert à une collaboration long terme ou un CDI remote.",
};

const CONTACT = {
  email: "Mouhamadoud_Diouf@proton.me",
  whatsappUrl: "https://wa.me/221783019983",
};

const flagshipProjects = flagshipProjectSlugs
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is (typeof projects)[number] => Boolean(p));

export default function CollaborationPage() {
  return (
    <main className="flex-1 flex flex-col">
      <Nav />

      {/* ── 01 — Profil ─────────────────────────────────────────── */}
      <section className="relative px-6 md:px-12 lg:px-20 pt-16 md:pt-32 pb-20 max-w-6xl mx-auto w-full overflow-hidden">
        <div
          aria-hidden
          className="print:hidden pointer-events-none absolute -top-8 right-0 md:right-8 lg:right-16 font-[family-name:var(--font-display)] text-[16rem] md:text-[22rem] lg:text-[28rem] italic leading-[0.78] tracking-tighter text-[var(--accent)] opacity-[0.07] select-none"
        >
          03
        </div>

        <div className="relative print:hidden mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)] border border-[var(--accent)] px-3 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          Ouvert · collaboration long terme / CDI remote
        </div>

        <div className="relative font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-10 flex items-center gap-3">
          <span>01</span>
          <span className="w-8 h-px bg-[var(--hairline)]" />
          <span>Profil</span>
        </div>

        <h1 className="relative font-[family-name:var(--font-display)] text-5xl md:text-7xl font-normal leading-[0.95] tracking-tight max-w-4xl">
          Un product builder qui{" "}
          <span className="text-[var(--accent)] italic">pilote autant qu&apos;il code</span>.
        </h1>

        <p className="relative mt-8 text-lg md:text-xl text-[var(--muted)] leading-relaxed max-w-2xl">
          Product Owner & développeur full-cycle basé à Dakar, fuseau EU-friendly. Je gère un
          produit de la roadmap au déploiement — pas juste la partie qui m&apos;arrange. Master
          Data Science / IA en cours, produits en production, ouvert à une collaboration long
          terme ou un poste salarié remote/hybride.
        </p>
      </section>

      {/* ── 02 — Expérience ────────────────────────────────────── */}
      <ScrollReveal>
        <section className="px-6 md:px-12 lg:px-20 py-16 max-w-6xl mx-auto w-full border-t border-[var(--hairline)]">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-10 flex items-center gap-3">
            <span>02</span>
            <span className="w-8 h-px bg-[var(--hairline)]" />
            <span>Expérience</span>
          </div>

          <div className="flex flex-col gap-12">
            {experience.map((e, i) => (
              <div key={e.id} className="group grid grid-cols-12 gap-4 pb-8 border-b border-[var(--hairline)] last:border-b-0 last:pb-0">
                <div className="col-span-2 md:col-span-1 font-[family-name:var(--font-display)] text-3xl md:text-4xl text-[var(--accent)] italic leading-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="col-span-10 md:col-span-11">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted)] mb-1">
                    {e.org} · {e.period}
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl mb-3 group-hover:text-[var(--accent)] transition-colors">
                    {e.role}
                  </h3>
                  <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed max-w-3xl">
                    {e.summary}
                  </p>
                  {e.highlights.length > 0 && (
                    <ul className="mt-4 flex flex-col gap-2">
                      {e.highlights.map((h) => (
                        <li key={h} className="flex gap-3 text-sm text-[var(--foreground)] leading-relaxed">
                          <span className="text-[var(--accent)] shrink-0">·</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ── 03 — Compétences ───────────────────────────────────── */}
      <ScrollReveal>
        <section className="px-6 md:px-12 lg:px-20 py-16 max-w-6xl mx-auto w-full border-t border-[var(--hairline)]">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-10 flex items-center gap-3">
            <span>03</span>
            <span className="w-8 h-px bg-[var(--hairline)]" />
            <span>Compétences</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-1 gap-x-12 gap-y-8">
            {skills.map((group) => (
              <div key={group.label}>
                <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted)] mb-3">
                  {group.label}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="font-mono text-[11px] md:text-xs uppercase tracking-wider px-3 py-2 border border-[var(--hairline)] text-[var(--foreground)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ── 04 — Formation ─────────────────────────────────────── */}
      <ScrollReveal>
        <section className="px-6 md:px-12 lg:px-20 py-16 max-w-6xl mx-auto w-full border-t border-[var(--hairline)]">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-10 flex items-center gap-3">
            <span>04</span>
            <span className="w-8 h-px bg-[var(--hairline)]" />
            <span>Formation</span>
          </div>

          <div className="flex flex-col gap-10">
            {education.map((e) => (
              <div key={e.id} className="border-t border-[var(--hairline)] pt-6">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl">
                    {e.degree}
                  </h3>
                  {!e.verified && (
                    <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 border border-[var(--accent)] text-[var(--accent)]">
                      À confirmer
                    </span>
                  )}
                </div>
                <div className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] mb-3">
                  {e.institution} · {e.period}
                </div>
                <p className="text-sm text-[var(--muted)] leading-relaxed max-w-2xl">
                  {e.detail}
                </p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ── 05 — Projets clés ──────────────────────────────────── */}
      <ScrollReveal>
        <section className="px-6 md:px-12 lg:px-20 py-16 max-w-6xl mx-auto w-full border-t border-[var(--hairline)]">
          <div className="flex items-end justify-between mb-10">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] flex items-center gap-3">
              <span>05</span>
              <span className="w-8 h-px bg-[var(--hairline)]" />
              <span>Projets clés</span>
            </div>
            <Link
              href="/#projects"
              data-cursor-text="Voir tous les projets"
              className="print:hidden hidden md:inline-block font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            >
              Tous →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 print:grid-cols-1 gap-6 md:gap-8">
            {flagshipProjects.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                data-cursor-text={p.cursorText}
                className="group flex flex-col gap-3 p-6 border border-[var(--hairline)] hover:border-[var(--accent)] transition-colors"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-[family-name:var(--font-display)] text-3xl md:text-4xl italic text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors leading-none">
                    {p.num}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--muted)]">
                    {p.status === "production" ? "● en prod" : "○ actif"}
                  </span>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl mb-1 group-hover:text-[var(--accent)] transition-colors leading-tight">
                    {p.name}
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted)]">
                    {p.tag} · {p.year}
                  </p>
                </div>
                <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-3">
                  {p.context}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                  {p.stack.map((s) => {
                    const benefit = JARGON_BENEFITS[s];
                    return (
                      <div key={s} className="group/tag relative flex items-center">
                        <span
                          title={benefit ? `${s} — Bénéfice : ${benefit}` : s}
                          className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 border border-[var(--hairline)] text-[var(--muted)] group-hover/tag:border-[var(--accent)] group-hover/tag:text-[var(--foreground)] transition-colors flex items-center gap-1"
                        >
                          <span>{s}</span>
                          {benefit && <span className="w-1 h-1 rounded-full bg-[var(--accent)] opacity-60" />}
                        </span>
                        {benefit && (
                          <div className="pointer-events-none absolute bottom-full mb-1.5 left-0 opacity-0 group-hover/tag:opacity-100 transition-opacity z-20 whitespace-nowrap bg-[var(--foreground)] text-[var(--background)] font-mono text-[8px] uppercase tracking-wider px-2 py-1 shadow-sm">
                            <span className="text-[var(--accent)] mr-1">Bénéfice :</span>
                            <span>{benefit}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ── 06 — Contact ────────────────────────────────────────── */}
      <ScrollReveal y={40}>
        <section className="px-6 md:px-12 lg:px-20 py-24 max-w-6xl mx-auto w-full border-t border-[var(--hairline)]">
          <div className="border border-[var(--hairline)] hover:border-[var(--accent)] transition-colors p-10 md:p-16 flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-6">
                06 — Contact
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl leading-[0.95] tracking-tight max-w-xl">
                Une équipe à rejoindre ?{" "}
                <span className="text-[var(--accent)] italic">Parlons-en.</span>
              </h2>
              <p className="mt-6 text-[var(--muted)] max-w-md leading-relaxed">
                Ouvert à une collaboration long terme, un CDI remote/hybride, ou un rétainer
                mensuel. Réponse sous 24h.
              </p>
              <div className="mt-8 print:hidden">
                <PrintCvButton />
              </div>
            </div>
            <div className="flex flex-col gap-4 shrink-0 print:hidden">
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--accent)] text-[var(--background)] font-mono text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                Discuter sur WhatsApp
                <span>→</span>
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-[var(--hairline)] font-mono text-sm uppercase tracking-wider hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                Email direct
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Footer ──────────────────────────────────────────────── */}
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
          <div>Collaboration · v1</div>
        </div>
      </footer>
    </main>
  );
}
