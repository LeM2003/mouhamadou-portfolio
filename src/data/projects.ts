/**
 * Source de vérité unique pour les projets affichés sur le portfolio.
 *
 * - Home page (`src/app/page.tsx`) : grille des cards
 * - Page détail (`src/app/projects/[slug]/page.tsx`) : étude de cas
 * - Command palette (`src/lib/commandPalette/intents.ts`) : metadata
 *
 * Pour ajouter un projet : créer une nouvelle entrée dans `projects` —
 * la route `/projects/[slug]` se génère automatiquement.
 */

export type ProjectSlug =
  | "olele-systems"
  | "personal-os-v2"
  | "muslim-app"
  | "import-manager-sn";

export type Project = {
  slug: ProjectSlug;
  num: string;
  name: string;
  tag: string;
  year: string;
  status: "production" | "active" | "open-source" | "archived";
  /** Affiché sur la card home */
  context: string;
  /** Affiché sur la card home : la décision d'archi clé */
  decision: string;
  /** Affiché par le curseur sémantique au hover */
  cursorText: string;
  /** Stack affichée sur la card (max 3 tags) */
  stack: string[];
  /** Pour le tunnel GitHub depuis l'étude de cas */
  repoUrl: string | null; // null si privé
  /** URL live du produit si dispo */
  liveUrl: string | null;
  /** Étude de cas enrichie */
  caseStudy: {
    /** Problème résolu, en 2-3 lignes */
    problem: string;
    /** Solution mise en place, architecture en prose */
    solution: string;
    /** Stack complète technique */
    fullStack: string[];
    /** Décisions clés justifiées */
    keyDecisions: Array<{ title: string; rationale: string }>;
    /** Métriques mesurables (si dispo) */
    metrics: Array<{ label: string; value: string }>;
    /** Apprentissages personnels */
    learnings: string[];
  };
};

export const projects: Project[] = [
  {
    slug: "olele-systems",
    num: "01",
    name: "Olèle Systems",
    tag: "Plateforme LMS",
    year: "2025 – 2026",
    status: "production",
    context: "Formations vidéo + quiz certifiants pour la diaspora",
    decision: "Next.js 16 RSC + Supabase RLS pour scaler à coût quasi-nul",
    cursorText: "Supabase RLS · JWT",
    stack: ["Next.js 16", "Supabase", "Vercel"],
    repoUrl: null, // repo privé client
    liveUrl: "https://olelesystems.company",
    caseStudy: {
      problem:
        "Un client souhaitait une plateforme LMS premium pour vendre ses formations e-commerce à la diaspora africaine. Les solutions du marché (Teachable, Thinkific) facturent 99-299$/mois et imposent leur branding. Pour un MVP rentable, il fallait une stack sur-mesure scalable à coût quasi-nul.",
      solution:
        "Architecture Next.js 16 App Router avec React Server Components pour le rendu rapide des leçons. Supabase Postgres pour la base de données avec Row Level Security stricte. JWT custom + cookies httpOnly pour l'authentification (jose + bcryptjs). Quiz certifiants avec génération HTML imprimable des diplômes. Flow paiement WhatsApp + Wave/Orange Money manuel (étape 1), Stripe/Wave intégré en V2. Sentry pour le monitoring production.",
      fullStack: [
        "Next.js 16 (App Router · RSC)",
        "React 19 · TypeScript",
        "Tailwind v4 · shadcn/ui",
        "Supabase (Postgres + Auth + Realtime)",
        "Row Level Security (RLS) stricte",
        "JWT custom (jose + bcryptjs)",
        "Validation Zod côté serveur",
        "Sentry monitoring",
        "Vercel deployment",
      ],
      keyDecisions: [
        {
          title: "JWT custom plutôt que Supabase Auth",
          rationale:
            "Contrôle total du flow (token rotation, cookies httpOnly + SameSite Strict, expiration personnalisée). Supabase Auth coûte des MAU et impose son UI — pas adapté au client.",
        },
        {
          title: "RLS Postgres plutôt que middleware Node",
          rationale:
            "La sécurité au niveau base = aucune fuite possible même si l'API a un bug. Audité P0 sécurité avant mise en prod.",
        },
        {
          title: "Certificats HTML imprimables au lieu de PDF",
          rationale:
            "Pas de lib PDF lourde (~500 Ko). Le print CSS du browser génère un PDF parfait gratuitement. Bundle léger.",
        },
      ],
      metrics: [
        { label: "Audit sécurité", value: "P0 validé" },
        { label: "Monitoring", value: "Sentry actif 24/7" },
        { label: "Clients", value: "Clients réels en production" },
        { label: "Backup", value: "Auto-backup quotidien" },
      ],
      learnings: [
        "Le pattern RSC + Supabase RLS est imbattable en coût/perf pour un LMS solo.",
        "Auditer P0 sécurité AVANT la mise en prod évite 90% des post-mortems.",
        "Le client préfère un MVP qui marche en 2 mois à une V1 parfaite en 6 mois.",
      ],
    },
  },
  {
    slug: "personal-os-v2",
    num: "02",
    name: "Personal OS V2",
    tag: "Dashboard de vie",
    year: "2026 — en cours",
    status: "active",
    context: "Outil personnel — école, finances, tâches, assistant IA",
    decision: "Local-first avec Groq pour latence assistant <500ms",
    cursorText: "Local-first · Groq",
    stack: ["Next.js 16", "Groq", "Framer Motion"],
    repoUrl: "https://github.com/LeM2003/personal-os-v2",
    liveUrl: "https://personal-os-v2-wheat.vercel.app",
    caseStudy: {
      problem:
        "J'avais besoin d'un dashboard personnel unique pour gérer école (Master Data Science / IA), finances, tâches, journal et assistant IA. Notion est trop lourd, Apple Notes trop limité, les outils SaaS facturent et stockent mes données. Je voulais local-first + assistant IA sous 500ms.",
      solution:
        "Next.js 16 avec App Router et migration TypeScript récente. Refonte UI complète en 2026 avec Framer Motion pour les micro-interactions. Groq API (Llama 3.3 70B) pour l'assistant IA sous 500ms de latence. Migration en cours de localStorage vers Supabase pour la sync multi-device (V2.3). 11 tables conçues avec RLS pour multi-tenancy future.",
      fullStack: [
        "Next.js 16.2 (App Router)",
        "React 19 · TypeScript 5",
        "Tailwind v4",
        "Framer Motion (micro-interactions)",
        "Groq API · Llama 3.3 70B",
        "Supabase (migration en cours)",
        "PWA · sw.js custom",
        "Playwright (tests E2E)",
        "Vercel",
      ],
      keyDecisions: [
        {
          title: "Groq plutôt qu'OpenAI/Anthropic",
          rationale:
            "Latence 200-400ms vs 1-3s. Pour un assistant utilisé quotidiennement, c'est non-négociable. Tradeoff : modèles légèrement moins performants, mais Llama 3.3 70B suffit pour le contexte personnel.",
        },
        {
          title: "Local-first avec migration progressive vers Supabase",
          rationale:
            "Démarrer en localStorage = 0 friction setup. Migration Supabase quand le besoin de sync est réel, pas avant. Évite l'over-engineering V1.",
        },
        {
          title: "PWA avec sw.js custom plutôt que next-pwa",
          rationale:
            "Contrôle fin du cache (HTML jamais caché → pas de stale content) et notifications custom. next-pwa = trop d'abstraction pour ce qu'on veut.",
        },
      ],
      metrics: [
        { label: "Latence assistant IA", value: "< 500ms" },
        { label: "Stack", value: "Next.js 16 · TS 5" },
        { label: "PWA", value: "Service Worker v6" },
        { label: "Schéma DB prévu", value: "11 tables + RLS" },
      ],
      learnings: [
        "Groq est sous-coté. Pour des tâches contextuelles courtes, c'est imbattable.",
        "Refondre l'UI quand on a déjà des users = douloureux. Le faire AVANT le lancement large = libérateur.",
        "Local-first n'est pas un compromis : c'est souvent la meilleure UX pour les outils perso.",
      ],
    },
  },
  {
    slug: "muslim-app",
    num: "03",
    name: "MuslimApp",
    tag: "Application communautaire",
    year: "2026",
    status: "open-source",
    context: "PWA Coran + dhikr, gratuite, offline-first",
    decision: "PWA pure pour usage hors-ligne en zone faible réseau",
    cursorText: "PWA · offline-first",
    stack: ["PWA", "Open source"],
    repoUrl: "https://github.com/LeM2003/MuslimApp",
    liveUrl: "https://lem2003.github.io/MuslimApp/",
    caseStudy: {
      problem:
        "Les apps musulmanes du Play Store sont blindées de pubs, demandent des permissions abusives (contacts, localisation), et ne marchent pas hors-ligne. En zone faible réseau (banlieue Dakar, brousse), elles deviennent inutilisables. Beaucoup de fidèles n'ont qu'un téléphone d'entrée de gamme.",
      solution:
        "PWA pure : Coran complet + invocations (dhikr) + compteur. Tout est embarqué dans le service worker au premier load → fonctionne 100% offline ensuite. Aucune pub, aucune permission abusive, aucun tracker. Hébergé sur GitHub Pages = gratuit pour toujours. Open source pour la communauté.",
      fullStack: [
        "HTML / CSS / JavaScript vanilla (pas de framework)",
        "Service Worker (offline-first)",
        "Web App Manifest (installable)",
        "GitHub Pages (hébergement gratuit)",
        "JSON local pour les données Coran/dhikr",
      ],
      keyDecisions: [
        {
          title: "Vanilla JS plutôt que React/Vue",
          rationale:
            "Bundle < 100 Ko · démarrage instantané sur téléphones d'entrée de gamme · pas de hydration React qui freeze 2s. Pour ce cas d'usage simple, frameworks = sur-engineering.",
        },
        {
          title: "Offline-first via Service Worker",
          rationale:
            "Public cible = zones faible réseau. Tout doit marcher sans connexion après le premier load. Tester en mode Airplane → l'app reste pleinement fonctionnelle.",
        },
        {
          title: "Zéro pub, zéro tracker",
          rationale:
            "Acte communautaire, pas commercial. Le respect du visiteur = la signature du projet.",
        },
      ],
      metrics: [
        { label: "Bundle initial", value: "< 100 Ko" },
        { label: "Fonctionne offline", value: "100% des features" },
        { label: "Pubs", value: "0" },
        { label: "Trackers", value: "0" },
      ],
      learnings: [
        "Un projet utile communautaire enseigne 10x plus qu'un side project sans utilisateur réel.",
        "Vanilla JS reste imbattable pour des apps simples mobile-first.",
        "Open source + gratuit = visibilité long terme dans la communauté.",
      ],
    },
  },
  {
    slug: "import-manager-sn",
    num: "04",
    name: "ImportManager SN",
    tag: "Gestion d'import",
    year: "2025 – 2026",
    status: "open-source",
    context: "Outil métier pour entreprises sénégalaises d'import",
    decision: "Stack legacy JS/Node maintenable par équipe locale",
    cursorText: "Multi-currency · JS",
    stack: ["Node.js", "Web app"],
    repoUrl: "https://github.com/LeM2003/importmanager-sn",
    liveUrl: "https://lem2003.github.io/importmanager-sn/",
    caseStudy: {
      problem:
        "Les TPE sénégalaises qui importent (Chine, Europe) jonglent avec USD/CNY/EUR/XOF dans Excel. Les calculs incluent : prix FOB, frais douaniers, taux de change quotidiens, marge, prix final XOF. Une erreur = perte sèche. Aucun outil métier dédié au marché ouest-africain.",
      solution:
        "Web app simple (JS vanilla + Node backend) qui calcule en temps réel : conversion devise, frais douaniers Sénégal, marge cible → prix de vente XOF. Interface en français, design adapté aux PC d'entrée de gamme et connexions lentes. Stack volontairement basique pour qu'une équipe locale puisse la maintenir.",
      fullStack: [
        "JavaScript vanilla",
        "Node.js (calcul + API taux)",
        "HTML / CSS sobre",
        "Hébergement GitHub Pages",
      ],
      keyDecisions: [
        {
          title: "Stack 'legacy' JS plutôt que Next.js/React",
          rationale:
            "Le client veut pouvoir faire évoluer l'outil avec un dev junior local (~80 000 FCFA/mois). React/Next.js demande un sénior. JS vanilla = code lisible par tout le monde.",
        },
        {
          title: "Multi-devises hardcodé plutôt qu'API live",
          rationale:
            "API de taux de change = coût mensuel + dépendance externe. Pour le client, taux mis à jour manuellement chaque semaine suffit.",
        },
      ],
      metrics: [
        { label: "Stack maintenable", value: "Niveau junior" },
        { label: "Devises", value: "USD · CNY · EUR · XOF" },
        { label: "Hébergement", value: "Gratuit (GitHub Pages)" },
      ],
      learnings: [
        "La meilleure stack = celle que ton client peut maintenir, pas celle qui est à la mode.",
        "L'Afrique francophone a besoin d'outils métiers en français, conçus pour ses réalités (connexion, devices, formation).",
      ],
    },
  },
];

export function getProjectBySlug(slug: string): Project | null {
  return projects.find((p) => p.slug === slug) || null;
}

/**
 * Retourne le projet précédent et suivant pour la navigation
 * en bas de page d'étude de cas.
 */
export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? projects[idx - 1] : null,
    next: idx < projects.length - 1 ? projects[idx + 1] : null,
  };
}
