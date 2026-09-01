/**
 * Source de vérité unique pour la page `/collaboration` (CV-like, CDI/long terme).
 *
 * Règle stricte : aucun fait inventé. Tout champ non confirmé porte
 * `verified: false` et un texte "À confirmer" explicite dans la valeur —
 * jamais une date ou un intitulé plausible mais non vérifié.
 */

import type { ProjectSlug } from "@/data/projects";

export type ExperienceEntry = {
  id: string;
  role: string;
  org: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  verified: boolean;
};

export type EducationEntry = {
  id: string;
  degree: string;
  institution: string;
  period: string;
  detail: string;
  verified: boolean;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export const experience: ExperienceEntry[] = [
  {
    id: "auryntix-po",
    role: "Product Owner",
    org: "Auryntix",
    period: "Juin 2026 — en cours",
    location: "Dakar, Sénégal (remote-friendly)",
    summary:
      "Premier poste professionnel. Pilotage produit d'une agence IA & Web — roadmap, priorisation, coordination technique, de la vision au déploiement.",
    highlights: [
      "Partenariat stratégique signé avec Zeksta Technology (Inde) pour accélérer la transformation digitale en Afrique",
      "Coordination technique du site Auryntix (Next.js 16 + GSAP) et des produits en portefeuille",
    ],
    verified: true,
  },
  // Aucune expérience professionnelle antérieure à Auryntix — ne pas inventer
  // de poste précédent. Le projet "Web Developer 2024-2025" était un projet
  // d'étude (EcoTrack), pas un emploi — il vit dans /projects, pas ici.
];

export const education: EducationEntry[] = [
  {
    id: "master-ds-ia",
    degree: "Master Data Science & IA",
    institution: "UMEF Dakar",
    period: "Novembre 2025 — Novembre 2027 (2 ans)",
    detail:
      "Rigueur data, sens produit et automatisation intelligente. Stack active : Next.js, TypeScript, React, Supabase, Tailwind, Python, LLMs.",
    verified: true,
  },
  {
    id: "licence-bem",
    degree: "Licence en Statistiques et Informatiques Décisionnelles",
    institution: "Bem Dakar",
    period: "Obtenue en août 2025",
    detail:
      "Cohérent avec le projet de recherche COVID-19 mené à Bem Dakar (janvier–mars 2025).",
    verified: true,
  },
];

export const skills: SkillGroup[] = [
  {
    label: "Produit & Leadership",
    items: ["Roadmap & priorisation", "Coordination technique", "Pilotage delivery"],
  },
  {
    label: "Frontend",
    items: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "Framer Motion"],
  },
  {
    label: "Backend & Data",
    items: ["Supabase", "Postgres · RLS", "Python"],
  },
  {
    label: "IA & LLM",
    items: ["Groq · Llama 3.3", "RAG", "Intégration LLM produit"],
  },
  {
    label: "Outils",
    items: ["Vercel", "GitHub", "Sentry"],
  },
];

/** Projets vitrine repris sur /collaboration — filtre sur src/data/projects.ts, pas de duplication de contenu. */
export const flagshipProjectSlugs: ProjectSlug[] = [
  "olele-systems",
  "personal-os-v2",
  "auryntix",
];
