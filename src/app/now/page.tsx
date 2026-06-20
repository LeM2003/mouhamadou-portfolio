import type { Metadata } from "next";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Maintenant — Mouhamadou Diouf",
  description:
    "Ce sur quoi travaille Mouhamadou Diouf en ce moment — Projets en cours, études Master Data Science & IA, lectures et apprentissages à Dakar.",
};

const focuses = [
  {
    num: "01",
    category: "Product & Leadership",
    title: "Product Owner @Auryntix",
    description:
      "Transformation d'une vision en roadmap produit, priorisation des besoins, coordination de l'équipe technique et pilotage de la delivery. Partenariat stratégique signé avec Zeksta Technology (Inde) pour accélérer la transformation digitale en Afrique.",
  },
  {
    num: "02",
    category: "Projets en Production",
    title: "Personal OS V2 · Olèle Systems",
    description:
      "Personal OS V2 : dashboard IA local-first pour étudiants et entrepreneurs africains (personal-os.click). Olèle Systems : LMS certifiant en production avec clients réels. Les deux sur Next.js 16 + Supabase + Vercel.",
  },
  {
    num: "03",
    category: "Études & Stack",
    title: "Master Data Science & IA · UMEF Dakar",
    description:
      "Combinaison de la rigueur data, du sens produit et de l'automatisation intelligente. Stack active : Next.js · TypeScript · React · Supabase · Tailwind · Python · LLMs · Vercel.",
  },
];

const readingList = [
  {
    title: "Designing Machine Learning Systems",
    author: "Chip Huyen",
    status: "En cours",
  },
  {
    title: "Show Your Work!",
    author: "Austin Kleon",
    status: "Relu régulièrement",
  },
  {
    title: "Crafting Interpretable AI",
    author: "Academic Papers",
    status: "Continu",
  },
];

export default function NowPage() {
  return (
    <main className="flex-1 flex flex-col">
      <Nav />

      {/* ── 01 — Hero Éditorial ───────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-20 pt-16 md:pt-24 pb-20 max-w-6xl mx-auto w-full">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-10 flex items-center gap-3">
          <span>01</span>
          <span className="w-8 h-px bg-[var(--hairline)]" />
          <span>Maintenant</span>
        </div>

        <div className="grid grid-cols-12 gap-8 md:gap-12 items-end">
          <div className="col-span-12 md:col-span-8">
            <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-normal leading-none tracking-tight">
              Ce sur quoi je bosse{" "}
              <span className="text-[var(--accent)] italic">actuellement</span>.
            </h1>
            <p className="mt-8 text-lg md:text-xl text-[var(--muted)] leading-relaxed max-w-2xl">
              Inspiré par le concept de Derek Sivers, cette page est une réponse à la question : 
              « Qu&apos;est-ce que tu fais en ce moment ? » Elle est mise à jour mensuellement.
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 flex md:justify-end text-right font-mono text-xs text-[var(--muted)]">
            <div>
              <span className="text-[var(--foreground)] font-medium">Dernière mise à jour</span>
              <br />
              Juin 2026 · Depuis Dakar 🇸🇳
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 — Focus ─────────────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-20 py-20 max-w-6xl mx-auto w-full border-t border-[var(--hairline)]">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-4">
              02 — Focus prioritaires
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl max-w-xs leading-tight">
              Mes trois fronts d&apos;activité.
            </h2>
          </div>
          
          <div className="col-span-12 md:col-span-8 space-y-12">
            {focuses.map((f) => (
              <div key={f.num} className="group grid grid-cols-12 gap-4 pb-8 border-b border-[var(--hairline)] last:border-b-0 last:pb-0">
                <div className="col-span-2 font-[family-name:var(--font-display)] text-3xl text-[var(--accent)] italic">
                  {f.num}
                </div>
                <div className="col-span-10">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted)] mb-1">
                    {f.category}
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl mb-3 group-hover:text-[var(--accent)] transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 — Lectures & Ressources ────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-20 py-20 max-w-6xl mx-auto w-full border-t border-[var(--hairline)]">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-4">
              03 — Bibliothèque
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl max-w-xs leading-tight">
              Lectures du moment.
            </h2>
            <p className="mt-4 text-xs text-[var(--muted)] leading-relaxed max-w-xs">
              Les livres, thèses et essais qui influencent ma façon de concevoir des produits ou d&apos;envisager la data science.
            </p>
          </div>

          <div className="col-span-12 md:col-span-8 flex flex-col">
            {readingList.map((book) => (
              <div
                key={book.title}
                className="group flex items-center justify-between py-6 border-b border-[var(--hairline)] last:border-0"
              >
                <div>
                  <div className="font-[family-name:var(--font-display)] text-xl group-hover:text-[var(--accent)] transition-colors">
                    {book.title}
                  </div>
                  <div className="text-xs text-[var(--muted)] mt-1 font-mono">
                    Par {book.author}
                  </div>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 border border-[var(--hairline)] text-[var(--muted)] group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] transition-colors">
                  {book.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
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
