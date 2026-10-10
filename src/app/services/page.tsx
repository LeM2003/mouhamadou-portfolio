import type { Metadata } from "next";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Services — Mouhamadou Diouf",
  description:
    "Landing pages, sites vitrine, MVP SaaS, analyse de données & Power BI, intégration IA — estimation personnalisée après étude de votre besoin. Mouhamadou Diouf, AI Product Builder à Dakar.",
  alternates: { canonical: "/services" },
};

const CONTACT = {
  email: "Mouhamadoud_Diouf@proton.me",
  whatsappUrl: "https://wa.me/221783019983",
};

// Trois familles alignées sur l'accueil (Développement web & SaaS · Analyse de données & Power BI · Automatisation & intégration IA).
// « Régie / renfort d'équipe » isolée dans le bloc Collaboration.
// Règle : aucune réalisation, certification ou métrique non démontrée publiquement.
const families = [
  {
    id: "web",
    label: "Développement web",
    blurb: "Le web qui porte votre activité — de la page unique au SaaS en production.",
    offers: [
      {
        num: "01",
        title: "Landing & tunnel de vente",
        client: "Fondateurs, infopreneurs, lanceurs de produit qui ont une offre et besoin de capter des demandes.",
        need: "Convertir des visiteurs en leads ou en ventes avec une page unique et un message clair.",
        deliverables: "Page responsive, copy structurée, formulaire ou paiement intégré, déploiement en ligne.",
        limits: "Une page (ou un court tunnel). Copy rédigée par le client ou validée par lui ; publicité et budget média non inclus.",
        feats: ["Copy + Design", "Responsive", "Déploiement inclus"],
                        delay: "≈ 5 jours",
        project: null as { name: string; href: string } | null,
      },
      {
        num: "02",
        title: "Site vitrine professionnel",
        client: "PME et indépendants qui n'ont pas (ou plus) de présence web à jour.",
        need: "Donner une présence web crédible, hébergée et maintenable.",
        deliverables: "4 à 6 pages, responsive, SEO de base, mini-CMS pour modifier le contenu.",
        limits: "Périmètre de pages fixé au devis ; pas de e-commerce ni de fonctionnalités métier sur mesure.",
        feats: ["4–6 pages", "SEO", "CMS simple"],
                        delay: "≈ 2 semaines",
        project: { name: "Olèle Systems — site vitrine client", href: "/projects/olele-systems" },
      },
      {
        num: "03",
        title: "MVP SaaS / Application web",
        client: "Entrepreneurs qui veulent valider un produit, pas rédiger un cahier des charges.",
        need: "Transformer une idée en produit utilisable en production.",
        deliverables: "Authentification, base de données, 2–3 fonctionnalités clés, déploiement public. Next.js + Supabase.",
        limits: "MVP : fonctionnalités clés uniquement, pas de roadmap complète ni de support utilisateur 24/7. Itérations post-livraison possible en régie.",
        feats: ["Auth + BDD", "Next.js · Supabase", "En production"],
                        delay: "3–5 semaines",
        project: { name: "Liggeyo — LMS marque blanche en production", href: "/projects/liggeyo" },
      },
    ],
  },
  {
    id: "data",
    label: "Data",
    blurb: "Comprendre vos données et les restituer dans des tableaux de bord lisibles.",
    offers: [
      {
        num: "04",
        title: "Analyse de données & tableaux de bord",
        client: "PME et équipes qui collectent des données mais n'en tirent pas de décisions claires.",
        need: "Exploration de vos données, indicateurs suivis, tableaux de bord (Power BI) et premiers modèles prédictifs si les données le permettent.",
        deliverables: "Rapport d'analyse, dashboard Power BI commenté, recommandations actionnables.",
        limits: "Dépend de la qualité et de l'accès à vos données ; pas de promesse de résultat business garanti. En lien avec mon Master Data Science & IA (en cours).",
        feats: ["Analyse exploratoire", "Dashboard Power BI", "Modèles simples si pertinent"],
                        delay: "≈ 1 semaine",
        project: null as { name: string; href: string } | null,
      },
    ],
  },
  {
    id: "ia",
    label: "IA",
    blurb: "De l'IA utile, intégrée proprement au produit — pas un widget collé.",
    offers: [
      {
        num: "05",
        title: "Intégration & automatisation IA",
        client: "Équipes qui veulent gagner du temps sur des tâches répétitives ou enrichir un produit existant.",
        need: "Chatbot RAG, assistant intelligent, automatisation de tâches — greffés sur votre produit ou votre boîte mail.",
        deliverables: "Fonctionnalité IA intégrée, pipeline d'automatisation, documentation de ce qui est garanti et de ce qui ne l'est pas.",
        limits: "Les sorties LLM restent à superviser ; je n'automatise pas ce qui exige une décision réglementaire ou humaine.",
        feats: ["LLM · RAG", "Agents", "Automatisation"],
                        delay: "1–2 semaines",
        project: { name: "DABA — assistant email", href: "/projects/daba-email-assistant" },
      },
    ],
  },
];

const collaboration = {
  num: "06",
  title: "Régie / renfort d'équipe (remote)",
  client: "Équipes produit qui manquent de main-d'œuvre dev/product ponctuellement.",
  need: "Je rejoins votre équipe comme dev / product builder, au jour ou à la semaine. Remote depuis Dakar, fuseau EU-friendly (GMT+0).",
  deliverables: "Présence sur vos sprints, développement, coordination produit — selon votre organisation.",
  limits: "Une mission à la fois côté freelance ; les horaires s'alignent sur vos plages, pas sur du temps plein implicite.",
  feats: ["Dev + Product", "Remote", "EU-friendly"],
    delay: "Flexible",
};

const steps = [
  { letter: "A", title: "Premier échange", desc: "15 min pour comprendre votre besoin réel. Gratuit, sans engagement." },
  { letter: "B", title: "Analyse du besoin", desc: "Je cible le périmètre utile et les contraintes — pas le cahier des charges complet." },
  { letter: "C", title: "Proposition chiffrée", desc: "Périmètre précis, délai indicatif, montant détaillé. Vous validez avant d'engager." },
  { letter: "D", title: "Validation", desc: "Vous validez le périmètre, le délai et le montant avant que je commence." },
  { letter: "E", title: "Réalisation", desc: "Itérations rapides, communication directe, déploiement en ligne et temps de support après livraison." },
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
          <span>Services</span>
        </div>

        <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-normal leading-[0.95] tracking-tight max-w-3xl">
          Ce que je construis. <span className="italic text-[var(--accent)]">Pour qui, pourquoi, comment.</span>
        </h1>
        <p className="mt-7 max-w-xl text-lg md:text-xl text-[var(--muted)] leading-relaxed">
          Du site qui convertit au SaaS avec l&apos;IA intégrée dès l&apos;architecture. Chaque offre
          démarre par un premier échange gratuit, puis une estimation chiffrée après étude de
          votre besoin — périmètre et délais précis, sans prix affiché d&apos;avance.
        </p>
      </section>

      {/* ── Offres ───────────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-20 py-16 max-w-6xl mx-auto w-full border-t border-[var(--hairline)]">
        <div className="flex items-end justify-between gap-6 mb-10 pb-4 border-b border-[var(--hairline)]">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">
            Ce que je construis pour vous.
          </h2>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] hidden md:block">
            6 offres · 3 familles
          </div>
        </div>

        {families.map((family) => (
          <div key={family.id} className="mb-14 last:mb-0">
            <div className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              {family.label}
            </div>
            <p className="text-sm text-[var(--muted)] mb-6 max-w-xl">{family.blurb}</p>
            <div className="flex flex-col">
              {family.offers.map((offer) => (
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
                    <dl className="text-sm text-[var(--muted)] leading-relaxed max-w-xl space-y-1.5">
                      <div><dt className="inline font-mono text-[10px] uppercase tracking-wide text-[var(--foreground)]">Pour qui — </dt><dd className="inline">{offer.client}</dd></div>
                      <div><dt className="inline font-mono text-[10px] uppercase tracking-wide text-[var(--foreground)]">Besoin — </dt><dd className="inline">{offer.need}</dd></div>
                      <div><dt className="inline font-mono text-[10px] uppercase tracking-wide text-[var(--foreground)]">Livrables — </dt><dd className="inline">{offer.deliverables}</dd></div>
                    </dl>
                    <details className="group mt-2 max-w-xl">
                      <summary className="cursor-pointer list-none font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] hover:opacity-80 [&::-webkit-details-marker]:hidden">
                        Périmètre & limites ▸
                      </summary>
                      <p className="mt-1.5 text-sm text-[var(--muted)] leading-relaxed">{offer.limits}</p>
                    </details>
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
                    {offer.project && (
                      <a
                        href={offer.project.href}
                        className="inline-block mt-3 font-mono text-[11px] uppercase tracking-wide text-[var(--accent)] border-b border-[var(--accent)]"
                      >
                        Exemple réel : {offer.project.name} →
                      </a>
                    )}
                  </div>
                  <div className="text-left md:text-right">
                    <div className="font-[family-name:var(--font-display)] text-xl md:text-2xl leading-tight">
                      Sur devis, après étude de votre besoin
                    </div>
                    <span className="mt-2.5 inline-block font-mono text-[10px] uppercase tracking-wide text-[var(--accent)] border border-[var(--accent)] px-2.5 py-1">
                      {offer.delay} indicatif
                    </span>
                    <a
                      href={`mailto:${CONTACT.email}?subject=${encodeURIComponent("Estimation — " + offer.title)}&body=${encodeURIComponent("Bonjour Mouhamadou,\n\nJe souhaite une estimation pour : " + offer.title + ".\n\nMon besoin : \nDélai souhaité : \nBudget indicatif (facultatif) : \n\nMerci !")}`}
                      className="block mt-4 font-mono text-[11px] uppercase tracking-wide text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
                    >
                      Demander une estimation →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Bloc distinct — régie */}
        <div className="mb-14 last:mb-0">
          <div className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            Collaboration
          </div>
          <p className="text-sm text-[var(--muted)] mb-6 max-w-xl">
            Pas un produit livré : une présence dans votre équipe.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-[64px_1fr_230px] gap-4 md:gap-7 py-8 border-b border-[var(--hairline)] last:border-b-0 items-start">
            <div className="font-[family-name:var(--font-display)] italic text-3xl md:text-4xl text-[var(--accent-soft)] leading-none">
              {collaboration.num}
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-[27px] mb-2">
                {collaboration.title}
              </h3>
              <dl className="text-sm text-[var(--muted)] leading-relaxed max-w-xl space-y-1.5">
                <div><dt className="inline font-mono text-[10px] uppercase tracking-wide text-[var(--foreground)]">Pour qui — </dt><dd className="inline">{collaboration.client}</dd></div>
                <div><dt className="inline font-mono text-[10px] uppercase tracking-wide text-[var(--foreground)]">Besoin — </dt><dd className="inline">{collaboration.need}</dd></div>
                <div><dt className="inline font-mono text-[10px] uppercase tracking-wide text-[var(--foreground)]">Livrables — </dt><dd className="inline">{collaboration.deliverables}</dd></div>
              </dl>
              <details className="group mt-2 max-w-xl">
                <summary className="cursor-pointer list-none font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] hover:opacity-80 [&::-webkit-details-marker]:hidden">
                  Périmètre & limites ▸
                </summary>
                <p className="mt-1.5 text-sm text-[var(--muted)] leading-relaxed">{collaboration.limits}</p>
              </details>
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                {collaboration.feats.map((f) => (
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
              <div className="font-[family-name:var(--font-display)] text-xl md:text-2xl leading-tight">
                Sur devis, après étude de votre besoin
              </div>
              <span className="mt-2.5 inline-block font-mono text-[10px] uppercase tracking-wide text-[var(--accent)] border border-[var(--accent)] px-2.5 py-1">
                {collaboration.delay}
              </span>
              <a
                href={`mailto:${CONTACT.email}?subject=${encodeURIComponent("Estimation — " + collaboration.title)}&body=${encodeURIComponent("Bonjour Mouhamadou,\n\nJe souhaite une estimation pour : " + collaboration.title + ".\n\nMon besoin : \nDélai souhaité : \nBudget indicatif (facultatif) : \n\nMerci !")}`}
                className="block mt-4 font-mono text-[11px] uppercase tracking-wide text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
              >
                Demander une estimation →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-20 py-16 max-w-6xl mx-auto w-full border-t border-[var(--hairline)]">
        <div className="flex items-end justify-between gap-6 mb-10 pb-4 border-b border-[var(--hairline)]">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">
            Comment on travaille.
          </h2>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] hidden md:block">
            05 étapes
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-0">
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
        <div>Services · v2</div>
      </footer>
    </main>
  );
}
