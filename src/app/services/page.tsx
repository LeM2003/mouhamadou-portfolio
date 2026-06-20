import type { Metadata } from "next";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Services & Tarifs — Mouhamadou Diouf",
  description:
    "Landing pages, sites vitrine, MVP SaaS, intégration IA, régie freelance — prix affichés, délais clairs. AI Product Builder à Dakar, disponible pour missions freelance.",
};

const CONTACT = {
  email: "Mouhamadoud_Diouf@proton.me",
  whatsappUrl: "https://wa.me/221783019983",
};

const offers = [
  {
    num: "01",
    title: "Landing & tunnel de vente",
    desc: "Une page unique qui convertit : copy persuasive, design soigné, déploiement. Idéale pour vendre une formation, un produit ou capter des leads.",
    feats: ["Copy + Design", "Responsive", "Déploiement inclus"],
    fcfa: "150–300k FCFA",
    eur: "250–500 €",
    delay: "≈ 5 jours",
  },
  {
    num: "02",
    title: "Site vitrine professionnel",
    desc: "4 à 6 pages, responsive, SEO de base, mini-CMS pour gérer le contenu. Pour donner à votre activité une présence web qui inspire confiance.",
    feats: ["4–6 pages", "SEO", "CMS simple"],
    fcfa: "350–600k FCFA",
    eur: "600–1000 €",
    delay: "≈ 2 semaines",
  },
  {
    num: "03",
    title: "MVP SaaS / Application web",
    desc: "Votre idée transformée en produit utilisable : authentification, base de données, 2–3 fonctionnalités clés, déployé. Next.js + Supabase.",
    feats: ["Auth + BDD", "Next.js · Supabase", "En production"],
    fcfa: "dès 800k FCFA",
    eur: "dès 1500 €",
    delay: "3–5 semaines",
  },
  {
    num: "04",
    title: "Intégration IA",
    desc: "Chatbot RAG, assistant intelligent, automatisation — greffés sur votre produit existant. De l'IA utile, pensée comme un produit, pas un widget collé.",
    feats: ["LLM · RAG", "Agents", "Automatisation"],
    fcfa: "dès 400k FCFA",
    eur: "dès 700 €",
    delay: "1–2 semaines",
  },
  {
    num: "05",
    title: "Régie / renfort d'équipe (remote)",
    desc: "Je rejoins votre équipe comme dev / product builder, au jour ou à la semaine. Remote depuis Dakar, fuseau EU-friendly (GMT+0).",
    feats: ["Dev + Product", "Remote", "EU-friendly"],
    fcfa: "150–300 € / jour",
    eur: "TJM · selon mission",
    delay: "Flexible",
  },
  {
    num: "06",
    title: "Conseil Data & Analyse",
    desc: "Exploration de vos données, dashboards clairs, premiers modèles prédictifs. Issu de mon Master Data Science & IA — pensé pour des décisions business, pas pour un rapport académique qui dort dans un tiroir.",
    feats: ["Analyse exploratoire", "Dashboards", "Modèles simples"],
    fcfa: "dès 200k FCFA",
    eur: "dès 350 €",
    delay: "≈ 1 semaine",
  },
];

const steps = [
  { letter: "A", title: "On échange", desc: "15 min pour comprendre votre besoin réel. Gratuit, sans engagement." },
  { letter: "B", title: "Devis clair", desc: "Prix ferme, périmètre précis, délai annoncé. Aucune surprise." },
  { letter: "C", title: "Je construis", desc: "Vous suivez l'avancement. Itérations rapides, communication directe." },
  { letter: "D", title: "Livré & déployé", desc: "En ligne, fonctionnel, à vous. Avec un temps de support après livraison." },
];

export default function ServicesPage() {
  return (
    <main className="flex-1 flex flex-col">
      <Nav />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-20 pt-16 md:pt-24 pb-16 max-w-6xl mx-auto w-full relative overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-10 right-0 font-[family-name:var(--font-display)] italic text-[16rem] md:text-[22rem] leading-[0.78] text-[var(--accent)] opacity-[0.06] pointer-events-none -tracking-[0.04em] select-none"
        >
          02
        </div>

        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)] border border-[var(--accent)] px-3 py-1.5 mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          Disponible · missions freelance
        </div>

        <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-4 flex items-center gap-3">
          <span>02</span>
          <span className="w-8 h-px bg-[var(--hairline)]" />
          <span>Services & Tarifs</span>
        </div>

        <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-normal leading-[0.95] tracking-tight max-w-3xl">
          Des offres <span className="italic text-[var(--accent)]">claires</span>. Des prix{" "}
          <span className="italic text-[var(--accent)]">affichés</span>. Livré vite.
        </h1>
        <p className="mt-7 max-w-xl text-lg md:text-xl text-[var(--muted)] leading-relaxed">
          Pas de devis flou ni de « ça dépend ». Voici exactement ce que je construis, en combien
          de temps, et combien ça coûte. Du site qui convertit au SaaS avec l&apos;IA intégrée dès
          l&apos;architecture.
        </p>
      </section>

      {/* ── Offres ───────────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-20 py-16 max-w-6xl mx-auto w-full border-t border-[var(--hairline)]">
        <div className="flex items-end justify-between gap-6 mb-10 pb-4 border-b border-[var(--hairline)]">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">
            Ce que je construis pour vous.
          </h2>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] hidden md:block">
            06 offres
          </div>
        </div>

        <div className="flex flex-col">
          {offers.map((offer) => (
            <div
              key={offer.num}
              className="grid grid-cols-1 md:grid-cols-[64px_1fr_230px] gap-4 md:gap-7 py-8 border-b border-[var(--hairline)] last:border-b-0 items-start"
            >
              <div className="font-[family-name:var(--font-display)] italic text-3xl md:text-4xl text-[var(--accent-soft)] leading-none">
                {offer.num}
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-[27px] mb-2">
                  {offer.title}
                </h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed max-w-md">
                  {offer.desc}
                </p>
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {offer.feats.map((f) => (
                    <span
                      key={f}
                      className="font-mono text-[10px] uppercase tracking-wide text-[var(--muted)] border border-[var(--hairline)] px-2 py-1"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-left md:text-right">
                <div className="font-[family-name:var(--font-display)] text-2xl md:text-[30px] leading-tight">
                  {offer.fcfa}
                </div>
                <div className="font-mono text-[13px] text-[var(--muted)] mt-1">{offer.eur}</div>
                <span className="mt-2.5 inline-block font-mono text-[10px] uppercase tracking-wide text-[var(--accent)] border border-[var(--accent)] px-2.5 py-1">
                  {offer.delay}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-20 py-16 max-w-6xl mx-auto w-full border-t border-[var(--hairline)]">
        <div className="flex items-end justify-between gap-6 mb-10 pb-4 border-b border-[var(--hairline)]">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">
            Comment on travaille.
          </h2>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] hidden md:block">
            04 étapes
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {steps.map((step, i) => (
            <div
              key={step.letter}
              className={`pr-0 md:pr-6 ${i < steps.length - 1 ? "md:border-r border-[var(--hairline)]" : ""}`}
            >
              <div className="font-[family-name:var(--font-display)] italic text-4xl md:text-[44px] text-[var(--accent)] opacity-30 mb-3.5">
                {step.letter}
              </div>
              <h4 className="font-[family-name:var(--font-display)] text-xl mb-2">{step.title}</h4>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-20 py-16 max-w-6xl mx-auto w-full border-t border-[var(--hairline)]">
        <div className="border border-[var(--hairline)] p-8 md:p-14 flex flex-col md:flex-row items-stretch md:items-end justify-between gap-8 md:gap-10">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-[54px] leading-[0.98] max-w-lg">
              Un projet en tête ? <span className="italic text-[var(--accent)]">Parlons-en.</span>
            </h2>
            <p className="mt-5 text-[var(--muted)] max-w-md leading-relaxed">
              Réponse sous 24h. Premier échange gratuit. Disponible pour missions freelance et
              collaborations long terme.
            </p>
          </div>
          <div className="flex flex-col gap-3.5 shrink-0">
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-[var(--accent)] text-[var(--background)] font-mono text-sm uppercase tracking-wide px-7 py-4 text-center hover:opacity-90 transition-opacity"
            >
              Discuter sur WhatsApp →
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="border border-[var(--hairline)] font-mono text-sm uppercase tracking-wide px-7 py-4 text-center hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              Email direct
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="px-6 md:px-12 lg:px-20 py-10 mt-auto border-t border-[var(--hairline)] flex items-center justify-between font-mono text-xs text-[var(--muted)]">
        <div>© {new Date().getFullYear()} Mouhamadou Diouf · Dakar 🇸🇳</div>
        <div>Services · v1</div>
      </footer>
    </main>
  );
}
