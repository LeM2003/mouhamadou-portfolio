/**
 * Registre des "intents" du portfolio.
 *
 * Pattern : le visiteur tape une intention en langage naturel
 * ("dev react avec stripe", "contact", "ia/llm", "freelance Dakar"...)
 * et la Command Palette identifie l'intent matché → met en avant les
 * projets / actions pertinents + génère un paragraphe contextuel.
 *
 * Version 1 (ici) : matching DÉTERMINISTE par mots-clés.
 * Version 2 (plus tard) : embeddings + cosine similarity via Groq.
 *
 * Pas besoin d'un LLM pour démarrer : les 8 intents ci-dessous
 * couvrent ~90% des intentions réelles des visiteurs d'un portfolio
 * de creative dev.
 */

export type ProjectSlug =
  | "olele-systems"
  | "personal-os-v2"
  | "muslim-app"
  | "import-manager-sn";

export type Action =
  | { kind: "project"; slug: ProjectSlug }
  | { kind: "external"; url: string; label: string }
  | { kind: "route"; path: string; label: string };

export type Intent = {
  /** Identifiant unique pour debug */
  id: string;
  /** Mots-clés à matcher (lowercase) — au moins UN doit être présent dans la query */
  keywords: string[];
  /** Catégorie pour l'UI */
  category: "tech" | "product" | "contact" | "about" | "freelance";
  /** Actions à mettre en avant quand l'intent est matché */
  actions: Action[];
  /** Génère une réponse éditoriale contextuelle */
  response: (query: string) => string;
};

export const intents: Intent[] = [
  {
    id: "react-nextjs",
    keywords: ["react", "next", "nextjs", "next.js", "ssr", "rsc", "frontend", "front-end", "front"],
    category: "tech",
    actions: [
      { kind: "project", slug: "olele-systems" },
      { kind: "project", slug: "personal-os-v2" },
    ],
    response: () =>
      "Tous mes projets actifs sont Next.js 16 App Router avec React Server Components. Stack standardisée pour livrer vite sans sacrifier la perf.",
  },
  {
    id: "supabase-db",
    keywords: ["supabase", "postgres", "postgresql", "db", "database", "sql", "rls", "backend"],
    category: "tech",
    actions: [
      { kind: "project", slug: "olele-systems" },
      { kind: "project", slug: "personal-os-v2" },
    ],
    response: () =>
      "Supabase + Postgres RLS comme backend par défaut. Olèle Systems audité P0 sécu (JWT custom, headers HTTP, validation Zod). Personal OS V2 en migration localStorage → Supabase avec sync Realtime.",
  },
  {
    id: "ai-llm",
    keywords: ["ai", "ia", "llm", "groq", "openai", "anthropic", "claude", "rag", "embedding", "ml", "machine learning"],
    category: "tech",
    actions: [
      { kind: "project", slug: "personal-os-v2" },
      { kind: "external", url: "https://github.com/LeM2003", label: "Voir tous les projets IA sur GitHub" },
    ],
    response: () =>
      "Personal OS V2 intègre Groq (Llama 3.3 70B) pour un assistant local-first <500ms. Master Data Science / IA en cours à Dakar. Je pense les LLMs comme un matériau de design produit, pas un add-on marketing.",
  },
  {
    id: "freelance-hire",
    keywords: ["freelance", "hire", "embauche", "mission", "contrat", "consultant", "consulting", "budget", "tarif", "devis"],
    category: "freelance",
    actions: [
      { kind: "external", url: "https://wa.me/221783019983", label: "WhatsApp direct (+221 78 301 99 83)" },
      { kind: "external", url: "mailto:Mouhamadoud_Diouf@proton.me", label: "Email pro" },
      { kind: "route", path: "/card", label: "Carte de visite digitale" },
    ],
    response: () =>
      "Disponible en freelance pour : sites/e-commerce/SaaS · intégration IA (LLM, RAG, chatbots) · audit produit. Fuseau Dakar = EU-friendly. WhatsApp ouvert 7h–23h.",
  },
  {
    id: "contact-talk",
    keywords: ["contact", "écrire", "discuter", "parler", "talk", "message", "joindre"],
    category: "contact",
    actions: [
      { kind: "route", path: "/card", label: "Carte de visite complète" },
      { kind: "external", url: "mailto:Mouhamadoud_Diouf@proton.me", label: "Mouhamadoud_Diouf@proton.me" },
      { kind: "external", url: "https://www.linkedin.com/in/mouhamadoudiouf", label: "LinkedIn" },
    ],
    response: () =>
      "Email Proton, LinkedIn, WhatsApp direct — tous les canaux sont sur la carte digitale. Réponse sous 24h.",
  },
  {
    id: "open-source",
    keywords: ["open source", "opensource", "github", "code", "repo", "contribution"],
    category: "product",
    actions: [
      { kind: "project", slug: "muslim-app" },
      { kind: "project", slug: "import-manager-sn" },
      { kind: "external", url: "https://github.com/LeM2003", label: "GitHub @LeM2003" },
    ],
    response: () =>
      "MuslimApp = PWA communautaire gratuite (Coran, dhikr). ImportManager-SN = outil métier pour entreprises sénégalaises. Tout open source sur github.com/LeM2003.",
  },
  {
    id: "about-bio",
    keywords: ["about", "qui", "bio", "presentation", "présentation", "parcours", "story"],
    category: "about",
    actions: [
      { kind: "route", path: "/now", label: "Ce que je construis maintenant" },
      { kind: "route", path: "/card", label: "Carte de visite" },
    ],
    response: () =>
      "AI Product Builder à Dakar. Master Data Science / IA en cours à UMEF. Je conçois des produits où l'IA est une décision d'architecture, pas un add-on marketing.",
  },
  {
    id: "ecommerce-shopify",
    keywords: ["e-commerce", "ecommerce", "shopify", "stripe", "wave", "paiement", "boutique", "vente"],
    category: "tech",
    actions: [
      { kind: "project", slug: "olele-systems" },
      { kind: "project", slug: "import-manager-sn" },
    ],
    response: () =>
      "Tunnel paiement adapté contexte africain : Wave, Orange Money, Free Money + Stripe pour international. Olèle Systems gère le flow paiement → certification automatique.",
  },
];

/**
 * Scoring : combien de mots-clés de l'intent matchent la query ?
 * Plus simple, plus robuste que TF-IDF pour ce cas (≈10 intents).
 */
export function scoreIntent(intent: Intent, query: string): number {
  const q = query.toLowerCase().trim();
  if (q.length < 2) return 0;
  return intent.keywords.reduce((score, kw) => {
    return q.includes(kw) ? score + 1 : score;
  }, 0);
}

/** Retourne les N meilleurs intents pour une query donnée. */
export function matchIntents(query: string, limit = 3): Intent[] {
  return intents
    .map((intent) => ({ intent, score: scoreIntent(intent, query) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.intent);
}

/** Métadonnées des projets pour l'affichage rapide */
export const projectMeta: Record<
  ProjectSlug,
  { name: string; tag: string; cursorText: string; href: string }
> = {
  "olele-systems": {
    name: "Olèle Systems",
    tag: "Plateforme LMS",
    cursorText: "Supabase RLS · JWT",
    href: "https://github.com/LeM2003/olele-systems",
  },
  "personal-os-v2": {
    name: "Personal OS V2",
    tag: "Dashboard de vie",
    cursorText: "Local-first · Groq",
    href: "https://github.com/LeM2003/personal-os-v2",
  },
  "muslim-app": {
    name: "MuslimApp",
    tag: "Application communautaire",
    cursorText: "PWA · offline-first",
    href: "https://github.com/LeM2003/MuslimApp",
  },
  "import-manager-sn": {
    name: "ImportManager SN",
    tag: "Gestion d'import",
    cursorText: "Multi-currency · JS",
    href: "https://github.com/LeM2003/importmanager-sn",
  },
};
