/**
 * Mini-corpus + helpers RAG pour le playground visuel.
 *
 * Retrieval : embeddings DÉTERMINISTES (mots-clés → projection 2D cohérente).
 *      Pas de vraie API d'embeddings — c'est volontaire, ça rend la mécanique
 *      du RAG visible plutôt qu'une boîte noire. Groq n'expose pas
 *      d'endpoint d'embeddings (vérifié) ; un vrai upgrade passerait par un
 *      autre fournisseur (OpenAI) ou un modèle client-side (transformers.js).
 *
 * Génération : voir /api/rag/answer — un vrai modèle Groq synthétise une
 *      réponse ancrée sur les chunks récupérés ici, avec citation des
 *      sources et refus explicite hors corpus.
 *
 * Note : un vrai embedding cosinus serait dans R^1536 (OpenAI) ou R^768
 * (sentence-transformers). On le projette en R^2 pour la viz.
 */

export type Chunk = {
  id: string;
  text: string;
  source: string; // ex: "Olèle Systems · README"
  /** Coords 2D pour viz — pré-calculées par catégorie sémantique */
  coords: { x: number; y: number };
  /** Catégorie sémantique pour le scoring déterministe */
  topics: string[];
};

/**
 * Espace 2D normalisé [0, 100] × [0, 100].
 * Convention de placement (cohérent avec la sémantique) :
 *  - Axe X : produit/technique (gauche = produit fonctionnel, droite = infra/tech bas niveau)
 *  - Axe Y : abstraction (haut = concept/IA, bas = implémentation concrète)
 */
export const corpus: Chunk[] = [
  {
    id: "olele-1",
    text: "Olèle Systems (olelesystems.company) est un espace LMS déployé sur Liggeyo, la plateforme SaaS marque blanche de Mouhamadou — formations vidéo et quiz certifiants pour la diaspora africaine.",
    source: "Olèle Systems · description",
    coords: { x: 28, y: 35 },
    topics: ["lms", "formation", "produit", "education"],
  },
  {
    id: "olele-2",
    text: "Architecture Olèle : Supabase Postgres avec Row Level Security stricte, JWT custom + cookies httpOnly, validation Zod côté serveur.",
    source: "Olèle Systems · sécurité",
    coords: { x: 78, y: 55 },
    topics: ["supabase", "postgres", "rls", "jwt", "auth", "securite"],
  },
  {
    id: "personalos-1",
    text: "Personal OS V2 : dashboard personnel local-first avec assistant IA Groq (Llama 3.3 70B) sous 500ms de latence.",
    source: "Personal OS V2 · description",
    coords: { x: 18, y: 72 },
    topics: ["dashboard", "local-first", "groq", "ia", "llm"],
  },
  {
    id: "personalos-2",
    text: "Stack Personal OS : Next.js 16 App Router, React 19, TypeScript, Tailwind v4, migration localStorage vers Supabase avec sync Realtime.",
    source: "Personal OS V2 · stack",
    coords: { x: 65, y: 30 },
    topics: ["nextjs", "react", "typescript", "tailwind", "supabase", "realtime"],
  },
  {
    id: "muslimapp-1",
    text: "MuslimApp : PWA gratuite offline-first avec Coran, dhikr et invocations. Conçue pour la communauté musulmane en zone faible réseau.",
    source: "MuslimApp · description",
    coords: { x: 10, y: 50 },
    topics: ["pwa", "offline-first", "communaute", "open-source", "afrique"],
  },
  {
    id: "importmanager-1",
    text: "ImportManager SN : outil métier pour entreprises sénégalaises d'import. Calculs multi-devises USD/CNY/EUR → XOF.",
    source: "ImportManager SN · description",
    coords: { x: 38, y: 22 },
    topics: ["e-commerce", "import", "afrique", "senegal", "multi-currency"],
  },
  {
    id: "freelance-1",
    text: "Disponible en freelance pour intégration IA (LLM, RAG, chatbots contextuels), MVPs SaaS et audits produit. Fuseau Dakar EU-friendly.",
    source: "Freelance · services",
    coords: { x: 50, y: 85 },
    topics: ["freelance", "ia", "rag", "consulting", "mvp"],
  },
  {
    id: "rag-1",
    text: "Le RAG (Retrieval-Augmented Generation) chunke un corpus en passages, projette chaque passage en vecteur, puis trouve les voisins les plus proches d'une query pour augmenter le prompt LLM.",
    source: "Lab · RAG explained",
    coords: { x: 85, y: 88 },
    topics: ["rag", "embedding", "retrieval", "llm", "chunking", "ia"],
  },
  {
    id: "ai-philosophy",
    text: "L'IA bien intégrée n'est pas un chatbot collé en bas de page. C'est un assistant qui comprend le contexte de la page et l'historique du visiteur.",
    source: "Manifeste · philosophie IA",
    coords: { x: 90, y: 70 },
    topics: ["ia", "philosophie", "produit", "ux"],
  },
  {
    id: "dakar-1",
    text: "Basé à Dakar, Sénégal. Master Data Science / IA en cours à UMEF University. Fuseau GMT+0 = compatible Europe sans décalage bloquant.",
    source: "À propos · localisation",
    coords: { x: 22, y: 15 },
    topics: ["dakar", "senegal", "afrique", "education", "master"],
  },
];

/**
 * Chunking simple : split la query en tokens nettoyés.
 * Version simplifiée — un vrai chunking de docs longs utiliserait
 * RecursiveCharacterTextSplitter de LangChain (overlap 200 chars).
 */
export function chunkQuery(query: string): string[] {
  return query
    .toLowerCase()
    .replace(/[^a-zà-ÿ0-9\s-]/gi, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2);
}

/**
 * Projection 2D déterministe d'une query.
 *
 * Moyenne pondérée des coords des chunks dont les topics matchent
 * les tokens de la query. Plus on a de matches, plus on est proche
 * de ces chunks. (Upgrade possible : embeddings OpenAI/transformers.js
 * + projection UMAP/t-SNE — pas Groq, qui n'a pas d'endpoint embeddings.)
 */
export function projectQuery(query: string): { x: number; y: number } {
  const tokens = chunkQuery(query);
  if (tokens.length === 0) return { x: 50, y: 50 }; // centre

  let weightedX = 0;
  let weightedY = 0;
  let totalWeight = 0;

  for (const chunk of corpus) {
    const matchScore = chunk.topics.reduce((score, topic) => {
      return tokens.some((t) => topic.includes(t) || t.includes(topic))
        ? score + 1
        : score;
    }, 0);
    if (matchScore > 0) {
      weightedX += chunk.coords.x * matchScore;
      weightedY += chunk.coords.y * matchScore;
      totalWeight += matchScore;
    }
  }

  if (totalWeight === 0) return { x: 50, y: 50 };
  return {
    x: weightedX / totalWeight,
    y: weightedY / totalWeight,
  };
}

/** Distance euclidienne 2D (proxy pour cosine similarity en R^N). */
export function distance(
  a: { x: number; y: number },
  b: { x: number; y: number }
): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/** Retourne les K chunks les plus proches de la query. */
export function retrieve(query: string, k = 3): Array<Chunk & { dist: number }> {
  const queryPos = projectQuery(query);
  return corpus
    .map((chunk) => ({ ...chunk, dist: distance(chunk.coords, queryPos) }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, k);
}
