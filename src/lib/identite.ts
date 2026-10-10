import type { Identite } from "./seo-identite";

/**
 * Source unique de l'identité publique — lue par le JSON-LD, le sitemap,
 * robots.txt et les métadonnées.
 *
 * Passage à un domaine personnel (ex. mouhamadoudiouf.com) : changer SITE_URL
 * ici, rien d'autre. Penser ensuite à la Search Console (nouvelle propriété)
 * et à une redirection 308 depuis l'ancienne URL vercel.app.
 */
export const SITE_URL = "https://mouhamadou-portfolio.vercel.app";

/**
 * Pourquoi c'est important : sur « Mouhamadou Diouf », Google mélange
 * plusieurs homonymes. `sameAs` lui dit quels profils sont les MIENS, et
 * `@id` (SITE_URL/#person) donne un identifiant stable que d'autres sites
 * (liggeyo.com via `founder`) pourront citer pour relier les entités.
 *
 * Règle : uniquement des faits vérifiables et des liens publics qui
 * répondent (pas d'URL protégée par la connexion Vercel).
 */
export const identite: Identite = {
  name: "Mouhamadou Diouf",
  alternateName: ["LeM"],
  url: SITE_URL,
  jobTitle: "Développeur full stack — web, data & IA",
  description:
    "Développeur full stack à Dakar : sites web et applications, tableaux de bord et automatisations IA pour entrepreneurs et PME. Product Owner chez Auryntix, créateur de Liggeyo.",
  email: "Mouhamadoud_Diouf@proton.me",
  // Photo carrée 600 px (public/). Google l’utilise pour le panneau de résultats.
  image: `${SITE_URL}/mouhamadou-diouf.jpg`,
  sameAs: [
    "https://www.linkedin.com/in/mouhamadoudiouf/",
    "https://github.com/LeM2003",
    // URL de production publique — l'alias *-lem2003s-projects.vercel.app
    // est derrière la protection Vercel (redirige vers la page de connexion).
    "https://mouhamadou-cv.vercel.app",
  ],
  worksFor: [{ name: "Auryntix", url: "https://auryntix.com" }],
  alumniOf: [{ name: "BEM Dakar" }],
  knowsAbout: [
    "Next.js",
    "TypeScript",
    "Supabase",
    "Power BI",
    "Data Science",
    "RAG",
    "Automatisation IA",
    "Product Ownership",
  ],
  address: { locality: "Dakar", country: "SN" },
};
