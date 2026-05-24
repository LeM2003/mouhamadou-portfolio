import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { SaveContactButton } from "@/components/SaveContactButton";
import { QRCodeBlock } from "@/components/QRCodeBlock";

export const metadata: Metadata = {
  title: "Carte — Mouhamadou Diouf",
  description:
    "Carte de visite digitale de Mouhamadou Diouf — AI Product Builder à Dakar. Email, LinkedIn, GitHub, WhatsApp + QR code à scanner pour ajouter le contact.",
};

// Infos perso centralisées (sources de vérité)
const CONTACT = {
  fullName: "Mouhamadou Diouf",
  firstName: "Mouhamadou",
  lastName: "Diouf",
  title: "AI Product Builder",
  org: "Indépendant",
  location: "Dakar, Sénégal",
  email: "Mouhamadoud_Diouf@proton.me",
  linkedin: "https://www.linkedin.com/in/mouhamadoudiouf",
  github: "https://github.com/LeM2003",
  phoneInternational: "+221783019983",
  phoneDisplay: "+221 78 301 99 83",
  whatsappUrl: "https://wa.me/221783019983",
  website: "https://mouhamadou-diouf.com",
  note: "Master Data Science & IA · UMEF Dakar · Open to freelance & collaborations",
};

// Génération vCard 3.0 — format standard reconnu par iOS / Android / Outlook
const vcardString = [
  "BEGIN:VCARD",
  "VERSION:3.0",
  `FN:${CONTACT.fullName}`,
  `N:${CONTACT.lastName};${CONTACT.firstName};;;`,
  `TITLE:${CONTACT.title}`,
  `ORG:${CONTACT.org}`,
  `EMAIL;TYPE=INTERNET,PREF:${CONTACT.email}`,
  `TEL;TYPE=CELL,VOICE:${CONTACT.phoneInternational}`,
  `URL;TYPE=Portfolio:${CONTACT.website}`,
  `URL;TYPE=LinkedIn:${CONTACT.linkedin}`,
  `URL;TYPE=GitHub:${CONTACT.github}`,
  `ADR;TYPE=WORK:;;;${CONTACT.location};;;Sénégal`,
  `NOTE:${CONTACT.note}`,
  "END:VCARD",
].join("\n");

const channels = [
  {
    label: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    note: "Réponse sous 24h",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/mouhamadoudiouf",
    href: CONTACT.linkedin,
    note: "Canal principal · open to opportunities",
  },
  {
    label: "GitHub",
    value: "github.com/LeM2003",
    href: CONTACT.github,
    note: "Projets en cours · open source",
  },
  {
    label: "WhatsApp",
    value: CONTACT.phoneDisplay,
    href: CONTACT.whatsappUrl,
    note: "Message direct · français / anglais",
  },
];

const availableFor = [
  {
    num: "01",
    title: "Mission freelance internationale",
    detail:
      "Sites, e-commerce, SaaS, intégration IA (LLM · RAG · chatbots). Fuseau EU-friendly depuis Dakar.",
  },
  {
    num: "02",
    title: "Collaboration long terme / CDI remote",
    detail:
      "Équipes tech qui veulent un produit-builder polyvalent comprenant l'IA comme produit.",
  },
  {
    num: "03",
    title: "Conseil produit & intégration IA",
    detail:
      "Audit, choix techniques, prototypage — pour startups qui veulent dépasser le chatbot collé.",
  },
];

export default function CardPage() {
  return (
    <main className="flex-1 flex flex-col">
      <Nav />

      {/* ── 01 — Carte de visite ───────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-20 pt-16 md:pt-24 pb-20 max-w-6xl mx-auto w-full">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-10 flex items-center gap-3">
          <span>01</span>
          <span className="w-8 h-px bg-[var(--hairline)]" />
          <span>Carte de visite</span>
        </div>

        <div className="grid grid-cols-12 gap-8 md:gap-12 items-end">
          {/* Identité — colonne gauche */}
          <div className="col-span-12 md:col-span-8">
            <div className="font-[family-name:var(--font-display)] text-[10rem] md:text-[14rem] lg:text-[18rem] leading-[0.85] tracking-tighter text-[var(--accent)] italic mb-6">
              MD
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-normal leading-tight tracking-tight">
              {CONTACT.fullName}
            </h1>
            <div className="mt-3 font-mono text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
              {CONTACT.title} · {CONTACT.location} 🇸🇳
            </div>
            <p className="mt-6 text-base md:text-lg text-[var(--muted)] leading-relaxed max-w-2xl">
              Master Data Science & IA — UMEF Dakar. Je construis des sites,
              e-commerce et SaaS où l&apos;IA est intégrée dès la conception, pas
              collée après coup.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4">
              <SaveContactButton vcardString={vcardString} />
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 text-base font-medium border-b border-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors pb-1"
              >
                <span className="font-mono text-xs text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
                  →
                </span>
                <span>Discuter sur WhatsApp</span>
              </a>
            </div>
          </div>

          {/* QR — colonne droite */}
          <div className="col-span-12 md:col-span-4 flex md:justify-end">
            <QRCodeBlock value={vcardString} size={200} />
          </div>
        </div>
      </section>

      {/* ── 02 — Channels ─────────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-20 py-24 max-w-6xl mx-auto w-full">
        <div className="flex items-end justify-between mb-12 pb-4 border-b border-[var(--hairline)]">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-2">
              02 — Channels
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">
              Où me joindre.
            </h2>
          </div>
          <div className="font-mono text-xs text-[var(--muted)]">
            {channels.length.toString().padStart(2, "0")} canaux
          </div>
        </div>

        <div className="flex flex-col">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="group grid grid-cols-12 gap-6 py-7 border-b border-[var(--hairline)] hover:border-[var(--accent)] transition-colors"
            >
              <div className="col-span-12 md:col-span-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors self-center">
                {c.label}
              </div>
              <div className="col-span-12 md:col-span-5 font-[family-name:var(--font-display)] text-xl md:text-2xl group-hover:text-[var(--accent)] transition-colors">
                {c.value}
              </div>
              <div className="col-span-12 md:col-span-4 text-sm text-[var(--muted)] italic self-center">
                {c.note}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── 03 — Disponible pour ──────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-20 py-24 max-w-6xl mx-auto w-full">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-6">
          03 — Disponible pour
        </div>
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl mb-12 max-w-3xl">
          Ce sur quoi on peut{" "}
          <span className="text-[var(--accent)] italic">travailler</span>{" "}
          ensemble.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {availableFor.map((item) => (
            <div
              key={item.num}
              className="border-t border-[var(--hairline)] pt-6"
            >
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-3">
                {item.num}
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl mb-3 leading-tight">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
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
