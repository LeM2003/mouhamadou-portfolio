import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  getProjectBySlug,
  getAdjacentProjects,
  projects,
} from "@/data/projects";

type Params = Promise<{ slug: string }>;

/**
 * Génération statique : Next.js pré-rend les 4 pages au build.
 * Performance maximale (rien à compute au request time).
 */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Projet introuvable" };
  return {
    title: `${project.name} — Mouhamadou Diouf`,
    description: project.context,
  };
}

const statusLabels: Record<string, string> = {
  production: "En production · clients réels",
  active: "Développement actif",
  "open-source": "Open source · communautaire",
  archived: "Archivé",
};

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);

  return (
    <main className="flex-1 flex flex-col">
      <Nav />

      {/* ── HERO ── */}
      <section className="relative px-6 md:px-12 lg:px-20 pt-16 md:pt-24 pb-12 max-w-6xl mx-auto w-full overflow-hidden">
        {/* Numéro monumental en arrière-plan (signature brutaliste) */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-4 right-0 md:right-8 lg:right-16 font-[family-name:var(--font-display)] text-[14rem] md:text-[20rem] lg:text-[26rem] italic leading-[0.78] tracking-tighter text-[var(--accent)] opacity-[0.07] select-none"
        >
          {project.num}
        </div>

        <div className="relative font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-8 flex items-center gap-3 flex-wrap">
          <Link
            href="/#projects"
            className="hover:text-[var(--accent)] transition-colors"
          >
            ← Projets
          </Link>
          <span className="w-8 h-px bg-[var(--hairline)]" />
          <span>{project.num}</span>
          <span className="w-8 h-px bg-[var(--hairline)]" />
          <span className="text-[var(--accent)]">
            {statusLabels[project.status]}
          </span>
        </div>

        <h1 className="relative font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-normal leading-[0.95] tracking-tight max-w-4xl">
          {project.name}
        </h1>
        <p className="relative mt-6 font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
          {project.tag} · {project.year}
        </p>

        <div className="relative mt-12 grid grid-cols-12 gap-6 md:gap-12 max-w-5xl">
          <div className="col-span-12 md:col-span-7">
            <p className="text-lg md:text-xl text-[var(--foreground)] leading-relaxed">
              {project.context}
            </p>
            <p className="mt-4 text-sm md:text-base italic text-[var(--muted)] leading-relaxed border-l-2 border-[var(--accent-soft)] pl-4">
              Décision clé : {project.decision}
            </p>
          </div>
          <div className="col-span-12 md:col-span-5 flex flex-col gap-3 md:items-end font-mono text-xs">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor-text="Voir en live"
                className="inline-flex items-center gap-2 uppercase tracking-[0.15em] text-[var(--foreground)] hover:text-[var(--accent)] transition-colors group"
              >
                <span className="text-[var(--muted)] group-hover:text-[var(--accent)]">
                  →
                </span>
                <span className="border-b border-[var(--foreground)] group-hover:border-[var(--accent)] transition-colors">
                  Voir en live
                </span>
              </a>
            )}
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor-text="Voir le code"
                className="inline-flex items-center gap-2 uppercase tracking-[0.15em] text-[var(--foreground)] hover:text-[var(--accent)] transition-colors group"
              >
                <span className="text-[var(--muted)] group-hover:text-[var(--accent)]">
                  →
                </span>
                <span className="border-b border-[var(--foreground)] group-hover:border-[var(--accent)] transition-colors">
                  Code source GitHub
                </span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 uppercase tracking-[0.15em] text-[var(--muted)] italic">
                <span>·</span>
                <span>Code privé · projet client</span>
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── PROBLÈME ── */}
      <ScrollReveal>
        <section className="px-6 md:px-12 lg:px-20 py-16 max-w-6xl mx-auto w-full border-t border-[var(--hairline)]">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-6 flex items-center gap-3">
            <span>01</span>
            <span className="w-8 h-px bg-[var(--hairline)]" />
            <span>Le problème</span>
          </div>
          <p className="text-lg md:text-xl text-[var(--foreground)] leading-relaxed max-w-3xl">
            {project.caseStudy.problem}
          </p>
        </section>
      </ScrollReveal>

      {/* ── SOLUTION ── */}
      <ScrollReveal>
        <section className="px-6 md:px-12 lg:px-20 py-16 max-w-6xl mx-auto w-full border-t border-[var(--hairline)]">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-6 flex items-center gap-3">
            <span>02</span>
            <span className="w-8 h-px bg-[var(--hairline)]" />
            <span>La solution</span>
          </div>
          <p className="text-base md:text-lg text-[var(--foreground)] leading-relaxed max-w-3xl">
            {project.caseStudy.solution}
          </p>
        </section>
      </ScrollReveal>

      {/* ── STACK ── */}
      <ScrollReveal>
        <section className="px-6 md:px-12 lg:px-20 py-16 max-w-6xl mx-auto w-full border-t border-[var(--hairline)]">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-6 flex items-center gap-3">
            <span>03</span>
            <span className="w-8 h-px bg-[var(--hairline)]" />
            <span>Stack complète</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.caseStudy.fullStack.map((s) => (
              <span
                key={s}
                className="font-mono text-[11px] md:text-xs uppercase tracking-wider px-3 py-2 border border-[var(--hairline)] text-[var(--foreground)]"
              >
                {s}
              </span>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ── DÉCISIONS CLÉS ── */}
      <ScrollReveal>
        <section className="px-6 md:px-12 lg:px-20 py-16 max-w-6xl mx-auto w-full border-t border-[var(--hairline)]">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-8 flex items-center gap-3">
            <span>04</span>
            <span className="w-8 h-px bg-[var(--hairline)]" />
            <span>Décisions d&apos;architecture</span>
          </div>
          <div className="flex flex-col gap-12 max-w-4xl">
            {project.caseStudy.keyDecisions.map((d, i) => (
              <div key={d.title} className="grid grid-cols-12 gap-4">
                <div className="col-span-2 md:col-span-1 font-[family-name:var(--font-display)] text-4xl md:text-5xl text-[var(--muted)] italic leading-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="col-span-10 md:col-span-11">
                  <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl mb-2 text-[var(--foreground)]">
                    {d.title}
                  </h3>
                  <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed">
                    {d.rationale}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ── MÉTRIQUES ── */}
      {project.caseStudy.metrics.length > 0 && (
        <ScrollReveal>
          <section className="px-6 md:px-12 lg:px-20 py-16 max-w-6xl mx-auto w-full border-t border-[var(--hairline)]">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-8 flex items-center gap-3">
              <span>05</span>
              <span className="w-8 h-px bg-[var(--hairline)]" />
              <span>Métriques</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
              {project.caseStudy.metrics.map((m) => (
                <div key={m.label} className="flex flex-col">
                  <div className="font-[family-name:var(--font-display)] text-[3rem] md:text-[4.5rem] lg:text-[6rem] italic leading-[0.9] tracking-tighter text-[var(--foreground)]">
                    {m.value}
                  </div>
                  <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.18em] text-[var(--muted)] mt-2">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* ── LEÇONS APPRISES ── */}
      {project.caseStudy.learnings.length > 0 && (
        <ScrollReveal>
          <section className="px-6 md:px-12 lg:px-20 py-16 max-w-6xl mx-auto w-full border-t border-[var(--hairline)]">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-8 flex items-center gap-3">
              <span>06</span>
              <span className="w-8 h-px bg-[var(--hairline)]" />
              <span>Ce que j&apos;ai appris</span>
            </div>
            <ul className="flex flex-col gap-6 max-w-3xl">
              {project.caseStudy.learnings.map((l, i) => (
                <li
                  key={i}
                  className="flex gap-4 text-base md:text-lg leading-relaxed text-[var(--foreground)]"
                >
                  <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-wider shrink-0 pt-2">
                    L0{i + 1}
                  </span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </section>
        </ScrollReveal>
      )}

      {/* ── NAV PRÉCÉDENT / SUIVANT ── */}
      <section className="px-6 md:px-12 lg:px-20 py-16 max-w-6xl mx-auto w-full border-t border-[var(--hairline)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              data-cursor-text={prev.cursorText}
              className="group flex flex-col gap-2 text-left"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
                ← Projet précédent · {prev.num}
              </span>
              <span className="font-[family-name:var(--font-display)] text-2xl md:text-3xl group-hover:text-[var(--accent)] transition-colors">
                {prev.name}
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
                {prev.tag}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              data-cursor-text={next.cursorText}
              className="group flex flex-col gap-2 md:items-end md:text-right"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
                Projet suivant · {next.num} →
              </span>
              <span className="font-[family-name:var(--font-display)] text-2xl md:text-3xl group-hover:text-[var(--accent)] transition-colors">
                {next.name}
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
                {next.tag}
              </span>
            </Link>
          ) : (
            <Link
              href="/"
              className="group flex flex-col gap-2 md:items-end md:text-right"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
                Retour à l&apos;accueil →
              </span>
              <span className="font-[family-name:var(--font-display)] text-2xl md:text-3xl group-hover:text-[var(--accent)] transition-colors">
                /
              </span>
            </Link>
          )}
        </div>
      </section>

      <footer className="px-6 md:px-12 lg:px-20 py-12 mt-auto border-t border-[var(--hairline)]">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-[var(--muted)] font-mono">
          <div>© {new Date().getFullYear()} Mouhamadou Diouf</div>
          <div>
            /projects/{project.slug} · {project.year}
          </div>
        </div>
      </footer>
    </main>
  );
}
